<script>
    import { goto } from "$app/navigation";
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";


    import { templatesArray } from "$lib/templates";

</script>
<main class="page">
    <section class="text-primary-very-dark-blue lg:py-20 lg:px-24">
        <h1 class="mt-16 relative pb-2 font-semibold text-4xl after:w-16 after:bottom-0 after:rounded-lg after:bg-primary-accent-color2 after:h-1 after:absolute after:left-0">Templates</h1>
        
        <div class="mt-16 flex flex-col gap-16 md:flex-row md:justify-center">
            <div class="shadow-sm py-8 px-4 bg-gray-200 rounded-sm">
                <div class="w-60 mx-auto rounded-sm h-60 bg-base-color1 shadow-md">
                </div>
        
                <div class="text-center text-primary-very-dark-blue">
                    <h2 class="text-xl font-semibold font-rubik my-4">Plain Template</h2>        
                    <CustomButton styles="mx-auto min-w-fit w-40 py-3 mt-6 bg-primary-very-dark-blue hover:opacity-85 transition ease-in-out duration-200" on:click={() => goto("/generate/invoice/new?template=WhiteSimple")}>Use Template</CustomButton>
                </div>
            </div>
            {#each Object.values(templatesArray) as Template}
                <Template noDetails={false} />
            {/each}
        </div>
    </section>
</main>