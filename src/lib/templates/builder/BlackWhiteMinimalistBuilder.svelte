<script lang="ts">
    import Signature from "$lib/components/inputs/Signature.svelte";
    import CurrencyIcon from "$lib/components/invoice/CurrencyIcon.svelte";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import type { IBasicInvoiceData } from "../../../types/types";

    export let invoiceData : IBasicInvoiceData;

</script>


<main  id="builder" class="py-8 px-12 font-open-sans bg-[#fff] w-[210mm] min-h-5h-[300mm] font-normal min-h-screen relative z-10 text-[#3D3B3A]">
    <div>
        <div class="flex mt-8 mb-24 justify-center items-center flex-col">
            <img src={invoiceData.logo} alt="Company Logo" class="w-20 mb-4">
            <h1 class="text-4xl font-bold">{invoiceData.logoText}</h1>
        </div>

        <div class="flex justify-between items-start pb-1/2">
            <div class="mb-8">
                <h2 class="text-lg font-semibold mb-2">ISSUED TO :</h2>
                <p class="text-base">{invoiceData.billTo.name}</p>
                <p class="text-base">{invoiceData.billTo.contactInfo?.address}</p>
                <p class="text-base">{invoiceData.billTo.contactInfo?.emailAddress}</p>
                <p class="text-base">{invoiceData.billTo.contactInfo?.phoneNumber}</p>
            </div>
            <div class="grid grid-rows-[2em] grid-cols-1">
                <p class="text-lg font-semibold mb-4">INVOICE NO: <span class="ms-4 text-base font-normal">{invoiceData.invoiceData.invoiceNumber}</span></p>
                <p class="text-lg font-semibold">DATE: <span class="ms-4 text-base font-normal">{invoiceData.invoiceData.date?.toLocaleDateString()}</span></p>
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
            <div class="flex justify-between items-center px-6">
                <p class="font-semibold">SUBTOTAL</p>
                <p class="font-semibold flex flex-row-reverse items-center text-lg">
                    <span>{invoiceData.subTotal} </span>
                    <CurrencyIcon styles="text-lg" currency={invoiceData.currency} />
                </p>
            </div>
            <div class="flex justify-end text-lg items-center gap-24 text-right mt-10 mb-3 w-full px-3">
                <p>Tax</p>
                <span>
                    {invoiceData.tax}%
                </span>
            </div>
            <div class="flex justify-end text-lg items-center text-right gap-24 mb-3 w-full px-3">
                <p>Discount</p>
                <p class="relative z-10 font-semibold flex text-lg flex-row-reverse items-center">
                    <span>{invoiceData.discount}</span>
                    <CurrencyIcon styles="text-lg" currency={invoiceData.currency} />
                </p>
            </div>
            <div class="relative z-10  font-semibold bg-[#E3DCD4] flex justify-end h-10 p-2 pb-6 gap-[23%] items-center">
                <p class="relative z-10 font-semibold">TOTAL</p>
                <p class="relative z-10 font-semibold flex text-lg flex-row-reverse items-center">
                    <span>{invoiceData.subTotal} </span>
                    <CurrencyIcon styles="text-lg" currency={invoiceData.currency} />
                </p>
            </div>
        </div>

        <div class="flex justify-between mt-20 mb-10">
            <div class="">
                <h2 class="text-base font-semibold mb-2">BANK DETAILS</h2>
                <p class="text-lg">{invoiceData.accountDetails}</p>
            </div>
        
            <div>
                <p class="text-base font-semibold">THANK YOU</p>
                {#if invoiceData.signature && invoiceData.signature?.length}
                    <div class="before:w-full before:h-1 before:rounded-md before:bg-[#475C7B] before:absolute before:block before:bottom-10">
                        {#each invoiceData.signature as layer}
                            <Signature {layer} />
                        {/each}
                    </div>
                {/if}
                <p class="text-lg mt-4 font-medium uppercase font-playwrite">{invoiceData.issuer.name}</p>
            </div>
        </div>
    </div>
</main>