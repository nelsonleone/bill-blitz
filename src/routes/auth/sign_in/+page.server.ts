import { signIn } from "$lib/auth/auth.js";
import type { RequestEvent } from "@sveltejs/kit";

export const actions = {	
    login: async (event:RequestEvent) => {
        const data = await event.request.formData()
        await signIn(event)
    }

}