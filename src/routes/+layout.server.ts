import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const ssr = false;

export const load: LayoutServerLoad = async ({ url ,locals: { session, supabase } }) => {

  if (session && session.expires_at) {
    const expirationTime = session?.expires_at * 1000;
    const currentTime = Date.now()

    if (currentTime > expirationTime) {
      // Session has expired
      supabase.auth.signOut()
      throw redirect(303,"/auth/sign_in")
    }
  }

  if(session && url.pathname.match("/auth")){
    throw redirect(303,"/")
  }
  else if((!session && url.pathname.match("/generate/invoice")) || (!session && url.pathname.match("/generate/receipt"))){
    throw redirect(303,"/auth/sign_in")
  }

  return {
    session,
    user: (await supabase.auth.getUser()).data.user
  }
}