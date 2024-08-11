<script lang="ts">
  import Signature from "$lib/components/inputs/Signature.svelte";
    import CurrencyIcon from "$lib/components/invoice/CurrencyIcon.svelte";
    import { formatCurrency } from "$lib/helperFns/formatAmount";
  import type { IBasicInvoiceData } from "../../../types/types";
  import stripesBgImg from "../../statics-assets/grey-lines.png"

  export let invoiceData : IBasicInvoiceData;

  console.log(invoiceData)

</script>


<main id="builder" class="max-w-[250mm] min-w-[250mm] min-h-screen p-8 px-14 font-open-sans font-normal relative z-10 overflow-hidden">
  <img src={stripesBgImg} alt="" class="w-[20em] -rotate-180 top-80 opacity-15 absolute -left-32" />
  <div class="mt-5 flex justify-end flex-col text-right items-end">
    <div>
      {#if invoiceData.logo}
        <img src={invoiceData.logo} alt="logo" width={110} height={110} loading="eager" />
      {/if}
      {#if invoiceData.logoText}
      <h2 class="font-bold text-2xl">{invoiceData.logoText}</h2>
      {/if}
    </div>

    {#if invoiceData.issuer.contactInfo}
      <div class="flex flex-col mt-2 gap-1">
        {#each Object.values(invoiceData.issuer?.contactInfo) as info, i (i)}
          <p class="text-sm text-nowrap">{info}</p>
        {/each}
      </div>
    {/if}
  </div>

  <h1 class="font-medium uppercase text-7xl font-montserrat my-16">Invoice</h1>

  <div class="font-open-sans">
    <div class="flex justify-between">
      <p class="font-bold">Invoice No: <span class="ms-7 font-normal">{invoiceData.invoiceData.invoiceNumber}</span></p>
      <p class="font-bold">Date: <span class="ms-7 font-normal">{invoiceData.invoiceData.date?.toLocaleDateString()}</span></p>
    </div>

    <div class="flex gap-7 mt-4">
      <p class="font-bold">Bill to:</p>
      <div class="ms-10">
        <p class="font-medium text-lg">{invoiceData.billTo.name}</p>
        <p>{invoiceData.billTo.contactInfo?.address}</p>
        <p>{invoiceData.billTo.contactInfo?.emailAddress}</p>
        <p>{invoiceData.billTo.contactInfo?.phoneNumber}</p>
      </div>
    </div>
  </div>

  <div class="overflow-x-auto mt-16 border-b-2 border-b-gray-400 pb-4">
    <table class="min-w-full divide-y divide-gray-400">
        <thead>
            <tr>
                <th class="font-bold px-6 pt-3 pb-6 text-center capitalize tracking-wider border-y-2 border-y-gray-400">Item</th>
                <th class="font-bold px-6 pt-3 pb-6 text-center capitalize tracking-wider border-y-2 border-y-gray-400">Description</th>
                <th class="font-bold px-6 pt-3 pb-6 text-center capitalize tracking-wider border-y-2 border-y-gray-400">Quantity</th>
                <th class="font-bold px-6 pt-3 pb-6 text-center capitalize tracking-wider border-y-2 border-y-gray-400">Price</th>
                <th class="font-bold px-6 pt-3 pb-6 capitalize text-center tracking-wider border-y-2 border-y-gray-400">Amount</th>
            </tr>
        </thead>
        <tbody class="bg-white">
          {#if invoiceData.invoiceData.items.length}
            {#each invoiceData.invoiceData.items as item, i (i)}              
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-center">{i + 1}</td>
                <td class="px-6 py-4 text-center">{item.description}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center">{item.quantity}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center">{item.price}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center">{item.amount}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
    </table>
  </div>

  <div class="mt-8 grid grid-rows-3 place-content-end">
    <div class="grid grid-cols-2 gap-10">
      {#if invoiceData.tax}
        <h3 class="text-lg font-medium mt-2 flex items-center gap-2">Tax: <span>{invoiceData.tax}%</span></h3>
      {/if}
      {#if invoiceData.discount}
        <h3 class="text-lg font-medium mt-2 flex items-center gap-2">Discount: <span>{formatCurrency(invoiceData.discount)}</span></h3>
      {/if}
    </div>
    <div class="grid grid-cols-2 gap-10 items-center">
      {#if invoiceData.subTotal}
      <h3 class="text-lg font-medium flex items-center gap-2">Sub-Total: <span>{formatCurrency(invoiceData.subTotal)}</span></h3>
      {/if}
      <h2 class="text-2xl font-bold flex items-center gap-4">Total <span>{formatCurrency(invoiceData.total || 0)}</span></h2>
    </div>
  </div>

  {#if invoiceData.accountDetails}
  <div class="my-5 max-w-[45%]">
      <h3 class="text-lg font-semibold mt-4 flex gap-32 justify-between">Bank Details:</h3>
      <p>{@html invoiceData.accountDetails.replace(/\n/g, '<br/>')}</p>
    </div>
  {/if}



  {#if invoiceData.signature?.length}
    <div class="my-5 flex justify-end">
      <div class="text-center relative">
          <div class="">
            {#each invoiceData.signature as layer}
              <Signature {layer} />
            {/each}
          </div>
          <p class="border-t 0 w-48 mx-auto font-medium uppercase">{invoiceData.issuer.name}</p>
      </div>
    </div>
  {/if}

  {#if invoiceData.footerText}
  <div class="text-center flex justify-center border-t border-t-gray-400 py-8 mb-6 mt-10">
    <p>{invoiceData.footerText}</p>
  </div>
  {/if}

</main>