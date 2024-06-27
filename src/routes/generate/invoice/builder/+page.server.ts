import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types.js';

export const actions = {
    saveAndDownloadInvoice: async({ request, locals: { supabase } }:RequestEvent) => {

        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session) {
            return error(401, {
                message: "Unauthorized request, please login"
            })
        }

        const { isDraft, invoiceData, downloadUrl } = await request.json()

        if(!isDraft || !invoiceData || !downloadUrl){
            return error(400, {
                message: "Incomplete or invalid properties in request body, check (isDraft, invoiceData, downloadUrl)"
            })
        }

        const successMssg = isDraft ? "Saved to drafts" : "Download Successfully"

        try {
            const { error: postGresError } = await supabase
                .from('user_invoices')
                .insert([
                    {
                        user_id: session.user.id,
                        invoice_data: invoiceData,
                        png_url: downloadUrl,
                        is_draft: isDraft
                    }
                ]
            )

            if(postGresError){
                throw new Error(postGresError.message)
            }

            return { success: true, message: successMssg }

        }
        catch(err:any|unknown){
            return error(401, {
                message: err.message || "An error occurred while saving invoice, try again"
            })
        }
    } 
}