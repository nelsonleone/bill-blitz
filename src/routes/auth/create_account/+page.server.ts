import type { RequestEvent } from './$types.js';
import { error } from '@sveltejs/kit';

export const actions = {
    signup: async({ request, locals: { supabase } }:RequestEvent) => {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')
        const displayName = data.get('displayName')

        if(!email || !password || !displayName){
            throw new Error("Invalid Credentials (verify email, or password, or displayName is passed)")
        }

        const res = await supabase.auth.signUp(
            {
                email: email as string,
                password: password as string,
                options: {
                    data: {
                    pro_user: false,
                    display_name: displayName
                    }
                }
            }
        )

        if(res.error?.status){
            const { message } = res.error;

            return error(res.error?.status,{
                message
            })
        }

        return { success: true }  
    }
}