<script lang="ts">
    import Signature from "$lib/components/inputs/Signature.svelte";
    import type { IBasicInvoiceData } from "../../../types/types";
    import waveBgImg from "../design-asset/wave.png"

    export let invoiceData : IBasicInvoiceData;

</script>


<main class="p-8 font-open-sans font-normal w-full min-h-screen relative z-10 text-[#475C7B] bg-[#E7EEF8]">
    <div class="w-full overflow-hidden">
        <img src={waveBgImg} alt="" class="w-full bottom-0 h-[60em] opacity-15 absolute left-0" />
        <div class="mt-10 flex justify-end flex-col text-right items-end">
            {#if invoiceData.logo}
              <img src={invoiceData.logo} alt="logo" width={100} height={100} loading="eager" />
            {/if}
            {#if invoiceData.logoText}
              <h2 class="font-medium text-2xl">{invoiceData.logoText}</h2>
            {/if}
        </div>

        <h1 class="text-[3.44em] font-bold w-full basis-full relative pb-1 after:bg-[#475C7B] after:w-full after:h-[5px] after:absolute after:bottom-0 after:block">INVOICE</h1>
        <div class="flex justify-between my-8">
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

        <div class="mt-10">
            <div class="flex justify-between">
                <div>
                    <p class="flex uppercase font-semibold text-xl gap-4">Tax %: <span>{invoiceData.tax}</span></p>
                    <p class="flex uppercase font-semibold text-xl gap-4">SUB TOTAL: <span>{invoiceData.subTotal}</span></p>
                    <p class="flex uppercase font-semibold text-xl gap-4">TOTAL: <span>{invoiceData.total}</span></p>
                </div>
            </div>
            {#if invoiceData.signature?.length}
              <div class="my-10 flex justify-end">
                <div class="text-center relative">
                    <div class="before:w-full before:h-1 before:rounded-md before:bg-[#475C7B] before:absolute before:block before:bottom-10">
                        {#each invoiceData.signature as layer}
                            <Signature {layer} />
                        {/each}
                    </div>
                    <p class="border-t 0 w-48 mx-auto font-medium uppercase">{invoiceData.issuer.name}</p>
                </div>
              </div>
            {/if}
        </div>
    </div>
</main>