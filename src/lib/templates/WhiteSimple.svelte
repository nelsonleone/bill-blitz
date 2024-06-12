<script lang="ts">
    import { goto } from "$app/navigation";
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import { imagePreviewModalStore } from "../../store";
    import WhiteSimpleImg from "./design/White Simple Invoice.png";

    export let noDetails : boolean = true;
</script>

{#if noDetails}
    <img src={WhiteSimpleImg} alt="Blue Minimalist Template" loading="eager" />
{:else}
    <div class="shadow-sm py-8 px-4 bg-gray-200 rounded-sm">
        <div>
            <img src={WhiteSimpleImg} on:click={(e) => imagePreviewModalStore.set({ src: e.currentTarget.src })} class="cursor-pointer hover:scale-105 transition-all w-60 mx-auto ease-in-out duration-300" alt="White Simple Template" width={500} height={500} loading="eager" />
        </div>

        <div class="text-center text-primary-very-dark-blue">
            <h2 class="text-xl font-semibold font-rubik my-4">White Simple Invoice</h2>
            <p>Created By An Awesome Designer From <strong class="underline inline font-medium">Canva</strong></p>

            <CustomButton styles="mx-auto min-w-fit w-40 py-3 mt-6 bg-primary-very-dark-blue hover:opacity-85 transition ease-in-out duration-200" on:click={() => goto("/generate/invoice/new?template=WhiteSimple")}>Use Template</CustomButton>
        </div>
    </div>
{/if}