<script lang="ts">
    import Icon from "@iconify/svelte";

    export let error : string;
    export let styles : string | undefined = undefined;
</script>

<p role={error ? "alert" : undefined} class="text-red-500/90 text-sm mt-3 flex gap-2 items-center {styles}">
   {#if error}
     <Icon icon="ic:baseline-error" class="text-2xl" />
     <span>{error}</span>
   {/if}
</p>