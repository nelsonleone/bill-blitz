<script>
    import { templatesArray } from "$lib/templates";

</script>
<main class="page">
    <section class="text-primary-very-dark-blue lg:py-20 lg:px-24">
        <h1 class="mt-16 relative pb-2 font-semibold text-4xl after:w-16 after:bottom-0 after:rounded-lg after:bg-primary-accent-color2 after:h-1 after:absolute after:left-0">Templates</h1>
        
        <div class="mt-16 flex flex-col gap-16 md:flex-row md:justify-center">
            {#each Object.values(templatesArray) as Template}
                <Template noDetails={false} />
            {/each}
        </div>
    </section>
</main>