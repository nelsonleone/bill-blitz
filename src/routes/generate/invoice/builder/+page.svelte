<script lang="ts">
    import WhiteSimpleBuilder from "$lib/templates/builder/WhiteSimpleBuilder.svelte";
    import { TemplateNames } from "../../../../enums";
    import { builtTemplateStore } from "../../../../store";


    let BuiltTemplate : typeof WhiteSimpleBuilder;

    if($builtTemplateStore !== TemplateNames.WhiteSimple){
        BuiltTemplate = WhiteSimpleBuilder;
    }
</script>

<div class="page flex justify-center items-center">
    <BuiltTemplate />
</div>