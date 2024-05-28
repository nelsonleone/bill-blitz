import { fail, redirect } from '@sveltejs/kit'

export const actions = {
    default: async ({ request, url, locals: { supabase } }) => {
        const password = (await request.formData()).get("password") as string;

        if(!password){
            return fail(400,{
                invalidPassword:"Please enter a valid password"
            })
        }
        if(password.length < 7){
            return fail(400,{
                invalidPassword:"Password is too short"
            })
        }

        
        const accessToken = url.hash.includes('access_token=')
            ? url.hash.split('access_token=')[1]
            : null
        ;

        const { error } = await supabase.auth.updateUser({
            password
        })

        if(error){
            return fail(error.status || 500,{
                errorMessage: error.message
            })
        }

        return {
            success: true
        }
    }
}


export const load = ({ request, url }) => {
    const accessToken = url.hash.includes('access_token=')
      ? url.hash.split('access_token=')[1]
      : null;
  
    // Check if the access token is available
    if (!accessToken) {
      throw redirect(302, request.headers.get('referer') || "/")
    }
  
    return {
      accessToken
    }
}