import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PUBLIC_PATHS = ['/entrar', '/cadastro', '/recuperar-senha', '/auth']

/** Renova a sessão do Supabase a cada requisição e protege as rotas do app. */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return response

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  // getUser valida o token no servidor de auth (não confia só no cookie).
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isPublic = PUBLIC_PATHS.some((p) => path === p || path.startsWith(`${p}/`))

  if (!user && !isPublic) {
    const to = request.nextUrl.clone()
    to.pathname = '/entrar'
    to.search = path !== '/' ? `?next=${encodeURIComponent(path)}` : ''
    return redirectWithCookies(to, response)
  }
  if (user && (path === '/entrar' || path === '/cadastro')) {
    const to = request.nextUrl.clone()
    to.pathname = '/visao-geral'
    to.search = ''
    return redirectWithCookies(to, response)
  }
  return response
}

function redirectWithCookies(to: URL, from: NextResponse) {
  const r = NextResponse.redirect(to)
  from.cookies.getAll().forEach((c) => r.cookies.set(c))
  return r
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
