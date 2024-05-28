<script lang="ts">
    import type { Booleanish } from "svelte/elements";

    export let styles;
    export let id: string | undefined = undefined;
    export let text: string | undefined = "";
    export let href: string | undefined = undefined;
    export let buttonType: "button" | "submit" = "button";
    export let ariaLabel : string | undefined = undefined;
    export let ariaControls : string | undefined = undefined;
    export let ariaExpanded : Booleanish | null | undefined = undefined;
    export let disabled : boolean | undefined = undefined;
</script>

{#if !href}
<button type={buttonType} {disabled} {id} aria-label={ariaLabel} aria-controls={ariaControls} aria-expanded={ariaExpanded} class={`bg-black rounded p-4 block text-base-color1 w-full text-center cursor-pointer font-meduim ${styles}`} on:click>
    {#if text}
        {text}
        {:else}
        <slot />
    {/if}
    </button>

  {:else}
    <a href={href} {id} class={`bg-black rounded p-4 block text-base-color1 w-full text-center cursor-pointer font-meduim disabled:cursor-not-allowed disabled:opacity-85 ${styles}`} on:click>
        {#if text}
            {text}
            {:else}
            <slot />
        {/if}
    </a>
{/if}