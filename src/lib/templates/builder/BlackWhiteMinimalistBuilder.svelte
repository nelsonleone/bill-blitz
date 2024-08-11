<script lang="ts">
    import Signature from "$lib/components/inputs/Signature.svelte";
    import CurrencyIcon from "$lib/components/invoice/CurrencyIcon.svelte";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import type { IBasicInvoiceData } from "../../../types/types";
    import { formatCurrency } from "$lib/helperFns/formatAmount";

    export let invoiceData : IBasicInvoiceData;

</script>


<main id="builder" class="py-8 px-20 font-open-sans bg-[#fff] max-w-[250mm] min-w-[250mm] min-h-screen font-normal relative z-10 text-[#3D3B3A]">
    <div>
        <div class="flex mt-8 mb-24 justify-center items-center flex-col">
            <img src={invoiceData.logo} alt="Company Logo" class="w-40 mb-4">
            <h1 class="text-4xl font-bold">{invoiceData.logoText}</h1>
        </div>

        <div class="flex justify-between items-start pb-1/2">
            <div class="mb-8">
                <h2 class="text-base font-semibold mb-2">ISSUED TO :</h2>
                <p class="text-base">{invoiceData.billTo.name}</p>
                <p class="text-base">{invoiceData.billTo.contactInfo?.address}</p>
                <p class="text-base">{invoiceData.billTo.contactInfo?.emailAddress}</p>
                <p class="text-base">{invoiceData.billTo.contactInfo?.phoneNumber}</p>
            </div>
            <div class="grid grid-rows-[2em] grid-cols-1">
                <p class="text-base font-semibold mb-4">INVOICE NO: <span class="ms-4 text-base font-normal">{invoiceData.invoiceData.invoiceNumber}</span></p>
                <p class="text-base font-semibold">DATE: <span class="ms-4 text-base font-normal">{invoiceData.invoiceData.date?.toLocaleDateString()}</span></p>
            </div>
        </div>
        <Table divClass="mt-20 relative text-[#3D3B3A]">
            <TableHead class="h-10 p-2 text-[#3D3B3A] font-semibold">
                <TableHeadCell class="text-left py-2 px-8 text-sm h-8 pb-5 bg-[#E3DCD4]">DESCRIPTION</TableHeadCell>
                <TableHeadCell class="text-center py-2 px-8 text-sm h-8 pb-5 bg-[#E3DCD4]">UNIT PRICE</TableHeadCell>
                <TableHeadCell class="text-center py-2 px-8 text-sm h-8 pb-5 bg-[#E3DCD4]">QTY</TableHeadCell>
                <TableHeadCell class="text-right py-2 px-8 text-sm h-8 pb-5 bg-[#E3DCD4]">AMOUNT</TableHeadCell>
            </TableHead>
                
            <TableBody tableBodyClass="divide-y">
                {#if invoiceData.invoiceData.items?.length > 0}
                    {#each invoiceData.invoiceData.items as item, i (i)}
                     <TableBodyRow class="border-none bg-transparent lowercase text-[#3D3B3A]">
                        <TableBodyCell class="py-2 px-8 text-lg">{item.description}</TableBodyCell>
                        <TableBodyCell class="py-2 px-8 text-lg text-center">{item.price}</TableBodyCell>
                        <TableBodyCell class="py-2 px-8 text-lg text-center">{item.quantity}</TableBodyCell>
                        <TableBodyCell class="py-2 px-8 text-lg text-left flex justify-end items-center">
                            <CurrencyIcon styles="text-lg" currency={invoiceData.currency} />
                           <span> {item.amount}</span>
                        </TableBodyCell>
                     </TableBodyRow>
                    {/each}
                {/if}
            </TableBody>
        </Table>  
    
        <div class="my-6">
            {#if invoiceData.subTotal}
                <div class="flex justify-between items-center px-6">
                    <p class="font-semibold">SUBTOTAL</p>
                    <p class="font-semibold text-lg">
                        {formatCurrency(invoiceData.subTotal)}
                    </p>
                </div>
            {/if}

            <div class="flex flex-col items-end">
                {#if invoiceData.tax}
                <div class="flex gap-20 text-lg items-center text-right mt-10 mb-3 px-3">
                    <p>Tax</p>
                    <span>
                        {invoiceData.tax}%
                    </span>
                </div>
            {/if}
            {#if invoiceData.discount}
                <div class="flex gap-20 text-lg items-center text-right mb-3 px-3">
                    <p>Discount</p>
                    <p class="relative z-10 font-semibold text-lg">
                        {formatCurrency(invoiceData.discount)}
                    </p>
                </div>
            {/if}
            </div>

            <div class="relative z-10 font-semibold bg-[#E3DCD4] flex justify-end h-10 p-2 pb-6 gap-16 items-center">
                <p class="relative z-10 font-semibold text-lg">TOTAL</p>
                <p class="relative z-10 font-semibold text-lg">
                    {formatCurrency(invoiceData.total || 0)}
                </p>
            </div>
        </div>

        <div class="flex {invoiceData.accountDetails ? "justify-between" : "justify-end"} mt-20 mb-10">
            {#if invoiceData.accountDetails}
                <div class="">
                    <h2 class="text-base font-semibold mb-2">BANK DETAILS</h2>
                    <p class="text-lg">{@html invoiceData.accountDetails.replace(/\n/g, '<br/>')}</p>
                </div>
            {/if}
        
            <div class="">
                <p class="text-base font-semibold">THANK YOU</p>
                {#if invoiceData.signature && invoiceData.signature?.length}
                    <div class="relative overflow-hidden">
                        {#each invoiceData.signature as layer}
                            <Signature {layer} />
                        {/each}
                    </div>
                {/if}
                <p class="text-lg pt-4 border-t font-medium uppercase font-playwrite">{invoiceData.issuer.name}</p>
            </div>
        </div>
    </div>
</main>