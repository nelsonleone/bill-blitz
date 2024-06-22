import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ url ,locals: { session, supabase } }) => {

  if(session && url.pathname.match("/auth")){
    throw redirect(303,"/")
  }
  else if((!session && url.pathname.match("/generate/invoice")) || (!session && url.pathname.match("/generate/receipt"))){
    throw redirect(303,"/auth/sign_in")
  }

  return {
    session,
    user: supabase.auth.getUser()
  }
}