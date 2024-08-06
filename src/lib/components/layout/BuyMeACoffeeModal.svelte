<script> 
    import Icon from '@iconify/svelte';
    import { createEventDispatcher } from 'svelte'; 
    import IconButton from '../buttons/IconButton.svelte';
    
    let showModal = true; 
    const dispatch = createEventDispatcher()
    function toggleModal() { 
        showModal = !showModal; 
        dispatch('modal-toggled', { showModal }) 
    } 
</script> 

<style> 
    .modal { position: fixed; z-index: 1; right: 0; left: 0; bottom: 0; top: 0; max-width: 95%; width: 20em; min-height: 5em; overflow: auto;display: flex; justify-content: center; align-items: center; } 
</style>


{#if showModal}
<div class="modal m-auto z-[100]">
    <div class="p-8 text-center rounded shadow-3xl drop-shadow-2xl relative pt-3 bg-gray-100">
        <IconButton on:click={toggleModal} styles="bg-transparent text-base-color2">
            <Icon icon="ic:twotone-close" class="absolute right-4 top-4 text-xl" />
        </IconButton>
        <h2 class="text-2xl my-3 text-emerald-700">Buy Me a Coffee</h2>
        <p>If you've found my work helpful, consider buying me a coffee to show your support.</p>
        <a href="https://buymeacoffee.com/nelsonf2e" target="_blank">
            <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                class="w-48 mx-auto"
            />
        </a>
    </div>
</div>
{:else}
    <IconButton on:click={toggleModal} styles="fixed text-3xl text-orange-400 shadow-2xl bottom-0 h-fit left-0 bg-transparent text-base-color2 md:text-5xl md:bottom-14">
        <Icon icon="simple-icons:buymeacoffee" />
    </IconButton>
{/if}


