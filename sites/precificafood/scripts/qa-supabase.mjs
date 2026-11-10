#!/usr/bin/env node
/**
 * SÓ PARA TESTE LOCAL — nunca use em produção.
 *
 * Servidor mínimo compatível com o subconjunto da API do Supabase que o app usa
 * (Auth /auth/v1 e REST /rest/v1, incluindo RPC). Roda em cima de um Postgres
 * real com a migration aplicada, e cada requisição REST executa com
 * `SET LOCAL ROLE authenticated` + claims do JWT, então a RLS do banco vale de
 * verdade. Serve para rodar o app ponta a ponta sem Docker / Supabase CLI.
 *
 * Uso: QA_DATABASE_URL=postgres://... node scripts/qa-supabase.mjs   (porta 54321)
 */
import http from 'node:http'
import crypto from 'node:crypto'
import fs from 'node:fs'
import pg from 'pg'

const PORT = Number(process.env.QA_PORT ?? 54321)
const SITE = process.env.QA_SITE_URL ?? 'http://localhost:3000'
const SECRET = process.env.QA_JWT_SECRET ?? 'qa-only-secret-qa-only-secret-qa-only'
const pool = new pg.Pool({ connectionString: process.env.QA_DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/precificafood_qa' })
pg.types.setTypeParser(1700, (v) => Number(v)) // numeric → number (como o PostgREST)

const b64url = (b) => Buffer.from(b).toString('base64url')
function sign(payload) {
  const head = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = b64url(JSON.stringify(payload))
  const sig = crypto.createHmac('sha256', SECRET).update(`${head}.${body}`).digest('base64url')
  return `${head}.${body}.${sig}`
}
function verify(token) {
  const [h, b, s] = String(token ?? '').split('.')
  if (!h || !b || !s) return null
  const expect = crypto.createHmac('sha256', SECRET).update(`${h}.${b}`).digest('base64url')
  if (!crypto.timingSafeEqual(Buffer.from(expect), Buffer.from(s.padEnd(expect.length).slice(0, expect.length)))) return null
  const p = JSON.parse(Buffer.from(b, 'base64url').toString())
  if (p.exp && p.exp < Date.now() / 1000) return null
  return p
}
const hash = (pw, salt = crypto.randomBytes(16).toString('hex')) => `${salt}:${crypto.scryptSync(pw, salt, 32).toString('hex')}`
const check = (pw, stored) => {
  const [salt] = String(stored).split(':')
  return hash(pw, salt) === stored
}

const refreshTokens = new Map() // token → userId
const recoveryTokens = new Map() // token → { userId, challenge, redirect }
const pkceCodes = new Map() // code → { userId, challenge }

function userJson(u) {
  return {
    id: u.id,
    aud: 'authenticated',
    role: 'authenticated',
    email: u.email,
    email_confirmed_at: u.email_confirmed_at,
    confirmed_at: u.email_confirmed_at,
    user_metadata: u.raw_user_meta_data ?? {},
    app_metadata: { provider: 'email', providers: ['email'] },
    identities: [],
    created_at: u.created_at,
    updated_at: u.updated_at,
  }
}
function session(u) {
  const now = Math.floor(Date.now() / 1000)
  const expires_in = 3600
  const access_token = sign({ sub: u.id, role: 'authenticated', aud: 'authenticated', email: u.email, iat: now, exp: now + expires_in, session_id: crypto.randomUUID() })
  const refresh_token = crypto.randomBytes(24).toString('base64url')
  refreshTokens.set(refresh_token, u.id)
  return { access_token, token_type: 'bearer', expires_in, expires_at: now + expires_in, refresh_token, user: userJson(u) }
}

async function readBody(req) {
  const chunks = []
  for await (const c of req) chunks.push(c)
  const raw = Buffer.concat(chunks).toString()
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return Object.fromEntries(new URLSearchParams(raw))
  }
}
function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...headers })
  res.end(body === undefined ? '' : JSON.stringify(body))
}
const authErr = (res, status, msg, code = 'invalid_credentials') => send(res, status, { code: status, error_code: code, msg, message: msg, error: code, error_description: msg })

async function getUserById(id) {
  const { rows } = await pool.query('select * from auth.users where id = $1', [id])
  return rows[0]
}
function bearer(req) {
  const h = req.headers.authorization ?? ''
  return h.startsWith('Bearer ') ? h.slice(7) : null
}

/* ----------------------------- AUTH ----------------------------- */
async function auth(req, res, url) {
  const path = url.pathname.replace('/auth/v1', '')
  const body = req.method === 'GET' ? null : await readBody(req)

  if (path === '/signup' && req.method === 'POST') {
    const email = String(body?.email ?? '').toLowerCase()
    if (!email || !body?.password) return authErr(res, 400, 'Email and password required', 'validation_failed')
    if (String(body.password).length < 6) return authErr(res, 422, 'Password should be at least 6 characters', 'weak_password')
    const exists = await pool.query('select 1 from auth.users where email = $1', [email])
    if (exists.rowCount) return authErr(res, 422, 'User already registered', 'user_already_exists')
    const { rows } = await pool.query(
      'insert into auth.users(email, encrypted_password, email_confirmed_at, raw_user_meta_data) values ($1,$2,now(),$3) returning *',
      [email, hash(String(body.password)), body?.data ?? {}],
    )
    return send(res, 200, session(rows[0]))
  }

  if (path === '/token' && req.method === 'POST') {
    const grant = url.searchParams.get('grant_type')
    if (grant === 'password') {
      const { rows } = await pool.query('select * from auth.users where email = $1', [String(body?.email ?? '').toLowerCase()])
      const u = rows[0]
      if (!u || !check(String(body?.password ?? ''), u.encrypted_password)) return authErr(res, 400, 'Invalid login credentials')
      return send(res, 200, session(u))
    }
    if (grant === 'refresh_token') {
      const uid = refreshTokens.get(body?.refresh_token)
      if (!uid) return authErr(res, 400, 'Invalid Refresh Token', 'refresh_token_not_found')
      refreshTokens.delete(body.refresh_token)
      return send(res, 200, session(await getUserById(uid)))
    }
    if (grant === 'pkce') {
      const entry = pkceCodes.get(body?.auth_code)
      if (!entry) return authErr(res, 400, 'invalid flow state', 'flow_state_not_found')
      const challenge = crypto.createHash('sha256').update(String(body?.code_verifier ?? '')).digest('base64url')
      if (entry.challenge && entry.challenge !== challenge) return authErr(res, 400, 'code challenge does not match', 'bad_code_verifier')
      pkceCodes.delete(body.auth_code)
      return send(res, 200, session(await getUserById(entry.userId)))
    }
    return authErr(res, 400, 'unsupported grant', 'unsupported_grant_type')
  }

  if (path === '/user') {
    const claims = verify(bearer(req))
    if (!claims) return authErr(res, 401, 'invalid JWT', 'bad_jwt')
    let u = await getUserById(claims.sub)
    if (!u) return authErr(res, 404, 'User not found', 'user_not_found')
    if (req.method === 'PUT') {
      if (body?.password) {
        if (check(String(body.password), u.encrypted_password)) return authErr(res, 422, 'New password should be different from the old password.', 'same_password')
        const r = await pool.query('update auth.users set encrypted_password = $2, updated_at = now() where id = $1 returning *', [u.id, hash(String(body.password))])
        u = r.rows[0]
      }
    }
    return send(res, 200, userJson(u))
  }

  if (path === '/logout') return send(res, 204)

  if (path === '/recover' && req.method === 'POST') {
    const { rows } = await pool.query('select * from auth.users where email = $1', [String(body?.email ?? '').toLowerCase()])
    if (rows[0]) {
      const token = crypto.randomBytes(16).toString('hex')
      const redirect = url.searchParams.get('redirect_to') ?? SITE
      recoveryTokens.set(token, { userId: rows[0].id, challenge: body?.code_challenge ?? null, redirect })
      const link = `http://localhost:${PORT}/auth/v1/verify?token=${token}&type=recovery&redirect_to=${encodeURIComponent(redirect)}`
      fs.mkdirSync('.qa', { recursive: true })
      fs.appendFileSync('.qa/mail.log', `${new Date().toISOString()} recovery ${rows[0].email} ${link}\n`)
      console.log('[qa-mail] recovery link:', link)
    }
    return send(res, 200, {})
  }

  if (path === '/verify' && req.method === 'GET') {
    const entry = recoveryTokens.get(url.searchParams.get('token'))
    if (!entry) {
      res.writeHead(303, { Location: `${SITE}/entrar?erro=link` })
      return res.end()
    }
    recoveryTokens.delete(url.searchParams.get('token'))
    const code = crypto.randomUUID()
    pkceCodes.set(code, { userId: entry.userId, challenge: entry.challenge })
    const to = new URL(entry.redirect)
    to.searchParams.set('code', code)
    res.writeHead(303, { Location: to.toString() })
    return res.end()
  }

  return authErr(res, 404, `not implemented: ${req.method} ${path}`, 'not_found')
}

/* ----------------------------- REST ----------------------------- */
const IDENT = /^[a-z_][a-z0-9_]*$/
const ident = (s) => {
  if (!IDENT.test(s)) throw Object.assign(new Error(`invalid identifier ${s}`), { status: 400 })
  return `"${s}"`
}

function buildWhere(params, values) {
  const parts = []
  for (const [key, raw] of params) {
    if (['select', 'order', 'limit', 'offset', 'columns', 'on_conflict'].includes(key)) continue
    const m = /^(eq|neq|gt|gte|lt|lte|in|is)\.(.*)$/s.exec(raw)
    if (!m) throw Object.assign(new Error(`unsupported filter ${key}=${raw}`), { status: 400 })
    const [, op, v] = m
    const col = ident(key)
    if (op === 'in') {
      const list = v.replace(/^\(|\)$/g, '').split(',').map((x) => x.replace(/^"|"$/g, ''))
      values.push(list)
      parts.push(`${col}::text = any($${values.length}::text[])`)
    } else if (op === 'is') {
      parts.push(`${col} is ${v === 'null' ? 'null' : v === 'true' ? 'true' : 'false'}`)
    } else {
      values.push(v)
      const sql = { eq: '=', neq: '<>', gt: '>', gte: '>=', lt: '<', lte: '<=' }[op]
      parts.push(`${col}::text ${sql} $${values.length}::text`)
    }
  }
  return parts.length ? ` where ${parts.join(' and ')}` : ''
}
const selectList = (s) => (!s || s === '*' ? '*' : s.split(',').map((c) => ident(c.trim())).join(', '))
function orderBy(o) {
  if (!o) return ''
  return ' order by ' + o.split(',').map((p) => {
    const [c, dir = 'asc'] = p.split('.')
    return `${ident(c)} ${dir === 'desc' ? 'desc' : 'asc'}`
  }).join(', ')
}

function pgErr(res, e) {
  const status = e.status ?? (e.code === '42501' ? 403 : e.code === '23505' ? 409 : e.code === 'P0002' ? 404 : 400)
  return send(res, status, { code: e.code ?? 'PGRST000', message: e.message, details: e.detail ?? null, hint: e.hint ?? null })
}

async function withRole(req, fn) {
  const claims = verify(bearer(req))
  const client = await pool.connect()
  try {
    await client.query('begin')
    await client.query(`set local role ${claims ? 'authenticated' : 'anon'}`)
    await client.query(`select set_config('request.jwt.claims', $1, true)`, [JSON.stringify(claims ?? { role: 'anon' })])
    const out = await fn(client)
    await client.query('commit')
    return out
  } catch (e) {
    await client.query('rollback').catch(() => {})
    throw e
  } finally {
    client.release()
  }
}

async function rest(req, res, url) {
  const [, , , name, fn] = url.pathname.split('/') // /rest/v1/<table> | /rest/v1/rpc/<fn>
  const params = [...url.searchParams.entries()]
  const wantsObject = (req.headers.accept ?? '').includes('vnd.pgrst.object')
  const prefer = req.headers.prefer ?? ''
  const body = req.method === 'GET' || req.method === 'DELETE' ? null : await readBody(req)

  try {
    if (name === 'rpc') {
      const args = body ?? {}
      const keys = Object.keys(args)
      keys.forEach(ident)
      const values = keys.map((k) => (args[k] !== null && typeof args[k] === 'object' ? JSON.stringify(args[k]) : args[k]))
      const sql = `select ${ident(fn)}(${keys.map((k, i) => `${ident(k)} => $${i + 1}`).join(', ')}) as r`
      const rows = await withRole(req, (c) => c.query(sql, values).then((r) => r.rows))
      return send(res, 200, rows[0]?.r ?? null)
    }

    const table = `public.${ident(name)}`
    const values = []
    let sql
    if (req.method === 'GET') {
      const limit = url.searchParams.get('limit')
      sql = `select ${selectList(url.searchParams.get('select'))} from ${table}${buildWhere(params, values)}${orderBy(url.searchParams.get('order'))}${limit ? ` limit ${Number(limit) | 0}` : ''}`
    } else if (req.method === 'POST') {
      const list = Array.isArray(body) ? body : [body]
      const cols = Object.keys(list[0] ?? {})
      const tuples = list.map((row) => `(${cols.map((c) => {
        const v = row[c]
        values.push(v !== null && typeof v === 'object' ? JSON.stringify(v) : v)
        return `$${values.length}`
      }).join(', ')})`)
      sql = `insert into ${table} (${cols.map(ident).join(', ')}) values ${tuples.join(', ')} returning ${selectList(url.searchParams.get('select'))}`
    } else if (req.method === 'PATCH') {
      const cols = Object.keys(body ?? {})
      const sets = cols.map((c) => {
        const v = body[c]
        values.push(v !== null && typeof v === 'object' ? JSON.stringify(v) : v)
        return `${ident(c)} = $${values.length}`
      })
      sql = `update ${table} set ${sets.join(', ')}${buildWhere(params, values)} returning ${selectList(url.searchParams.get('select'))}`
    } else if (req.method === 'DELETE') {
      sql = `delete from ${table}${buildWhere(params, values)} returning *`
    } else {
      return send(res, 405, { message: 'method not allowed' })
    }
    const rows = await withRole(req, (c) => c.query(sql, values).then((r) => r.rows))
    if (req.method !== 'GET' && !prefer.includes('return=representation')) return send(res, req.method === 'POST' ? 201 : 204)
    if (wantsObject) {
      if (rows.length !== 1) return send(res, 406, { code: 'PGRST116', message: 'JSON object requested, multiple (or no) rows returned', details: `The result contains ${rows.length} rows`, hint: null })
      return send(res, 200, rows[0])
    }
    return send(res, req.method === 'POST' ? 201 : 200, rows)
  } catch (e) {
    return pgErr(res, e)
  }
}

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`)
    if (req.method === 'OPTIONS') return send(res, 204, undefined, { 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': '*' })
    try {
      if (url.pathname.startsWith('/auth/v1')) return await auth(req, res, url)
      if (url.pathname.startsWith('/rest/v1/')) return await rest(req, res, url)
      send(res, 404, { message: 'not found' })
    } catch (e) {
      console.error(e)
      send(res, 500, { message: String(e.message ?? e) })
    }
  })
  .listen(PORT, () => console.log(`[qa-supabase] ouvindo em http://localhost:${PORT} (SÓ TESTE)`))
