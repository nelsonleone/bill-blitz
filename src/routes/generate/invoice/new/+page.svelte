<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { getTemplate } from "$lib/helperFns/getTemplate";
    import BlackWhiteMinimalist from "$lib/templates/BlackWhiteMinimalist.svelte";
    import BlueMinimalist from "$lib/templates/BlueMinimalist.svelte";
    import WhiteSimple from "$lib/templates/WhiteSimple.svelte";
    import BlackWhiteMinimalistForm from "$lib/templates/invoiceForm/BlackWhiteMinimalistForm.svelte";
    import BlueMinimalistForm from "$lib/templates/invoiceForm/BlueMinimalistForm.svelte";
    import WhiteSampleForm from "$lib/templates/invoiceForm/WhiteSampleForm.svelte";
    import { TemplateNames } from "../../../../enums";
    import ColorPicker from 'svelte-awesome-color-picker';

    export let form;

    let borderColor = {
        hex: undefined,
        rgb: undefined,
        hsv: undefined,
        color: undefined
    }
    let searchParam = $page.url.searchParams.get("template")
    let Template : typeof BlueMinimalist | typeof WhiteSimple | typeof BlackWhiteMinimalist | null;

    if(searchParam){
        Template = getTemplate(searchParam as TemplateNames)
    }

</script>

<main class="page pt-32 flex flex-col lg:ps-[28em] relative bg-gray-100">
    <aside class="max-w-60 w-56 bg-stone-800 rounded-lg lg:fixed lg:top-32 lg:left-16">
        <ul class="grid grid-rows-[1fr, 3em] justify-between grid-cols-1">
            <li class="p-1 mx-auto max-w-56 overflow-hidden w-full">
                {#if Template}
                    <div class="relative hover:scale-105 transition ease-out duration-300">
                        <div class="backdrop-opacity-40 w-full h-full top-0 bg-slate-400/20 flex justify-center items-center left-0 absolute">In Use</div>
                        <Template noDetails={true} />
                    </div>
                {/if}
            </li>
            <li class="w-full">
                <button class="w-full text-base-color1 p-3 hover:bg-stone-600" on:click={() => goto("/templates")}>Change Template</button>
            </li>
            <li class="w-full flex relative justify-center text-base-color1 p-3 hover:bg-stone-600 color-input-li">
                <ColorPicker
                    bind:hex={borderColor.hex}
                    bind:rgb={borderColor.rgb}
                    bind:hsv={borderColor.hsv}
                    bind:color={borderColor.color}
                    --picker-height="100px"
                    --picker-width="100px"
                    --slider-width="25px"
                    --picker-indicator-size="25px"
                    --picker-z-index="10"
                    --focus-color="green"
                    nullable
                    label="Add Border"
                />
            </li>
            <li class="w-full">
                <button class="w-full text-base-color1 p-3 hover:bg-stone-600">Save To Drafts</button>
            </li>
        </ul>
    </aside>

    {#if searchParam === TemplateNames.WhiteSimple}
        <div class="mt-16">
            <WhiteSampleForm {borderColor} />
        </div>
      {:else if searchParam === TemplateNames.BlueMinimalist}
        <div class="mt-16">
            <BlueMinimalistForm {borderColor} />
        </div>
      {:else if searchParam === TemplateNames.BlackWhiteMinimalist}
        <div class="mt-16">
            <BlackWhiteMinimalistForm errorMessage={form?.errorMessage} {borderColor} />
        </div>
    {/if}
</main>