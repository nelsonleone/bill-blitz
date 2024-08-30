<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { getTemplate } from "$lib/helperFns/getTemplate";
    import BlackWhiteMinimalist from "$lib/templates/templateAsComponents/BlackWhiteMinimalist.svelte";
    import InvoiceForm from "$lib/templates/invoiceForm/InvoiceForm.svelte";
    import BlueMinimalist from "$lib/templates/templateAsComponents/BlueMinimalist.svelte";
    import { TemplateNames } from "../../../../enums";
    import WhiteSimple from "$lib/templates/templateAsComponents/WhiteSimple.svelte";
    import InterwindLoader from "$lib/statics-assets/interwind-loader.svg";
    import LoadingEllipse from "$lib/statics-assets/loading-ellipse.svg";

    let searchParamTemplate = $page.url.searchParams.get("template")
    let submitting = false;
    let savingInDrafts = false;
    let hasErrors = false;
    $: saveInDraft = savingInDrafts;
    let Template : typeof BlueMinimalist | typeof WhiteSimple | typeof BlackWhiteMinimalist | null;

    if(searchParamTemplate && (searchParamTemplate.match(TemplateNames.BlackWhiteMinimalist) || searchParamTemplate.match(TemplateNames.BlueMinimalist) || searchParamTemplate.match(TemplateNames.WhiteSimple))){
        Template = getTemplate(searchParamTemplate as TemplateNames)
    }else{
        goto("/generate/invoice/templates")
    }


    $: {
        if(hasErrors){
            saveInDraft = false;
        }
    }
    
</script>



<svelte:head>
  <title>Bill-Blitz | Generate Invoice</title>
  <meta name="description" content="Generate new invoice using cool templates" />
  <meta property="og:title" content="Bill-Blitz | Generate Invoice" />
  <meta name="twitter:title" content="Bill-Blitz | Generate Invoice" />
  <meta name="twitter:description" content="Generate new invoice using cool templates" />
</svelte:head>




<main class="page pt-32 flex flex-col lg:ps-[28em] relative bg-gray-100">
    <aside class="max-w-60 w-56 bg-stone-800 rounded-lg lg:fixed lg:top-28 lg:left-16 overflow-hidden">
        <ul class="grid grid-rows-[1fr, 3em] justify-between grid-cols-1">
            <li class="p-1 mx-auto max-w-56 overflow-hidden w-full">
                {#if Template}
                    <div class="relative hover:scale-105 transition ease-out duration-300 overflow-hidden h-52 md:h-60">
                        <div class="backdrop-opacity-40 w-full h-full top-0 bg-slate-400/20 flex justify-center items-center left-0 absolute">In Use</div>
                        <svelte:component this={Template} noDetails={true}></svelte:component>
                    </div>
                {/if}
            </li>
            <li class="w-full">
                <button class="w-full text-base-color1 p-2 disabled:cursor-not-allowed md:p-3 hover:bg-stone-600" on:click={() => goto("/generate/invoice/templates")}>Change Template</button>
            </li>
            <li class="w-full">
                <button disabled={savingInDrafts} on:click={() => {
                    hasErrors = false;
                    saveInDraft = true
                }} class="w-full text-base-color1 p-2 md:p-3 relative hover:bg-stone-600">
                    <span>Save To Drafts</span>
                    <img src={LoadingEllipse} width={savingInDrafts ? 70 : 0} height={savingInDrafts ? 70 : 0} loading="eager" aria-label="loading"  alt="" class={` absolute top-0 bottom-0 left-0 right-0 m-auto drop-shadow-md shadow-sm ${savingInDrafts ? "block" : "hidden"}`} />
                </button>
            </li>
            <li class="w-full">
                <button disabled={submitting} aria-controls="invoice-form" type="submit" form="invoice-form" class="bg-emerald-700 max-h-12 w-full flex justify-center items-center gap-3 text-base-color1 p-3 disabled:cursor-not-allowed hover:bg-stone-700 focus:bg-stone-700 {submitting ? "bg-stone-700" : ""}">
                    <span>Save</span>
                    <img src={InterwindLoader} alt="submitting" aria-hidden="true" width={submitting ? 70 : 0} class="{!submitting ? "invisible w-0" : "visible w-20"}" height={submitting ? 70 : 0} />
               </button>
            </li>
        </ul>
    </aside>

    {#if searchParamTemplate && (searchParamTemplate.match(TemplateNames.BlackWhiteMinimalist) || searchParamTemplate.match(TemplateNames.BlueMinimalist) || searchParamTemplate.match(TemplateNames.WhiteSimple))}
        <InvoiceForm 
            templateInUse={searchParamTemplate}
            {savingInDrafts}
            {saveInDraft}
            on:setSubmitting={(e) => submitting = e.detail}
            on:setSavingInDrafts={(e) => savingInDrafts = e.detail}
            on:setHasErrors={(e) => hasErrors = e.detail}
        />
    {/if}
</main>