<script lang="ts">
    export let styles;
    export let id:string | undefined = undefined;
    export let text:string | undefined = undefined;
    export let ariaLabel:string | undefined = undefined;
    export let buttonType:"button" | "submit" | undefined = "button";
</script>

<button type={buttonType || "button"} on:click|self aria-controls={id} aria-label={ariaLabel || undefined} class={`bg-black rounded p-4 block text-base-color1 w-full font-meduim transition ease-in-out duration-200 ${text ? "flex flex-row-reverse justify-center items-center gap-3" : ""} ${styles}`} on:click>
    {#if text}
        <span>{text}</span>
    {/if}
    {#if $$slots.default}
        <slot />
    {/if}
</button>