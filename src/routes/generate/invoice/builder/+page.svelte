<script lang="ts">
    import { getTemplate } from "$lib/helperFns/getTemplate";
    import BlueMinimalistBuilder from "$lib/templates/builder/BlueMinimalistBuilder.svelte";
    import BuilderIndicator from "$lib/templates/builder/BuilderIndicator.svelte";
    import WhiteSimpleBuilder from "$lib/templates/builder/WhiteSimpleBuilder.svelte";
    import { TemplateNames } from "../../../../enums";
    import { newInvoiceDataStore } from "../../../../store";

    if(!$newInvoiceDataStore && Object.values($newInvoiceDataStore).length < 1 || !$newInvoiceDataStore.templateInUse){
        window.history.back()
    }

    const Template = getTemplate($newInvoiceDataStore.templateInUse)
</script>

<div class="page p-0 md:p-0 px-0 py-0 lg:px-0 lg:py-0">
    <BuilderIndicator>
        <Template noDetails />
    </BuilderIndicator>
    {#if $newInvoiceDataStore.templateInUse ===  TemplateNames.WhiteSimple}
       <WhiteSimpleBuilder invoiceData={$newInvoiceDataStore} />
    {:else if  $newInvoiceDataStore.templateInUse ===  TemplateNames.BlueMinimalist}
       <BlueMinimalistBuilder invoiceData={$newInvoiceDataStore} />
    {:else if $newInvoiceDataStore.templateInUse ===  TemplateNames.BlackWhiteMinimalist}
       <BlueMinimalistBuilder invoiceData={$newInvoiceDataStore} />
    {/if}
</div>


<style>
    @page {
        size: A4;
        background: red;
    }
</style>