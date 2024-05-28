<script lang="ts">
    import Icon from "@iconify/svelte";
    import IconButton from "./IconButton.svelte";
    import { AlertSeverity } from "../../../enums";
    import { alertStore } from "../../../store";
    import { supabaseClient } from "$lib/supabaseClient";
    import { PUBLIC_BILL_BLITZ_BASE_URL } from "$env/static/public";
    import type { Provider } from "@supabase/supabase-js";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { enhance } from "$app/forms";


</script>

<form method="post" class="flex flex-col justify-center items-center w-56 mx-auto">
    <p class="text-center decoration-dotted underline font-medium my-3">Other Sign-In Options</p>
    <IconButton formaction="?/login&provider=google" buttonType="submit" text="Google" styles="text-sm py-2 min-w-32 w-32 rounded-lg bg-transparent border border-gray-600 text-primary-dark-blue my-2 font-medium hover:scale-105 hover:shadow-inner hover:drop-shadow-md">
        <Icon aria-hidden="true" class="text-2xl" icon="flat-color-icons:google" />
    </IconButton>
    <IconButton formaction="?/login&provider=facebook"  buttonType="submit" text="Facebook" styles="text-sm py-2 min-w-32 w-32 rounded-lg bg-transparent border border-gray-600 text-primary-dark-blue my-2 font-medium hover:scale-105 hover:shadow-inner hover:drop-shadow-md">
        <Icon aria-hidden="true" class="text-2xl" icon="logos:facebook" />
    </IconButton>
</form>