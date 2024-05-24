import { supabase } from '$lib/supabaseClient.js';
import type { RequestEvent } from './$types.js';
import { error } from '@sveltejs/kit';

export const actions = {
    login: async(e:RequestEvent) => {
        const { request } = e;
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')

        if(!email || !password){
            throw new Error("Invalid Credentials (verify email or password is passed)")
        }

        const res = await supabase.auth.signInWithPassword(
            {
                email: email as string,
                password: password as string
            }
        )

        if(res.error?.status && res.error?.status >= 400){
            const { message } = res.error;

            return error(res.error?.status,{
                message
            })
        }

        return { success: true }  
    }
}