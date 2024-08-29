import { error } from "@sveltejs/kit"
import type { RequestEvent } from "./$types"
import type { IBasicInvoiceData } from "../../../../types/types"

export const actions = {
    setInvoiceData: async({ request, url, locals: { supabase } }:RequestEvent) => {

        try{
            const { data: { session }, error: sessionError } = await supabase.auth.getSession()

            if (sessionError || !session) {
                return error(401, {
                    message: "Unauthorized request, please login"
                })
            }
            
            const data : IBasicInvoiceData = await request.json()


            // second layer check
            if(data.invoiceData.items.length < 1){
                return error(401,{
                    message: "No item in invoice"
                })
            }
            if(!data.templateInUse){
                return error(401,{
                    message: "Invoice has no chosen template"
                })
            }

            return { success: true }
        }

        catch(err:any|unknown){
            console.log(err)
            return error(500,{
                message: err.message || "An error occurred"
            })
        }
    },
    saveToDrafts: async({ request, locals: { supabase } }:RequestEvent) => {

        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        const user_id = (await supabase.auth.getUser()).data.user?.id;

        if (sessionError || !session || !user_id) {
            return error(401, {
                message: "Unauthorized request, please login"
            })
        }

        const { invoiceData } = await request.json()
            if(typeof !invoiceData){
                return error(400, {
                message: "Incomplete or invalid properties in request body, check (invoiceData)"
            })
        }

        const successMssg = "Saved to drafts"

        try {
            const { error: postGresError } = await supabase
                .from('user_invoices')
                .insert([
                    {
                        user_id,
                        invoice_data: invoiceData,
                        pngImg: null,
                        is_draft: true
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