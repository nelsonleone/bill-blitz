import { createClient } from '@supabase/supabase-js'
import { SUPA_BASE_PROJECT_URL, SUPA_BASE_ANON_KEY } from '$env/static/private';

export const supabase = createClient(SUPA_BASE_PROJECT_URL, SUPA_BASE_ANON_KEY)