<script lang="ts">
    import InvoiceFormInput from "../inputs/InvoiceFormInput.svelte";

    export let description: string;
    export let quantity: number | undefined = undefined;
    export let price : string;
    export let amount : string;
    export let index : number;
    export let setItem : (e: {    currentTarget: EventTarget & HTMLInputElement;}, index: number) => void;

    let hideInputs = false;
</script>

<div>
    {#if hideInputs}
        <p>{description}</p>
    {:else}
    <InvoiceFormInput 
        name="description" 
        id={`invoiceItem-description-${index}`}
        inputType="text" 
        placeholder="e.g Bag Of Rice" 
        label="Item Description" 
        labelStyles=""
        inputStyles="bg-stone-100 border border-gray-500 rounded-md p-3 h-12"
    />
    {/if}
    <div>
        <InvoiceFormInput 
            name="quantity" 
            id={`invoiceItem-description-${index}`}
            inputType="number" 
            placeholder="Item quantity" 
            label="Quantity" 
            labelStyles=""
            inputStyles="bg-stone-100 border border-gray-500 rounded-md p-3 h-12"
        />
        <InvoiceFormInput 
            name="price" 
            id={`invoiceItem-price-${index}`}
            inputType="text" 
            placeholder="Item price" 
            label="Price" 
            labelStyles=""
            inputStyles="bg-stone-100 border border-gray-500 rounded-md p-3 h-12"
        />
        <InvoiceFormInput 
            name="amount" 
            id={`invoiceItem-description-${index}`}
            inputType="text" 
            placeholder="e.g Bag Of Rice" 
            label="Amount $" 
            labelStyles=""
            inputStyles="bg-stone-100 border border-gray-500 rounded-md p-3 h-12"
        />
    </div>
</div>