<script>
    import { templatesArray } from "$lib/templates";

</script>
<main class="page px-4 md:px-8 xl:px-16">
    <section class="text-primary-very-dark-blue lg:py-20 lg:px-24">
        <h1 class="mt-16 relative pb-2 font-semibold text-4xl after:w-16 after:bottom-0 after:rounded-lg after:bg-primary-accent-color2 after:h-1 after:absolute after:left-0">Templates</h1>
        
        <div class="mt-16 flex flex-col gap-[10%] md:flex-row md:justify-center">
            {#each Object.values(templatesArray) as Template}
                <div class="md:w-[30%]">
                    <Template noDetails={false} />
                </div>
            {/each}
        </div>
    </section>
</main>