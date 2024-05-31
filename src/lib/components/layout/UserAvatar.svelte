<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { User } from "@supabase/supabase-js";
    import { Avatar } from "bits-ui";

    export let user : User | null;
</script>
<div class="relative h-12 w-12">
    <Avatar.Root
        class="w-full h-full rounded-full cursor-pointer border bg-muted text-[17px] font-medium uppercase text-muted-foreground"
        >
        <div
            class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
        >
            <Avatar.Image src={user?.user_metadata.avatar_url} alt="user avatar" />
            <Avatar.Fallback class="border border-muted">{user?.user_metadata.email?.slice(0,2)?.toUpperCase()}</Avatar.Fallback>
        </div>
    </Avatar.Root>
    {#if user?.user_metadata.pro_user}
        <Icon icon="ic:sharp-workspace-premium"  class="absolute text-2xl text-green-400 -top-1 -right-1 stroke-green-400" aria-label="unlocked app" />
    {/if}
</div>