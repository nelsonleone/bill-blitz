import { handleSignInWith0Auth } from '$lib/helperFns/handleSignInWith0Auth.server.js';
import type { RequestEvent } from './$types.js';
import { error, fail, redirect } from '@sveltejs/kit';

export const actions = {
    login: async({ request, url, locals: { supabase } }:RequestEvent) => {

        const socialSignInRes = await handleSignInWith0Auth(url,supabase)

        if(socialSignInRes){
            if(socialSignInRes.data && socialSignInRes.data.url){
                throw redirect(303,socialSignInRes.data.url)
            }
            else if(socialSignInRes.error){
                if(socialSignInRes.error){
                    return fail(socialSignInRes.error?.status || 500,{
                        socialSignInErrorMessage: socialSignInRes.error.message
                    })
                }
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

        console.log(res)

        if(res.error?.status){
            const { message } = res.error;

            return error(res.error?.status,{
                message
            })
        }
 
        return { success: true }  
    }
}