<script lang="ts">
    import Icon from "@iconify/svelte";

    export let error: string | undefined = undefined
    export let label: string;
    export let name: string;
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

    {#if inputType !== "textArea"}
        <input 
            type={inputType || "text"} 
            placeholder={placeholder || label} 
            aria-invalid={error ? "true" : "false"} 
            readOnly={readOnly}
            {name}
            {value}
            {id}
            on:input={(e) => {
                inputType === "number" ? e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '') : undefined
            }}
            class={`${inputStyles} outline-offset-0 focus:outline-offset-0 ${error ? "border-primary2 focus:outline-primary2 md:focus:outline-primary2" : ""}`}
        />
        {:else}
        <textarea
            placeholder={placeholder || label} 
            aria-invalid={error ? "true" : "false"} 
            readOnly={readOnly}
            {name}
            {value}
            {id}
            class={`${inputStyles} outline-offset-0 focus:outline-offset-0 ${error ? "border-primary2 focus:outline-primary2 md:focus:outline-primary2" : ""}`}
        />
    {/if}

    {#if error}
        <p role="alert" class="text-primary2 text-sm mt-3 flex gap-2 items-center"><Icon icon="ic:baseline-error" />{error}</p>
    {/if}
</div>