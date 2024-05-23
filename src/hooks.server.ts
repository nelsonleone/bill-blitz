import { redirect, type Handle } from '@sveltejs/kit';
import { handle as authenticationHandle  } from '$lib/auth/auth';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = async ({ event, resolve }) => {
  const { url, route } = event

  // Exclude the /auth route from the middleware
  if (event.url.pathname.startsWith('/generate')) {
    const session = await event.locals.auth()
    if (!session) {
      // Redirect to the signin page
      throw redirect(303, '/auth/signin')
    }
  }

  return resolve(event)
}
