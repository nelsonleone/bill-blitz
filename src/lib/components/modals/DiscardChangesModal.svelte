<script lang="ts">
    import { Dialog } from "bits-ui";
    import { fade, scale } from "svelte/transition";
    import CustomButton from "../buttons/CustomButton.svelte";

    export let showDiscardModal = false;
    export let onConfirm;
    export let onCancel;
</script>

<Dialog.Root open={showDiscardModal} closeOnOutsideClick={false}>
    <Dialog.Portal>
        <Dialog.Overlay
            transition={fade}
            transitionConfig={{ duration: 150 }}
            class="fixed inset-0 z-50 bg-black/80"
        />
        <Dialog.Content
            transition={scale}
            class="fixed left-[50%] top-[50%] z-50 lg:w-96 rounded-xl text-primary-dark-blue translate-x-[-50%] translate-y-[-50%] border bg-gray-100 p-5 pt-16 shadow-popover outline-none sm:max-w-[490px] md:px-10"
        >
            <Dialog.Title
            class="w-full text-center text-2xl font-rubik font-semibold tracking-tight"
            >
            Discard <span class="text-primary-accent-color3"> Changes</span>
            </Dialog.Title>
            <Dialog.Description class="text-sm text-foreground-alt mt-3 font-overpass text-center lg:text-base">
                You have unsaved changes
            </Dialog.Description>

            <div class="flex justify-center gap-10 my-4">
                <CustomButton on:click={() =>    onConfirm()} styles="bg-primary-very-dark-blue text-base-color1 w-28 hover:bg-red-600">Discard</CustomButton>
                <CustomButton styles="bg-primary-very-dark-blue text-base-color1 w-28 hover:bg-green-600" on:click={() => onCancel()}>Cancel</CustomButton>
            </div>
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>