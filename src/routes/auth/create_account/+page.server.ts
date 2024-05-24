import { supabase } from '$lib/supabaseClient.js';
import type { RequestEvent } from './$types.js';
import { error } from '@sveltejs/kit';

export const actions = {
    signup: async(e:RequestEvent) => {
        const { request } = e;
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

        console.log(res)

        if(res.error?.status && res.error?.status){
            const { message } = res.error;

            return error(res.error?.status,{
                message
            })
        }

        const { user } = res.data;

        await supabase.auth.signInWithPassword({
            email: user?.email as string,
            password: password as string
        })

        return { success: true }  
    }
}