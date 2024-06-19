<script lang="ts">
    import Icon from "@iconify/svelte";

    export let error : string;
</script>

<p role={error ? "alert" : undefined} class="text-red-500/90 text-sm mt-3 flex gap-2 items-center">
   {#if error}
     <Icon icon="ic:baseline-error" class="w-1/4" />
     <span>{error}</span>
   {/if}
</p>