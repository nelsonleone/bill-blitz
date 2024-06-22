<script lang="ts">
    import BlueMinimalistBuilder from "$lib/templates/builder/BlueMinimalistBuilder.svelte";
    import WhiteSimpleBuilder from "$lib/templates/builder/WhiteSimpleBuilder.svelte";
    import { TemplateNames } from "../../../../enums";
    import { newInvoiceDataStore } from "../../../../store";

    let BuiltTemplate : typeof WhiteSimpleBuilder;

    if($newInvoiceDataStore.templateInUse === TemplateNames.WhiteSimple){
        BuiltTemplate = WhiteSimpleBuilder;
    }else if($newInvoiceDataStore.templateInUse === TemplateNames.BlueMinimalist){
        BuiltTemplate = BlueMinimalistBuilder;
    }
</script>

<div class="page p-0 md:p-0 px-0 py-0 lg:px-0 lg:py-0">
    <BuiltTemplate />
</div>


<style>
    @page {
        size: A4;
        background: red;
    }
</style>