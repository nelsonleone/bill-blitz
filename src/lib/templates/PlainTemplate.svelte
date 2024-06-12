<script lang="ts">
    import { goto } from "$app/navigation";
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import { imagePreviewModalStore } from "../../store";
    import PlainTemplate from "./design/PlainTemplate.png";

    export let noDetails : boolean = true;
</script>

{#if noDetails}
    <img src={PlainTemplate} alt="Blue Minimalist Template" loading="eager" />
{:else}
    <div class="shadow-sm py-8 px-4 bg-gray-200 rounded-sm">
        <div>
            <img src={PlainTemplate} on:click={(e) => imagePreviewModalStore.set({ src: e.currentTarget.src })} class="cursor-pointer hover:scale-105 transition-all w-60 mx-auto ease-in-out duration-300" alt="Blue Minimalist Template" width={500} height={500} loading="eager" />
        </div>

        <div class="text-center text-primary-very-dark-blue">
            <h2 class="text-xl font-semibold font-rubik my-4">Plain Template</h2>
            <CustomButton styles="mx-auto min-w-fit w-40 py-3 mt-6 bg-primary-very-dark-blue hover:opacity-85 transition ease-in-out duration-200" on:click={() => goto("/generate/invoice/new?template=PlainTemplate")}>Use Template</CustomButton>
        </div>
    </div>
{/if}