<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { getTemplate } from "$lib/helperFns/getTemplate";
    import BlueMinimalist from "$lib/templates/BlueMinimalist.svelte";
    import WhiteSimple from "$lib/templates/WhiteSimple.svelte";
    import WhiteSampleForm from "$lib/templates/builder/WhiteSampleForm.svelte";
    import { TemplateNames } from "../../../../enums";

    let searchParam = $page.url.searchParams.get("template")
    let Template : typeof BlueMinimalist | typeof WhiteSimple | null;
    let proceedUserTo ;

    if(searchParam){
        Template = getTemplate(searchParam as TemplateNames)
    }
    $: isUsingBlank = Template ? false : true;

</script>

<main class="page pt-32 flex flex-col lg:flex-row lg:ps-80 relative bg-gray-100">
    <aside class="max-w-60 w-56 bg-stone-800 rounded-lg overflow-hidden lg:fixed lg:top-36 lg:left-6">
        <ul class="grid grid-rows-[1fr, 3em] justify-between grid-cols-1">
            <li class="p-1 mx-auto max-w-56 overflow-hidden w-full">
                {#if Template}
                  <div class="relative hover:scale-105 transition ease-out duration-300">
                    <div class="backdrop-opacity-40 w-full h-full top-0 bg-slate-400/20 flex justify-center items-center left-0 absolute">In Use</div>
                    <Template noDetails={true} />
                </div>
                {:else}
                    <div class="relative bg-gray-100 h-36 w-full">
                        <div class="backdrop-opacity-40 w-full h-full top-0 bg-slate-400/20 flex justify-center items-center left-0 absolute">Blank Template</div>
                    </div>
                {/if}
            </li>
            <li class="w-full">
                <button class="w-full text-base-color1 p-3 hover:bg-stone-600" on:click={() => goto("/templates")}>Change Template</button>
            </li>
            <li class="w-full">
                <button class="w-full text-base-color1 p-3 hover:bg-stone-600">Save To Drafts</button>
            </li>
        </ul>
    </aside>

    {#if searchParam === TemplateNames.WhiteSimple}
      <div class="mt-16">
         <WhiteSampleForm />
      </div>
    {/if}
</main>