<script lang="ts">
    import { signature } from 'svelte-signature-pad'
    import { Dialog } from 'bits-ui';
    import CustomButton from '../buttons/CustomButton.svelte';
    import { fade, scale } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
  
    let layers: { path: string; width: number; height: number }[] = []
    let width: number = 100;
    let height: number = 100;
    let preview: string;
    export let openSignaturePad = false;
    export let handleShowOpenSignaturePad : () => void;
    
    const ondraw = (path: string) => (preview = path)
    const oncomplete = (path: string) => {
      preview = ''
      layers = [...layers, { width, height, path }]
    }

    const dispatch = createEventDispatcher()

    const handleSave = () => {
        dispatch("setSignature",layers)
        openSignaturePad = false;
    }
  
    const clear = () => {
      layers = []
    }
</script>
  
<Dialog.Root open={openSignaturePad} onOutsideClick={handleShowOpenSignaturePad}>
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
            <div class="relative w-full h-[190px] bg-gray-100 border border-dashed border-gray-300">
                <div class="absolute left-4 right-4 bottom-24 border-t border-dotted border-gray-300" />
                <div
                class="w-full h-full"
                use:signature={{ ondraw, oncomplete }}
                bind:clientWidth={width}
                bind:clientHeight={height}
                on:touchmove|preventDefault={() => false}
                >
                {#each layers as layer}
                    <svg class="absolute w-full h-full fill-black pointer-events-none" viewBox="0 0 {layer.width} {layer.height}">
                    <path d={layer.path} />
                    </svg>
                {/each}
            
                {#if preview}
                    <svg class="absolute w-full h-full fill-gray-900 pointer-events-none" viewBox="0 0 {width} {height}">
                    <path d={preview} />
                    </svg>
                {/if}
                </div>
                <button type="button" class="absolute top-2 right-2 px-4 py-2 text-sm text-gray-500 bg-white border border-gray-200" on:click={clear}>Clear</button>
            </div>
            <div class="flex justify-center gap-10 my-4">
                <CustomButton on:click={handleShowOpenSignaturePad} styles="bg-primary-very-dark-blue text-base-color1 w-28 hover:bg-red-600">Close</CustomButton>
                <CustomButton on:click={handleSave} styles="bg-primary-very-dark-blue text-base-color1 w-28 hover:bg-green-600">Save</CustomButton>
            </div>
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>
