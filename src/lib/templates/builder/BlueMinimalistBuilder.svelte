<script lang="ts">
    import Signature from "$lib/components/inputs/Signature.svelte";
    import { CurrencyEnum } from "../../../enums";
    import type { IBasicInvoiceData } from "../../../types/types";
    import waveBgImg from "../design-asset/wave.png"

  const demoData: IBasicInvoiceData = {
    logo: 'https://via.placeholder.com/150',
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
  }

</script>


<main class="p-8 font-open-sans font-normal w-full min-h-screen relative z-10 text-[#475C7B] bg-[#E7EEF8]">
    <div class="w-full">
        <div style="background-image: url({waveBgImg})" class=" brightness-50 left-0 bottom-44 bg-no-repeat bg-cover w-full h-80 absolute"></div>
        <div class="mt-10 flex justify-end flex-col text-right items-end">
            {#if demoData.logo}
              <img src={demoData.logo} alt="logo" width={100} height={100} loading="eager" />
            {/if}
            {#if demoData.logoText}
              <h2 class="font-medium text-2xl">{demoData.logoText}</h2>
            {/if}
        </div>

        <h1 class="text-[3.44em] font-bold w-full basis-full relative pb-1 after:bg-[#475C7B] after:w-full after:h-[5px] after:absolute after:bottom-0 after:block">INVOICE</h1>
        <div class="flex justify-between my-8">
            <div>
                <p class="text-lg">ACCUSTOMED TO:</p>
                <h2 class="font-semibold uppercase text-3xl mb-5">{demoData.billTo.name}</h2>
                <p class="mb-2">{demoData.billTo.contactInfo?.phoneNumber}</p>
                <p class="mb-2">{demoData.billTo.contactInfo?.emailAddress}</p>
                <p class="mb-2">{demoData.billTo.contactInfo?.address}</p>
            </div>
            <div class="text-right">
                <p class="text-lg flex justify-between gap-4">DATE: <span>{demoData.invoiceData.date?.toLocaleDateString()}</span></p>
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
                {#if demoData.invoiceData.items.length}
                    {#each demoData.invoiceData.items as item, i (i)}              
                    <tr class="">
                        <td class="px-6 py-4 whitespace-nowrap text-center border-x-2 border-x-[#475C7B]">{item.description}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-center border-x-2 border-x-[#475C7B]">{item.quantity}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-center border-x-2 border-x-[#475C7B]">{item.price}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-center border-x-2 border-x-[#475C7B]">{item.amount}</td>
                    </tr>
                    {/each}
                {/if}
            </tbody>
        </table>

        <div class="mt-10">
            <div class="flex justify-between">
                <div>
                    <p class="flex uppercase font-semibold text-xl gap-4">Tax %: <span>{demoData.tax}</span></p>
                    <p class="flex uppercase font-semibold text-xl gap-4">SUB TOTAL: <span>{demoData.subTotal}</span></p>
                    <p class="flex uppercase font-semibold text-xl gap-4">TOTAL: <span>{demoData.total}</span></p>
                </div>
            </div>
            <div class="mt-6 flex justify-end">
                <div class="text-center relative">
                    <div class="before:w-full before:h-1 before:rounded-md before:bg-[#475C7B] before:absolute before:block before:bottom-10">
                        <Signature layer={demoData.signature} />
                    </div>
                    <p class="border-t 0 w-48 mx-auto">{demoData.issuer.name}</p>
                </div>
            </div>
        </div>
    </div>
</main>