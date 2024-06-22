<script lang="ts">
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import { imagePreviewModalStore } from "../../../store";
    import BlackWhiteMinimalist from "./../design/Black-White-Minimalist.png";

    export let noDetails : boolean = true;
</script>

{#if noDetails}
    <img src={BlackWhiteMinimalist} alt="Blue Minimalist Template" loading="eager" />
{:else}
    <div class="shadow-sm py-8 px-4 bg-gray-200 rounded-sm">
        <div>
            <button on:click={() => imagePreviewModalStore.set({ src: BlackWhiteMinimalist })} class="focus:outline-none flex justify-center  w-60 mx-auto focus:outline-offset-0 focus:border-none">
                <img src={BlackWhiteMinimalist} class="cursor-pointer hover:scale-105 transition-all w-full ease-in-out duration-300" alt="Blue Minimalist Template" width={500} height={500} loading="eager" />
            </button>
        </div>

        <div class="text-center text-primary-very-dark-blue">
            <h2 class="text-xl font-semibold font-rubik my-4">Black-White Minimalist Template</h2>
            <p>Created By An Awesome Designer From <strong class="underline inline font-medium">Canva</strong></p>
            <CustomButton styles="mx-auto min-w-fit w-40 py-3 mt-6 bg-primary-very-dark-blue hover:opacity-85 transition ease-in-out duration-200" href="/generate/invoice/new?template=BlackWhiteMinimalist">Use Template</CustomButton>
        </div>
    </div>
{/if}