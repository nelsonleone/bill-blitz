<script lang="ts">
    import { onDestroy } from "svelte";
    import { Dialog } from "bits-ui";
    import { imagePreviewModalStore } from "../../../store";
    import Icon from "@iconify/svelte";
    import { fade, fly } from "svelte/transition";

    let src: string | null = null;

    $: showModal = src ? true : false;

    // Subscribe to the store
    const unsubscribe = imagePreviewModalStore.subscribe((value) => {
        src = value.src;
    })

    onDestroy(() => {
        unsubscribe()
    })

    const handleClose = () => {
        imagePreviewModalStore.set({ src: null })
        showModal = false;
    }
</script>

<Dialog.Root open={showModal} onOutsideClick={() => imagePreviewModalStore.set({ src: null })}>
    <Dialog.Portal>
        <Dialog.Overlay
            transition={fade}
            transitionConfig={{ duration: 150 }}
            class="fixed inset-0 z-50 bg-black/70 justify-center items-center"
        />
      <Dialog.Content transition={fly} class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-card-lg bg-background p-5 shadow-popover outline-none sm:max-w-[500px] md:w-full">
        <img {src} alt="Blue Minimalist Template" width={400} height={400} />

        <Dialog.Close on:click={handleClose} class="absolute right-5 lg:right-0 lg:top-6 text-base-color1 text-3xl -top-5 rounded-md active:scale-98 focus:outline-none focus:outline-offset-0">
            <Icon icon="fa:close" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>

