import { NextResponse, type NextRequest } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

/** Recebe os links de e-mail (confirmação de cadastro e redefinição de senha). */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const rawNext = searchParams.get('next') ?? '/visao-geral'
  const next = rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/visao-geral'
  const supabase = await createClient()

  let ok = false
  if (code) {
    ok = !(await supabase.auth.exchangeCodeForSession(code)).error
  } else if (tokenHash && type) {
    ok = !(await supabase.auth.verifyOtp({ type, token_hash: tokenHash })).error
  }
  return NextResponse.redirect(new URL(ok ? next : '/entrar?erro=link', origin))
}
