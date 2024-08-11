import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types.js';

export const actions = {
    saveAndDownloadInvoice: async({ request, locals: { supabase } }:RequestEvent) => {

        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        const user_id = (await supabase.auth.getUser()).data.user?.id;

        console.log("shdshhs")


        if (sessionError || !session || !user_id) {
            return error(401, {
                message: "Unauthorized request, please login"
            })
        }

        const { isDraft, invoiceData, pngImg } = await request.json()
            if(typeof isDraft !== "boolean" || !invoiceData || !pngImg){
                return error(400, {
                message: "Incomplete or invalid properties in request body, check (isDraft, pngImg, invoiceData)"
            })
        }

        const successMssg = isDraft ? "Saved to drafts" : "Download Successfully"

        try {
            const { error: postGresError } = await supabase
                .from('user_invoices')
                .insert([
                    {
                        user_id,
                        invoice_data: invoiceData,
                        pngImg: isDraft ? null : pngImg,
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