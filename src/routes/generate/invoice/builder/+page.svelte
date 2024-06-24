<script lang="ts">
    import { getTemplate } from "$lib/helperFns/getTemplate";
    import { demoData } from "$lib/helperFns/handleInvoiceFormDataCheck";
    import BlueMinimalistBuilder from "$lib/templates/builder/BlueMinimalistBuilder.svelte";
    import BuilderIndicator from "$lib/templates/builder/BuilderIndicator.svelte";
    import WhiteSimpleBuilder from "$lib/templates/builder/WhiteSimpleBuilder.svelte";
    import { onMount } from "svelte";
    import { TemplateNames } from "../../../../enums";
    import { newInvoiceDataStore } from "../../../../store";
    import BlackWhiteMinimalistBuilder from "$lib/templates/builder/BlackWhiteMinimalistBuilder.svelte";

    if(!demoData && Object.values(demoData).length < 1 || !demoData.templateInUse){
        window.history.back()
    }

    let building : boolean = true; 



    const Template = getTemplate(TemplateNames.BlackWhiteMinimalist)
</script>

<div class="page p-0 md:p-0 px-0 py-0 lg:px-0 lg:py-0">
    <div >
        {#if demoData.templateInUse ===  TemplateNames.WhiteSimple}
            <WhiteSimpleBuilder invoiceData={demoData} />
        {:else if  demoData.templateInUse ===  TemplateNames.BlueMinimalist}
            <BlueMinimalistBuilder invoiceData={demoData} />
        {:else if demoData.templateInUse ===  TemplateNames.BlackWhiteMinimalist}
            <BlackWhiteMinimalistBuilder invoiceData={demoData} />
        {/if}
    </div>
</div>


<style>
    @page {
        size: A4;
        background: red;
    }
</style>