'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { emailSchema, passwordSchema } from '@/lib/validation'
import { siteUrl } from '@/lib/env'
import type { ActionResult } from './types'

function translate(message: string): string {
  const m = message.toLowerCase()
  if (m.includes('invalid login')) return 'E-mail ou senha incorretos.'
  if (m.includes('email not confirmed')) return 'Confirme seu e-mail pelo link que enviamos antes de entrar.'
  if (m.includes('already registered') || m.includes('already been registered')) return 'Já existe uma conta com este e-mail.'
  if (m.includes('rate limit') || m.includes('too many')) return 'Muitas tentativas. Espere um pouco e tente de novo.'
  if (m.includes('same password') || m.includes('different from the old')) return 'A nova senha precisa ser diferente da atual.'
  if (m.includes('weak') || m.includes('password should')) return 'Senha fraca. Use pelo menos 8 caracteres, misturando letras e números.'
  return 'Não foi possível concluir agora. Tente novamente.'
}

function safeNext(next: FormDataEntryValue | null): string {
  const n = typeof next === 'string' ? next : ''
  return n.startsWith('/') && !n.startsWith('//') ? n : '/visao-geral'
}

export async function signIn(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  const email = emailSchema.safeParse(form.get('email'))
  const password = String(form.get('password') ?? '')
  if (!email.success) return { ok: false, error: 'Informe um e-mail válido.' }
  if (!password) return { ok: false, error: 'Informe sua senha.' }
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email: email.data, password })
  if (error) return { ok: false, error: translate(error.message) }
  redirect(safeNext(form.get('next')))
}

export async function signUp(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  const email = emailSchema.safeParse(form.get('email'))
  const password = passwordSchema.safeParse(form.get('password'))
  const restaurant = String(form.get('restaurant') ?? '').trim()
  if (!email.success) return { ok: false, error: 'Informe um e-mail válido.' }
  if (!password.success) return { ok: false, error: password.error.issues[0]?.message ?? 'Senha inválida.' }
  if (!restaurant) return { ok: false, error: 'Informe o nome do restaurante.' }
  if (restaurant.length > 120) return { ok: false, error: 'Nome do restaurante muito longo.' }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email: email.data,
    password: password.data,
    options: {
      data: { restaurant_name: restaurant },
      emailRedirectTo: `${siteUrl()}/auth/confirm?next=/onboarding`,
    },
  })
  if (error) return { ok: false, error: translate(error.message) }
  if (!data.session) {
    return { ok: true, message: `Enviamos um link de confirmação para ${email.data}. Abra o e-mail para ativar a conta.` }
  }
  const { error: rpcError } = await supabase.rpc('create_restaurant', { p_name: restaurant })
  if (rpcError) redirect('/onboarding')
  redirect('/visao-geral?bem-vindo=1')
}

export async function requestPasswordReset(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  const email = emailSchema.safeParse(form.get('email'))
  if (!email.success) return { ok: false, error: 'Informe um e-mail válido.' }
  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email.data, {
    redirectTo: `${siteUrl()}/auth/confirm?next=/redefinir-senha`,
  })
  // Resposta igual com ou sem conta, para não revelar quais e-mails existem.
  if (error && error.message.toLowerCase().includes('rate')) return { ok: false, error: translate(error.message) }
  return { ok: true, message: 'Se existir uma conta com este e-mail, você vai receber um link para criar uma nova senha.' }
}

export async function updatePassword(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  const password = passwordSchema.safeParse(form.get('password'))
  if (!password.success) return { ok: false, error: password.error.issues[0]?.message ?? 'Senha inválida.' }
  if (form.get('password') !== form.get('confirm')) return { ok: false, error: 'As senhas não conferem.' }
  const supabase = await createClient()
  const { data: u } = await supabase.auth.getUser()
  if (!u.user) return { ok: false, error: 'Sua sessão expirou. Peça um novo link.' }
  const { error } = await supabase.auth.updateUser({ password: password.data })
  if (error) return { ok: false, error: translate(error.message) }
  if (form.get('redirect') === '1') redirect('/visao-geral?senha=1')
  return { ok: true, message: 'Senha atualizada.' }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/entrar')
}

export async function createRestaurant(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  const name = String(form.get('name') ?? '').trim()
  if (!name || name.length > 120) return { ok: false, error: 'Informe o nome do restaurante (até 120 caracteres).' }
  const supabase = await createClient()
  const { data: u } = await supabase.auth.getUser()
  if (!u.user) redirect('/entrar')
  const { error } = await supabase.rpc('create_restaurant', { p_name: name })
  if (error && !error.message.includes('já tem')) return { ok: false, error: 'Não foi possível criar o restaurante. Tente de novo.' }
  redirect('/visao-geral?bem-vindo=1')
}
