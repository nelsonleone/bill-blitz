<script lang="ts">
    import LoadingEllipse from "../../statics-assets/loading-ellipse.svg"

    export let styles;
    export let id: string | undefined = undefined;
    export let text: string | undefined = "";
    export let loading : boolean = false;
    export let inputType: "button" | "submit" = "button";
</script>

<button type={inputType} {id} class={`bg-black relative rounded h-14 p-4 text-base-color1 w-full text-center cursor-pointer font-meduim ${styles}`} on:click>
    {#if !loading}
        {text}
        {:else}
        <img src={LoadingEllipse} width={50} height={50} loading="eager" aria-label="loading"  alt="" class={`top-0 bottom-0 w-12 left-0 right-0 block m-auto absolute`} />
    {/if}
</button>