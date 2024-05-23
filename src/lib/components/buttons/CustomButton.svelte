<script lang="ts">
    export let styles;
    export let id: string | undefined = undefined;
    export let text: string | undefined = "";
    export let href: string | undefined = undefined;
    export let inputType: "button" | "submit" = "button";
</script>

{#if !href}
    <button type={inputType} {id} class={`bg-black rounded p-4 block text-base-color1 w-full text-center cursor-pointer font-meduim ${styles}`} on:click>
    {#if text}
        {text}
        {:else}
        <slot />
    {/if}
    </button>

  {:else}
    <a href={href} {id} class={`bg-black rounded p-4 block text-base-color1 w-full text-center cursor-pointer font-meduim ${styles}`} on:click>
        {#if text}
            {text}
            {:else}
            <slot />
        {/if}
    </a>
{/if}