import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && user) {
      // Crea el perfil si no existe, con trial de 7 días
      const trialEnds = new Date()
      trialEnds.setDate(trialEnds.getDate() + 7)

      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

      if (!existing) {
        await supabase.from('profiles').insert({
          id: user.id,
          email: user.email,
          plan: 'pro',
          trial_ends_at: trialEnds.toISOString(),
        })
      }

      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
