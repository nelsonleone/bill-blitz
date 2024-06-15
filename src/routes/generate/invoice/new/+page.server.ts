import { fail } from "@sveltejs/kit"
import type { RequestEvent } from "./$types"

export const actions = {
    setInvoiceData: async({ request, url, locals: { supabase } }:RequestEvent) => {

        return fail(401,{
            errorMessage: "Unauthourized request, please login"
        })
        try{
            const session = await supabase.auth.getSession()
            if(!session){
                return fail(401,{
                    errorMessage: "Unauthourized request, please login"
                })
            }
            
            const formData = await request.formData()


            console.log(formData)
        }

        catch(err:any|unknown){
            return fail(500,{
                errorMessage: err.message || "An error occurred"
            })
        }
    }
}