<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { ICurrency, ValidationErrors } from "../../../types/types";
    import InvoiceFormInput from "../inputs/InvoiceFormInput.svelte";
    import CurrencyIcon from "./CurrencyIcon.svelte";

    export let description: string;
    export let quantity: number | undefined = undefined;
    export let price : string;
    export let amount : string;
    export let index : number;
    export let currency : ICurrency;
    export let errors : ValidationErrors = {}
    export let clearErrors : (e:{ currentTarget: EventTarget & HTMLInputElement} | Event) => void;
    export let setItemsInputValues : (e:{ currentTarget: EventTarget & HTMLInputElement} | Event,index:number) => void;
    let hideInputs = false;

    const handleOnChange = (e:{ currentTarget: EventTarget & HTMLInputElement} | Event) => {
        setItemsInputValues(e,index)
        clearErrors(e)
    }
</script>

<div class="bg-stone-700 text-base-color1 rounded-md p-4 mb-5">
    {#if hideInputs}
        <p class="col-span-3">{description}</p>
    {:else}
    <InvoiceFormInput 
        name="description" 
        id={`invoiceItem-description-${index}`}
        inputType="text"
        value={description}
        placeholder="e.g Bag Of Rice" 
        label="Item Description" 
        labelStyles=""
        on:change={handleOnChange}
        containerStyles="col-span-3"
        inputStyles="text-stone-700 bg-stone-100 border border-gray-500 w-full rounded-md p-3 h-12"
    />
    {/if}
    <div class="flex justify-between">
        {#if hideInputs}
            <p>{quantity}</p>
            <p><CurrencyIcon currency={currency.value} styles="" />{price}</p>
            <p>{amount}</p>
        {:else}
           <InvoiceFormInput 
                name="quantity" 
                value={quantity}
                id={`invoiceItem-quantity-${index}`}
                inputType="number" 
                placeholder="Item quantity" 
                label="Quantity" 
                labelStyles=""
                on:change={handleOnChange}
                containerStyles="w-[30%]"
                inputStyles="text-stone-700 bg-stone-100 border w-full border-gray-500 rounded-md p-3 h-12"
            />
            <InvoiceFormInput 
                name="price" 
                value={price}
                id={`invoiceItem-price-${index}`}
                inputType="number" 
                placeholder="Item price" 
                label="Price" 
                labelStyles=""
                on:change={handleOnChange}
                containerStyles="w-[30%]"
                inputStyles="text-stone-700 bg-stone-100 border w-full border-gray-500 rounded-md p-3 h-12"
            />
            <InvoiceFormInput 
                name="amount" 
                value={amount}
                id={`invoiceItem-amount-${index}`}
                inputType="number" 
                placeholder="Item amount" 
                label="Amount $" 
                on:change={clearErrors}
                containerStyles="w-[30%]"
                labelStyles=""
                inputStyles="text-stone-700 bg-stone-100 border w-full border-gray-500 rounded-md p-3 h-12"
            />
        {/if}
    </div>
    {#if Object.values(errors)[0]?.message}
        <p role="alert" class="text-red-300 text-sm mt-3 flex gap-2 items-center"><Icon class="text-xl" icon="ic:baseline-error" />{Object.values(errors)[0]?.message}</p>
    {/if}
</div>