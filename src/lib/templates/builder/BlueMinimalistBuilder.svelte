<script lang="ts">
    import Signature from "$lib/components/inputs/Signature.svelte";
    import CurrencyIcon from "$lib/components/invoice/CurrencyIcon.svelte";
    import { formatCurrency } from "$lib/helperFns/formatAmount";
    import type { IBasicInvoiceData } from "../../../types/types";

    export let invoiceData : IBasicInvoiceData;

</script>


<main id="builder" class="font-open-sans font-normal w-full max-w-[250mm] min-w-[250mm] min-h-screen relative z-10 text-[#475C7B] bg-[#E7EEF8] py-8">
    <div class="w-full">
        <div class="mt-10 flex justify-end flex-col text-right items-end px-16">
            {#if invoiceData.logo}
              <img src={invoiceData.logo} alt="logo" width={140} height={140} loading="eager" />
            {/if}
            {#if invoiceData.logoText}
              <h2 class="font-medium text-2xl">{invoiceData.logoText}</h2>
            {/if}
        </div>

        <div class="p-8 px-16">
            <h1 class="text-[5em] font-bold w-full basis-full relative">INVOICE</h1>
            <div class="bg-[#475C7B] w-full h-[5px] mt-2"></div>            
        </div>
        <div class="flex justify-between my-8 px-16">
            <div>
                <p class="text-lg">ACCUSTOMED TO:</p>
                <h2 class="font-semibold uppercase text-3xl mb-5">{invoiceData.billTo.name}</h2>
                <p class="mb-2">{invoiceData.billTo.contactInfo?.phoneNumber}</p>
                <p class="mb-2">{invoiceData.billTo.contactInfo?.emailAddress}</p>
                <p class="mb-2">{invoiceData.billTo.contactInfo?.address}</p>
            </div>
            <div class="text-right">
                <p class="text-lg flex justify-between gap-4">DATE: <span>{invoiceData.invoiceData.date?.toLocaleDateString()}</span></p>
            </div>
        </div>

        <div class="relative">
            <div class="px-16">
                <table class="min-w-full divide-y divide-gray-200 border-2 border-[#475C7B]">
                    <thead class="bg-[#475C7B] text-base-color1">
                        <tr>
                            <th class="px-6 py-3 text-center text-lg font-semibold uppercase border-t border-b">DESCRIPTION</th>
                            <th class="px-6 py-3 text-center text-lg font-semibold uppercase border-t border-b">QTY</th>
                            <th class="px-6 py-3 text-center text-lg font-semibold uppercase border-t border-b">PRICE</th>
                            <th class="px-6 py-3 text-center text-lg font-semibold uppercase border-t border-b">AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        {#if invoiceData.invoiceData.items.length}
                        {#each invoiceData.invoiceData.items as item, i (i)}              
                            <tr class="">
                                <td class="px-6 py-4 whitespace-nowrap text-center border-2 border-[#475C7B]">{item.description}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-center border-2 border-[#475C7B]">{item.quantity}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-center border-2 border-[#475C7B]">{item.price}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-center border-2 border-[#475C7B]">{item.amount}</td>
                            </tr>
                            {/each}
                        {/if}
                    </tbody>
                </table>    
            </div>
            <div class="mt-10 px-16 pb-40 flex justify-between">
                <div class="flex justify-between">
                    <div>
                        {#if invoiceData.tax}
                            <p class="flex uppercase font-bold text-xl gap-4">Tax %: <span>{invoiceData.tax}</span></p>
                        {/if}
                        {#if invoiceData.discount}
                            <p class="flex uppercase font-bold items-center text-xl gap-4">DISCOUNT: <span class="flex items-center">{formatCurrency(invoiceData.discount)}</span></p>
                        {/if}
                        {#if invoiceData.subTotal}
                            <p class="flex uppercase font-bold items-center text-xl gap-4">SUB TOTAL: <span class="flex items-center">{formatCurrency(invoiceData.subTotal)}</span></p>
                        {/if}
                        <p class="flex uppercase font-bold items-center text-xl gap-4">TOTAL: <span class="flex items-center">{formatCurrency(invoiceData.total || 0)}</span></p>
                    </div>
                </div>
                {#if invoiceData.signature?.length}
                <div class="flex translate-y-16 justify-end">
                    <div class="text-center relative">
                        <div class="before:w-full before:left-0 before:h-1 before:rounded-md before:bg-[#475C7B] before:absolute before:block before:bottom-10">
                            {#each invoiceData.signature as layer}
                                <Signature {layer} fill="#475C7B" />
                            {/each}
                        </div>
                        <p class="text-lg w-48 mx-auto font-medium uppercase">{invoiceData.issuer.name}</p>
                    </div>
                </div>
                {/if}
            </div>
            <div class="absolute bottom-0 left-0 opacity-90 w-full h-[33em] -z-10 bg-[#CADCF7] transform translate-y-20 -skew-y-[20deg] origin-bottom-right"></div>
        </div>
    </div>
</main>