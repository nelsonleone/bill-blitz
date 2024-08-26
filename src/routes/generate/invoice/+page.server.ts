import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { RequestEvent } from './$types.js';
import type { ISavedInvoice } from '../../../types/types.js';
import type { SupabaseClient } from '@supabase/supabase-js';


async function fetchAndSortInvoices(supabase: SupabaseClient, userId: string): Promise<ISavedInvoice[]> {
  const { data: user_invoices, error: supabaseFetchError } = await supabase
    .from('user_invoices')
    .select('*')
    .eq("user_id", userId)
  ;

  if (supabaseFetchError) {
    throw error(500, supabaseFetchError.message);
  }

  const sortedInvoices = user_invoices.sort((a: ISavedInvoice, b: ISavedInvoice) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  return sortedInvoices;
}




export const load = async ({ locals }: ServerLoadEvent) => {
  const { data: user, error: userError } = await locals.supabase.auth.getUser()

  if (userError) {
    throw error(500, userError.message)
  }

  const sortedInvoices = await fetchAndSortInvoices(locals.supabase, user.user.id)

  return { user_invoices: sortedInvoices }
}


export const actions = {
  deleteInvoice: async({ request, locals: { supabase } }: RequestEvent) => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    const user_id = (await supabase.auth.getUser()).data.user?.id;

    if (sessionError || !session || !user_id) {
      return error(401, {
          message: "Unauthorized request, please login"
      });
    }

    const { invoiceId } = await request.json()

    if (!invoiceId) {
      return error(400, {
          message: "Missing or invalid invoice ID"
      });
    }

    try {
      // Check if the invoice exists and belongs to the user
      const { data: existingInvoice, error: getError } = await supabase
        .from('user_invoices')
        .select('id')
        .eq('id', invoiceId)
        .eq('user_id', user_id)
      .single()

      if (getError || !existingInvoice) {
        throw new Error('Invoice not found or you do not have permission to delete this invoice.')
      }

      const { error: deleteError } = await supabase
        .from('user_invoices')
        .delete()
        .eq('id', invoiceId)
        .eq('user_id', user_id)

      if (deleteError) {
        throw new Error(deleteError.message)
      }

      return {
        status: 200,
        success: true,     
      }
    } 
    catch (err: any | unknown) {
      return error(401, {
        message: err.message || "An error occurred while deleting the invoice, please try again."
      })
    }
  }
}
