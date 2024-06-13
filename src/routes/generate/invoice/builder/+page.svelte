<script lang="ts">
    import WhiteSimpleBuilder from "$lib/templates/builder/WhiteSimpleBuilder.svelte";
    import WhiteSampleForm from "$lib/templates/invoiceForm/WhiteSampleForm.svelte";
    import { TemplateNames } from "../../../../enums";
    import { builtTemplateStore } from "../../../../store";

    let BuiltTemplate : typeof WhiteSampleForm;


    if($builtTemplateStore !== TemplateNames.WhiteSimple){
        BuiltTemplate = WhiteSimpleBuilder;
    }
</script>


<div class="page">
    <BuiltTemplate />
</div>