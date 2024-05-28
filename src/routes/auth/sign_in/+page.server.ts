import type { Provider } from '@supabase/supabase-js';
import type { RequestEvent } from './$types.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { PUBLIC_BILL_BLITZ_BASE_URL } from '$env/static/public';

export const actions = {
    login: async({ request, url, locals: { supabase } }:RequestEvent) => {

        const provider = url.searchParams.get("provider") as Provider;
        
        if(provider){
            const res = await supabase.auth.signInWithOAuth({
                provider,
                options:{
                    redirectTo: `${PUBLIC_BILL_BLITZ_BASE_URL}`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    }
                }
            })

            if(res.error){
                return fail(res.error?.status || 500,{
                    errorMessage: res.error.message
                })
            }

            if(res.data.url){
                return redirect(303,res.data.url)
            }
        }

        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')

        if(!email || !password){
            throw new Error("Invalid Credentials (email or password is not passed)")
        }

        const res = await supabase.auth.signInWithPassword(
            {
                email: email as string,
                password: password as string
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