<script lang="ts">
    import type { Booleanish } from "svelte/elements";

    export let styles;
    export let text : string | undefined = undefined;
    export let ariaLabel : string | undefined = undefined;
    export let ariaControls : string | undefined = undefined;
    export let ariaExpanded : Booleanish | null | undefined = undefined;
    export let buttonType : "button" | "submit" | undefined = "button";
    export let formaction : string | undefined = undefined;
</script>

<button formaction={formaction} type={buttonType || "button"} aria-controls={ariaControls} aria-expanded={ariaExpanded} on:click|self aria-label={ariaLabel || undefined} class={`bg-black rounded p-4 block text-base-color1 font-meduim transition ease-in-out duration-200 w-auto ${text ? "flex flex-row-reverse justify-center items-center gap-3" : ""} ${styles}`} on:click>
    {#if text}
        <span>{text}</span>
    {/if}
    {#if $$slots.default}
        <slot />
    {/if}
</button>