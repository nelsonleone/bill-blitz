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
    }
}