<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { ICurrency, ValidationErrors } from "../../../types/types";
    import InvoiceFormInput from "../inputs/InvoiceFormInput.svelte";
    import CurrencyIcon from "./CurrencyIcon.svelte";
    import IconButton from "../buttons/IconButton.svelte";
    import CustomTooltip from "../prompts/CustomTooltip.svelte";
    import { fade, slide } from "svelte/transition";
	import * as eases from 'svelte/easing';

    export let description: string;
    export let quantity: number | undefined = undefined;
    export let price : string;
    export let amount : string;
    export let index : number;
    export let saved : boolean;
    export let errors : ValidationErrors = {}
    export let handleRemoveItem : (index:number) => void;
    export let clearErrors : (e:{ currentTarget: EventTarget & HTMLInputElement} | Event) => void;
    export let setItemsInputValues : (e:{ currentTarget: EventTarget & HTMLInputElement} | Event,index:number) => void;

    const handleOnChange = (e:{ currentTarget: EventTarget & HTMLInputElement} | Event) => {
        setItemsInputValues(e,index)
        clearErrors(e)
    }
</script>

<div class={`bg-transparent shadow-xl my-10 text-stone-800 rounded-md p-4 relative ${saved ? "lg:hidden" : ""}`} in:slide={{delay: 500, duration: 400, easing: eases.linear }}>
    <CustomTooltip styles="absolute bg-red-300 text-primary-very-dark-blue -top-2 -right-1" tooltipMssg="Remove">
        <IconButton on:click={() => handleRemoveItem(index)} styles="bg-transparent text-primary-very-dark-blue text-2xl"><Icon icon="mdi:cancel-box" /></IconButton>
    </CustomTooltip>
    {#if !saved}
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
            inputStyles="text-stone-700 bg-stone-100 border border-stone-700 w-full rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
        />
    {/if}
    {#if !saved}
        <div class="flex justify-between">
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
                inputStyles="text-stone-700 bg-stone-100 border w-full border-stone-700 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
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
                inputStyles="text-stone-700 bg-stone-100 border w-full border-stone-700 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
            <InvoiceFormInput 
                name="amount" 
                value={amount}
                id={`invoiceItem-amount-${index}`}
                inputType="number" 
                placeholder="Item amount" 
                label="Amount $" 
                on:change={handleOnChange}
                containerStyles="w-[30%]"
                labelStyles=""
                inputStyles="text-stone-700 bg-stone-100 border w-full border-stone-700 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
        </div>

            
        {#if Object.values(errors)[0]?.message}
            <p role="alert" class="text-primary-accent-color3 text-sm mt-3 flex gap-2 items-center"><Icon class="text-xl" icon="ic:baseline-error" />{Object.values(errors)[0]?.message}</p>
        {/if}
    {/if}

    {#if saved}
        <div class="flex flex-wrap gap-4 justify-between md:grid grid-cols-4 lg:mt-0 md:place-content-between lg:hidden">
            <p class="text-emerald-700 font-medium w-2/5 md:w-full font-barlow">
                Description 
                <strong class="text-stone-800 block font-normal font-overpass">{description}</strong>
            </p>
            <p class="text-emerald-700 font-medium w-2/5 md:w-full font-barlow md:text-center">
                Quantity 
                <strong class="text-stone-800 block font-normal font-overpass">{quantity}</strong>
            </p>
            <p class="text-emerald-700 font-medium w-2/5 md:w-full font-barlow md:text-center">
                Price 
                <strong class="text-stone-800 block font-normal font-overpass">{price}</strong>
            </p>
            <p class="text-emerald-700 font-medium w-2/5 md:w-full font-barlow md:text-center">
                Amount 
                <strong class="text-stone-800 block font-normal font-overpass">{amount}</strong>
            </p>
        </div>
    {/if}
</div>