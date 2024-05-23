import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import Facebook from '@auth/sveltekit/providers/facebook';
import Credentials from '@auth/sveltekit/providers/credentials';
import { hashPassword } from '$lib/helperFns/hashPassword';
import { checkUserExists } from '$lib/helperFns/checkIfUserExists';
import { AUTH_CLIENT_SECRET, AUTH_CLIENT_ID } from '$env/static/private'

const credentialsProvider = Credentials({

  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    let user = null

    const hashedPassword = hashPassword(credentials.password as string)

    // logic to verify if user exists    
    if(!await checkUserExists(credentials.email)){
      throw new Error("User not found.")
    }

    // return json object with the user data
    console.log(user)
    return user
  },
})

const googleProvider = Google({
  clientId: AUTH_CLIENT_ID,
  clientSecret: AUTH_CLIENT_SECRET
})
 
export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [credentialsProvider,googleProvider]
})