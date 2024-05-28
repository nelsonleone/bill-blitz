import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ url ,locals: { session, supabase } }) => {

  if(session && url.pathname.match("/auth")){
    throw redirect(303,"/")
  }

  return {
    session,
    user: supabase.auth.getUser()
  }
}