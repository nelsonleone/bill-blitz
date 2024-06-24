<script lang="ts">
    import Signature from "$lib/components/inputs/Signature.svelte";
    import type { IBasicInvoiceData } from "../../../types/types";
    import waveBgImg from "../design-asset/wave.png"

    export let invoiceData : IBasicInvoiceData;

</script>


<main class="p-8 font-open-sans bg-gray-100 font-normal w-full min-h-screen relative z-10 text-[#3D3B3A]">
    <div>
        <div class="flex mt-12 mb-28 justify-center items-center flex-col">
            <img src={invoiceData.logo} alt="Company Logo" class="w-20 mb-4">
            <h1 class="text-2xl font-bold">{invoiceData.logoText}</h1>
        </div>

        <div class="flex justify-between">
            <div class="mb-8">
                <h2 class="text-sm font-semibold mb-2">ISSUED TO :</h2>
                <p>Jonathan Patterson</p>
                <p>Liceria & Co.</p>
                <p>123 Anywhere St., Any City</p>
            </div>
            <div class="text-right">
                <p class="text-sm font-semibold mb-4">INVOICE NO: <span class="ms-4 font-normal">01234</span></p>
                <p class="text-sm font-semibold">DATE: <span class="ms-4 font-normal">11.02.2030</span></p>
            </div>
        </div>
    
        <table class="w-full my-12">
            <thead class="border-b-2 bg-[#E3DCD4]">
                <tr class="">
                    <th class="text-left py-2 px-4">DESCRIPTION</th>
                    <th class="text-left py-2 px-4">UNIT PRICE</th>
                    <th class="text-left py-2 px-4">QTY</th>
                    <th class="text-left py-2 px-4">AMOUNT</th>
                </tr>
            </thead>
            <tbody>
                {#if invoiceData.invoiceData.items?.length > 0}
                    {#each invoiceData.invoiceData.items as item, i (i)}
                        <tr class="border-b">
                            <td class="py-2 px-4">{item.description}</td>
                            <td class="py-2 px-4">{item.price}</td>
                            <td class="py-2 px-4">{item.quantity}</td>
                            <td class="py-2 px-4 text-left">{item.amount}</td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    
        <div class="mb-8">
            <div class="flex justify-between items-center">
                <p class="font-bold">SUBTOTAL</p>
                <p class="font-bold">$500</p>
            </div>
            <div class="flex justify-end items-center gap-8 mt-8 mb-3">
                <p class="">Tax 10%</p>
                <p class="">$50</p>
            </div>
            <div class="flex justify-end  bg-[#E3DCD4] items-center font-bold my-4 gap-8 h-10 p-3">
                <p class="">TOTAL</p>
                <p>$550</p>
            </div>
        </div>

        <div class="flex justify-between mt-20 mb-7">
            <div class="">
                <h2 class="text-sm font-semibold mb-2">BANK DETAILS</h2>
                <p class="">Borcele Bank</p>
                <p class="">Account Name: Avery Davis</p>
                <p class="">Account No.: 0123 4567 8901</p>
            </div>
        
            <div class="text-sm font-semibold mb-2">
                <p class="text-sm ">THANK YOU</p>
                {#if invoiceData.signature && invoiceData.signature?.length}
                    <div class="before:w-full before:h-1 before:rounded-md before:bg-[#475C7B] before:absolute before:block before:bottom-10">
                        {#each invoiceData.signature as layer}
                            <Signature {layer} />
                        {/each}
                    </div>
                {/if}
                <p class="border-t 0 mt-9 font-medium uppercase">{invoiceData.issuer.name}</p>
            </div>
        </div>
    </div>
</main>