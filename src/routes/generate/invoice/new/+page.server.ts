import { error } from "@sveltejs/kit"
import type { RequestEvent } from "./$types"

export const actions = {
    setInvoiceData: async({ request, url, locals: { supabase } }:RequestEvent) => {

        try{
            const session = await supabase.auth.getSession()
            if(!session){
                return error(401,{
                    message: "Unauthourized request, please login"
                })
            }
            
            const data = await request.json()


            console.log(data)
        }

        catch(err:any|unknown){
            return error(500,{
                message: err.message || "An error occurred"
            })
        }
    }
}