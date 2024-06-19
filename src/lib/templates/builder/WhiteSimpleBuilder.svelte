<script lang="ts">
    import Signature from "$lib/components/inputs/Signature.svelte";
    import { CurrencyEnum } from "../../../enums";
    import type { IBasicInvoiceData } from "../../../types/types";
    import stripesBgImg from "../design-asset/grey-lines.png"

  const demoData: IBasicInvoiceData = {
    logo: 'https://lh3.googleusercontent.com/a/ACg8ocLmzUgT2jZj9H28e4dJXIbK10QILGcYrvX26fGwgJNxZNao=s96-c',
    logoText: 'MyCompany',
    issuer: {
      name: 'John Doe',
      contactInfo: {
        address: '123 Main St, Anytown USA',
        phoneNumber: '555-1234',
        emailAddress: 'john@mycompany.com'
      }
    },
    billTo: {
      name: 'Jane Doe',
      contactInfo: {
        address: '456 Oak Rd, Someplace CA',
        phoneNumber: '555-5678',
        emailAddress: 'jane@client.com'
      }
    },
    invoiceData: {
      invoiceNumber: '1234',
      date: new Date('2023-05-15'),
      items: [
        {
          description: 'Product A',
          quantity: 2,
          price: 10.99,
          amount: 21.98,
          saved: false
        },
        {
          description: 'Service B',
          quantity: 1,
          price: 50.00,
          amount: 50.00,
          saved: true
        },
        {
          description: 'Discount C',
          quantity: 1,
          price: -5.00,
          amount: -5.00,
          saved: true
        }
      ]
    },
    accountDetails: 'Bank Account: 12345678',
    currency: CurrencyEnum.UnitedStates,
    signature: [],
    total: 66.98,
    subTotal: 71.98,
    discount: 5.00,
    footerText: 'Thank you for your business!',
    tax: 0,
    templateInUse: 'template-a',
    borderColor: 'red'
  }

</script>


<main class="p-8 font-open-sans font-normal w-full min-h-screen relative z-10" style="border: 2px solid {demoData.borderColor}">
  <div style="background-image: url({stripesBgImg})" class="opacity-20 -z-10 brightness-50 -left-52 top-44 bg-no-repeat bg-cover w-80 rotate-180 aspect-square absolute"></div>
  <div class="mt-10 flex justify-end flex-col text-right items-end gap-4">
    <img src={demoData.logo} alt="logo" width={100} height={100} loading="eager" />

    {#if demoData.issuer.name}
       <p class="font-semibold text-lg">{demoData.issuer.name}</p>
    {/if}

    {#if demoData.issuer.contactInfo}
      <div class="flex flex-col gap-1">
        {#each Object.values(demoData.issuer?.contactInfo) as info, i (i)}
          <p class="text-sm text-nowrap">{info}</p>
        {/each}
      </div>
    {/if}
  </div>

  <h1 class="font-medium uppercase text-5xl font-montserrat my-16">Invoice</h1>

  <div class="font-open-sans">
    <div class="flex justify-between">
      <p class="font-semibold">Invoice No: <span class="ms-7 font-normal">{demoData.invoiceData.invoiceNumber}</span></p>
      <p class="font-semibold">Date: <span class="ms-7 font-normal">{demoData.invoiceData.date.toLocaleDateString()}</span></p>
    </div>

    <div class="flex gap-7 mt-4">
      <p class="font-semibold">Bill to:</p>
      <div class="ms-10">
        <p class="font-medium text-lg">{demoData.billTo.name}</p>
        <p>{demoData.billTo.contactInfo?.address}</p>
        <p>{demoData.billTo.contactInfo?.emailAddress}</p>
        <p>{demoData.billTo.contactInfo?.phoneNumber}</p>
      </div>
    </div>
  </div>

  <div class="overflow-x-auto mt-16 border-b-2 border-b-gray-400 pb-4">
    <table class="min-w-full divide-y divide-gray-400">
        <thead>
            <tr>
                <th class="font-semibold px-6 py-3 text-center capitalize tracking-wider border-y-2 border-y-gray-400">Item</th>
                <th class="font-semibold px-6 py-3 text-center capitalize tracking-wider border-y-2 border-y-gray-400">Description</th>
                <th class="font-semibold px-6 py-3 text-center capitalize tracking-wider border-y-2 border-y-gray-400">Quantity</th>
                <th class="font-semibold px-6 py-3 text-center capitalize tracking-wider border-y-2 border-y-gray-400">Price</th>
                <th class="font-semibold px-6 py-3 capitalize text-center tracking-wider border-y-2 border-y-gray-400">Amount</th>
            </tr>
        </thead>
        <tbody class="bg-white">
          {#if demoData.invoiceData.items.length}
            {#each demoData.invoiceData.items as item, i (i)}              
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-center">{i + 1}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center">{item.description}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center">{item.quantity}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center">{item.price}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center">{item.amount}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
    </table>
  </div>

  <div class="mt-10 grid grid-rows-3 place-content-end">
    {#if demoData.tax}
      <h3 class="text-xl font-semibold mt-4 flex gap-32 justify-between">Tax <span>{demoData.tax}</span></h3>
    {/if}
    {#if demoData.subTotal}
     <h3 class="text-xl font-semibold mt-4 flex gap-32 justify-between">Sub-Total <span>{demoData.subTotal}</span></h3>
    {/if}
    <h2 class="text-2xl font-bold mt-4 flex gap-32 justify-between">Total <span>{demoData.total}</span></h2>
  </div>

  {#if demoData.accountDetails}
    <div>
      <h3 class="text-lg font-semibold mt-4 flex gap-32 justify-between">Bank Details:</h3>
      <p class="">{demoData.accountDetails}</p>
    </div>
  {/if}


  {#if demoData.footerText}
  <div class="text-center flex justify-center border-t border-t-gray-400 pt-10 my-16">
    <p>{demoData.footerText}</p>
  </div>
  {/if}
</main>