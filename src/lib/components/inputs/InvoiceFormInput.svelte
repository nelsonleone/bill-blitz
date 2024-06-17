<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { IBasicInvoiceData, IBasicInvoiceDataKeys } from "../../../types/types";

    export let error: string | undefined = undefined
    export let label: string;
    export let name: keyof IBasicInvoiceData | IBasicInvoiceDataKeys
    export let value: string | number | undefined = "";
    export let placeholder: string;
    export let inputType: "email" | "text" | "number" | "textArea";
    export let labelStyles: string | undefined = undefined;   
    export let inputStyles: string | undefined = undefined;
    export let containerStyles: string | undefined = undefined;
    export let readOnly: boolean | undefined = undefined;
    export let id: string;
</script>


<div class={`mb-8  ${containerStyles}`}>
    {#if label && label.length}
        <label for={id} class={labelStyles}>{label}</label>
    {/if}

    {#if inputType ===  "text"}
        <input 
            type="text"
            placeholder={placeholder || label} 
            aria-invalid={error ? "true" : "false"} 
            readOnly={readOnly}
            bind:value={value}
            {name}
            on:change
            on:input
            on:keyup
            {id}
            class={`outline-offset-0 focus:outline-offset-0 ${error ? "border border-primary-accent-color3 outline-primary-accent-color3 focus:outline focus:outline-2 focus:outline-primary-accent-color3 md:focus:outline-primary-accent-color3" : ""} ${inputStyles}`}
        />

        {:else if inputType ===  "number"}
        <input 
            type="number"
            placeholder={placeholder || label} 
            aria-invalid={error ? "true" : "false"} 
            readOnly={readOnly}
            bind:value={value}
            {name}
            {id}
            on:change
            on:keyup
            on:input={() => {
               value = name === "tax" ? String(value)?.replace(/[^0-9]/g, '') + '%' : String(value)?.replace(/[^0-9]/g, '')
            }}
            class={`outline-offset-0 focus:outline-offset-0 ${error ? "border border-primary-accent-color3 outline-primary-accent-color3 focus:outline focus:outline-2 focus:outline-primary-accent-color3 md:focus:outline-primary-accent-color3" : ""} ${inputStyles}`}
        />

        {:else if inputType ===  "textArea"}
        <textarea
            placeholder={placeholder || label} 
            aria-invalid={error ? "true" : "false"} 
            readOnly={readOnly}
            on:change
            on:keyup
            on:input
            {name}
            bind:value={value}
            {id}
            class={`outline-offset-0 focus:outline-offset-0 font-medium min-h-20 ${error ? "border border-primary-accent-color3 outline-primary-accent-color3 focus:outline focus:outline-2 focus:outline-primary-accent-color3 md:focus:outline-primary-accent-color3" : ""} ${inputStyles}`}
        />
    {/if}

    {#if error}
        <p role="alert" class="text-primary-accent-color3 text-sm mt-3 flex gap-2 items-center"><Icon icon="ic:baseline-error" />{error}</p>
    {/if}
</div>