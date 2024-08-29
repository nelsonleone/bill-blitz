import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types.js';

export const actions = {
    saveAndDownloadInvoice: async({ request, locals: { supabase } }:RequestEvent) => {

        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        const user_id = (await supabase.auth.getUser()).data.user?.id;

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
    },

    editInvoice: async({ request, locals: { supabase } }: RequestEvent) => {

        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        const user_id = (await supabase.auth.getUser()).data.user?.id;

        if (sessionError || !session || !user_id) {
            return error(401, {
                message: "Unauthorized request, please login"
            })
        }

        const { isDraft, invoiceData, pngImg, invoiceId } = await request.json()

        if (typeof isDraft !== "boolean" || !invoiceData || !pngImg || !invoiceId) {
            return error(400, {
                message: "Incomplete or invalid properties in request body, check (isDraft, pngImg, invoiceData, invoiceId)"
            })
        }

        const successMssg = isDraft ? "Saved to drafts" : "Download Successfully";

        try {
            // Check if the invoice exists
            const { data: existingInvoice, error: getError } = await supabase
                .from('user_invoices')
                .select('id')
                .eq('id', invoiceId)
                .eq('user_id', user_id)
                .single()

            if (getError || !existingInvoice) {
                throw new Error('Invoice not found or you do not have permission to edit this invoice.')
            }

            // Update the existing invoice
            const { data, error: postGresError } = await supabase
            .from('user_invoices')
            .update({
                invoice_data: invoiceData,
                pngImg: isDraft ? null : pngImg,
                is_draft: isDraft
            })
            .eq('id', invoiceId)
            .eq('user_id', user_id)
            .select()

            if (postGresError) {
                throw new Error(postGresError.message)
            }

            return { success: true, message: successMssg }

        } catch (err: any | unknown) {
            return error(401, {
                message: err.message || "An error occurred while saving the invoice, please try again."
            })
        }
    }
}