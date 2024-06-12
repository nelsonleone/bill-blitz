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

<div class="bg-stone-700 text-base-color1 rounded-md p-4 mb-5 relative" in:slide={{delay: 500, duration: 400, easing: eases.linear }} out:fade={{delay: 200, duration: 300 }}>
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
            inputStyles="text-stone-700 bg-stone-100 border border-gray-500 w-full rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
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
                inputStyles="text-stone-700 bg-stone-100 border w-full border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
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
                inputStyles="text-stone-700 bg-stone-100 border w-full border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
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
                inputStyles="text-stone-700 bg-stone-100 border w-full border-gray-500 rounded-md p-3 h-12 focus:outline focus:outline-2 focus:outline-emerald-700 focus:outline-offset-0 focus:border-none"
            />
        </div>
    {/if}

    {#if saved}
        <div class="flex flex-wrap justify-between md:grid grid-cols-4 place-content-between lg:hidden">
            <p class="text-emerald-300 w-2/5 md:w-full font-barlow text-lg">
                Description 
                <strong class="text-base-color1 block font-medium font-overpass">{description}</strong>
            </p>
            <p class="text-emerald-300 w-2/5 md:w-full font-barlow text-lg text-center">
                Quantity 
                <strong class="text-base-color1 block font-medium font-overpass">{quantity}</strong>
            </p>
            <p class="text-emerald-300 w-2/5 md:w-full font-barlow text-lg text-center">
                Price 
                <strong class="text-base-color1 block font-medium font-overpass">{price}</strong>
            </p>
            <p class="text-emerald-300 w-2/5 md:w-full font-barlow text-lg text-center">
                Amount 
                <strong class="text-base-color1 block font-medium font-overpass">{amount}</strong>
            </p>
        </div>
    {/if}


    {#if Object.values(errors)[0]?.message}
        <p role="alert" class="text-red-300 text-sm mt-3 flex gap-2 items-center"><Icon class="text-xl" icon="ic:baseline-error" />{Object.values(errors)[0]?.message}</p>
    {/if}
</div>