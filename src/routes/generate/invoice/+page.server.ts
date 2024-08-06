import { error, type ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ locals }: ServerLoadEvent) => {
  const { data: user, error: userError } = await locals.supabase.auth.getUser()

  if (userError) {
    throw error(500, userError.message)
  }


  const { data: user_invoices, error: supabaseFetchError } = await locals.supabase
  .from('user_invoices')
  .select('*')
  .eq("user_id", user.user.id)
          

  if (supabaseFetchError) {
    throw error(500, supabaseFetchError.message)
  }
  return { user_invoices  }
}
