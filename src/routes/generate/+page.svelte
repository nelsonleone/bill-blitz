<script lang="ts">
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import Icon from "@iconify/svelte";


    import { Tabs } from "bits-ui";

    let activeTab : "invoice" | "receipt";

</script>
<main class="page px-0 md:px-0 text-primary-very-dark-blue lg:pt-20">
    <div class="relative z-10 bg-[url('/images/pexels-evie-shaffer-1259279-2748756.jpg')] h-[85vh] bg-cover bg-center py-28 px-4 md:px-8 xl:px-16 lg:flex items-center">
        <div class="absolute -z-10 top-0 bottom-0 left-0 right-0 m-auto w-full h-full bg-green-200 opacity-20"></div>
        <div class="relative z-10 md:w-96 lg:w-2/5 mt-10 lg:mt-0">
            <h1 class="text-3xl lg:text-5xl">Online Invoice And <span class="text-primary-accent-color2">Receipt Generator</span></h1>
            <p class="my-4 leading-6 lg:text-lg">Invoicing solution that empowers entrepreneurs and professionals to streamline their financial operations.</p>
        </div>
    </div>

    <div class="px-4 md:px-8 xl:px-16">
        <Tabs.Root value={activeTab || "invoice"} class="mx-auto w-full mt-16 md:w-80 bg-slate-900 rounded-2xl text-base-color1 p-4 pb-10">
            <Tabs.List class="grid grid-cols-2 gap-2 rounded-md">
              <Tabs.Trigger on:click={() => activeTab = "invoice"} value="invoice" class={`hover:bg-base-color1 hover:text-primary-very-dark-blue p-3 rounded-md transition ease-linear duration-200 ${activeTab === "invoice" ? "bg-base-color1 text-primary-very-dark-blue" : "bg-slate-700"}`}>
                    Invoice
              </Tabs.Trigger>
              <Tabs.Trigger on:click={() => activeTab = "receipt"} value="receipt" class={`hover:bg-base-color1 hover:text-primary-very-dark-blue p-3 rounded-md transition ease-linear duration-200 ${activeTab === "receipt" ? "bg-base-color1 text-primary-very-dark-blue" : "bg-slate-700"}`}>
                    Receipt
              </Tabs.Trigger>
    
              <Tabs.Content value="invoice" class="mt-4 place-self-center col-span-2 w-36">
                  <img src="/icons/invoice.png" loading="eager" alt="invoice" />
                  <CustomButton styles="group flex items-center justify-center bg-primary-accent-color2 py-3 mt-3 hover:opacity-90" href="/generate/invoice">
                    <span>Invoice</span>
                    <Icon aria-hidden="true" class="text-2xl group-hover:" icon="iconamoon:arrow-top-right-1-thin" />
                  </CustomButton>
              </Tabs.Content>
              <Tabs.Content value="receipt" class="mt-4 place-self-center col-span-2 w-36">
                  <img src="/icons/receipt.png" loading="eager" alt="receipt" />
                  <CustomButton styles="group flex items-center justify-center bg-primary-accent-color2 py-3 mt-3 hover:opacity-90" href="/generate/receipt">
                    <span>Receipt</span>
                    <Icon aria-hidden="true" class="text-2xl" icon="iconamoon:arrow-top-right-1-thin" />
                  </CustomButton>
              </Tabs.Content>
            </Tabs.List>
        </Tabs.Root>
    
        <div class="mt-20 lg:mt-40 flex flex-col lg:max-w-full md:mx-auto md:h-80 md:justify-between md:py-0 md:items-center md:flex-row bg-green-300 rounded-tr-md rounded-tl-[5em]">
            <div class="px-4 py-16 mx-auto md:w-2/5">
                <h3 class="my-4 font-semibold text-2xl">Effortless Invoicing In <span class="text-primary-accent-color2"> All Devices</span></h3>
                <p>The Bill Blitz web app is available and accessible in mobile phones, tablet and desktop devices.</p>
            </div>
            <div class="md:w-2/5 h-full">
                <img src="/images/all-devices.jpg" class="h-full w-full" alt="phone,tablet,laptop" />
            </div>
        </div>

        <div class="mt-40 flex flex-col md:flex-row md:justify-center md:h-80 shadow-2xl  bg-green-300 px-4 pb-8 rounded-lg md:mt-64 md:pb-16 md:pt-0 lg:mb-24">
            <div class="">
                <img src="/images/illustration-phone.png" class="relative -top-28" alt="phones" />
            </div>
            <div class="mb-8 md:w-1/2 -mt-28 md:-mt-0 md:self-center lg:w-2/5">
                <h3 class="my-4 font-semibold text-2xl"><span class="text-primary-accent-color2">Deliver quick</span> receipts and receive payments</h3>
                <p>Bill Blitz web app saves you time to deliver receipts to client, bulding your intergrity.</p>
            </div>
        </div>
    </div>
</main>