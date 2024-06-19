<script lang="ts">
    import WhiteSimpleBuilder from "$lib/templates/builder/WhiteSimpleBuilder.svelte";
    import { TemplateNames } from "../../../../enums";
    import { builtTemplateStore } from "../../../../store";


    let BuiltTemplate : typeof WhiteSimpleBuilder;

    if($builtTemplateStore !== TemplateNames.WhiteSimple){
        BuiltTemplate = WhiteSimpleBuilder;
    }
</script>

<div class="page p-0 md:p-0 px-0 py-0 lg:px-0 lg:py-0">
    <BuiltTemplate />
</div>