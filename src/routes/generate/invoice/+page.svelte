<script lang="ts">
  import CustomButton from "$lib/components/buttons/CustomButton.svelte";
  import { Tabs } from "bits-ui";
  import { Pagination } from "bits-ui";
  import  Icon from "@iconify/svelte";
  import type { ISavedInvoice } from "../../../types/types";
  import InvoiceDetailsModal from "$lib/components/modals/InvoiceDetailsModal.svelte";
  import { alertStore } from "../../../store";
  import { AlertSeverity } from "../../../enums";

  export let data : { user_invoices: ISavedInvoice[] }

  let invoices = data.user_invoices;

  $:count = invoices?.length;

  let toShowInModal : ISavedInvoice | null = null;

  let searchValue = "";

  // Function to update the arrays based on the active tab
  $: downloadedInvoices = invoices.filter(invoice => !invoice.is_draft)
  $: draftInvoices = invoices.filter(invoice => invoice.is_draft)
    

  $: filteredInvoices = invoices?.filter(invoice => {
    if(searchValue.trim().length > 2 ){
      const invoiceNumberMatch = invoice.invoice_data.invoiceData.invoiceNumber.toLowerCase().includes(searchValue.toLowerCase())
      const clientNameMatch = invoice.invoice_data.billTo.name.toLowerCase().includes(searchValue.toLowerCase())
      return invoiceNumberMatch || clientNameMatch;
    }else{ 
      []
    }
  }) || []

  let activeTab : "allInvoices" | "Downloaded" | "Draft"  = "allInvoices";

  async function handleDeleteInvoice(id: string) {
    try {
      const response = await fetch("?/deleteInvoice", {
        method: 'POST',
        body: JSON.stringify({ invoiceId: id }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to delete invoice.')
      }

      alertStore.set({
        severity: AlertSeverity.SUCCESS,
        mssg: "Invoice Deleted Successfully"
      })

      toShowInModal = null;
      window.location.reload()

    } catch (error: any | unknown) {
      alertStore.set({
        severity: AlertSeverity.ERROR,
        mssg: error.message || "An Error occurred"
      })
    }
  }
</script>

<main class="page text-primary-very-dark-blue bg-gray-100 lg:py-20 md:px-8 xl:px-16">
    <h1 class="mt-16 relative pb-2 font-semibold text-4xl after:w-16 after:bottom-0 after:rounded-lg after:bg-primary-accent-color2 after:h-1 after:absolute after:left-0">Invoices</h1>

    <div class="mt-10 rounded-md p-4 bg-stone-300 flex flex-wrap gap-[5%] shadow-md md:max-w-[22em]">
      <label for="searchInput" class="text-sm basis-full text-primary-very-dark-blue mb-2">Search By Client's name or Invoice Number</label>
      <input
        type="text"
        bind:value={searchValue}
        placeholder="Search"
        id="searchInput"
        class="w-[60%] bg-gray-100 rounded-md px-4 border-stone-700 focus:outline focus:outline-2 focus:outline-gray-500"
      />
      <CustomButton styles="bg-gray-600 w-[35%] py-3">Search</CustomButton>
    </div>

    <div>
        <Tabs.Root value={activeTab || "invoice"} class="mx-auto mt-8 md:w-96 bg-stone-400 rounded-md text-primary-very-dark-blue">
          <Tabs.List class="grid grid-cols-3 justify-items-center gap-0">
            <Tabs.Trigger on:click={() => activeTab = "allInvoices"} class={`${activeTab === "allInvoices" ? "bg-base-color1" : "bg-transparent"} min-w-full rounded-tl-md rounded-bl-md border border-stone-400 py-3 text-center`} value="allInvoices">
                  All Invoices
            </Tabs.Trigger>
          <Tabs.Trigger on:click={() => activeTab = "Downloaded"} class={`${activeTab === "Downloaded" ? "bg-base-color1" : "bg-transparent"} min-w-full border-r border-r-stone-300 py-3 text-center`} value="Downloaded" >
                  Downloaded
            </Tabs.Trigger>
            <Tabs.Trigger on:click={() => activeTab = "Draft"} class={`${activeTab === "Draft" ? "bg-base-color1" : "bg-transparent"} min-w-full rounded-tr-md rounded-br-md py-3 text-center`} value="Draft">
                  Draft
            </Tabs.Trigger>
  
            <Tabs.Content value="receipt" class="mt-4 place-self-center col-span-2 w-36">
            </Tabs.Content>
          </Tabs.List>
        </Tabs.Root>


        <div class="bg-base-color1 shadow-md mt-10 pt-4 pb-10 px-4 lg:w-2/3 lg:mx-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-b-slate-300">
                <th class="text-left py-2">Invoice</th>
                <th class="text-left py-2">Client</th>
                <th class="text-left py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {#if filteredInvoices.length > 0}
                {#each filteredInvoices as item (item.id)}
                  <tr on:click={() => toShowInModal = item} class="border-b border-b-slate-200 cursor-pointer hover:bg-stone-100">
                    <td class="py-2 text-ellipsis">{item.invoice_data?.invoiceData?.invoiceNumber}</td>
                    <td class="py-2 text-ellipsis">{item.invoice_data?.billTo?.name}</td>
                    <td class="py-2 text-ellipsis">{item?.invoice_data?.total}</td>
                  </tr>
                {/each}
              {:else}
                {#if searchValue.trim().length > 2}
                  <tr>
                    <td colspan="3" class="font-rubik text-sm text-center w-full">
                      No Invoice Matches Your Search
                    </td>
                  </tr>
                {:else if activeTab === "allInvoices" && searchValue.trim().length < 2}
                  {#if invoices.length > 0}
                    {#each invoices as item (item.id)}
                      <tr on:click={() => toShowInModal = item} class="border-b border-b-slate-200 cursor-pointer hover:bg-stone-100">
                        <td class="py-2 text-ellipsis">{item.invoice_data?.invoiceData?.invoiceNumber}</td>
                        <td class="py-2 text-ellipsis">{item.invoice_data?.billTo?.name}</td>
                        <td class="py-2 text-ellipsis">{item?.invoice_data?.total}</td>
                      </tr>
                    {/each}
                  {:else}
                    <tr>
                      <td colspan="3" class="font-rubik text-sm my-8 text-center">
                        You do not have any invoices.
                        <a href="/generate/invoice/new?template=BlackWhiteMinimalist" class="inline text-primary-accent-color2">
                          Add your first Invoice
                        </a>
                      </td>
                    </tr>
                  {/if}
                {:else if activeTab === "Draft" && searchValue.trim().length < 2}
                  {#if draftInvoices.length > 0}
                    {#each draftInvoices as item (item.id)}
                      <tr on:click={() => toShowInModal = item} class="border-b border-b-slate-200 cursor-pointer hover:bg-stone-100">
                        <td class="py-2 text-ellipsis">{item.invoice_data?.invoiceData?.invoiceNumber}</td>
                        <td class="py-2 text-ellipsis">{item.invoice_data?.billTo?.name}</td>
                        <td class="py-2 text-ellipsis">{item?.invoice_data?.total}</td>
                      </tr>
                    {/each}
                  {:else}
                    <tr>
                      <td colspan="3" class="font-rubik text-sm my-8 text-center">
                        You do not have any draft invoices.
                      </td>
                    </tr>
                  {/if}
                {:else if activeTab === "Downloaded" && searchValue.trim().length < 2}
                  {#if downloadedInvoices.length > 0}
                    {#each downloadedInvoices as item (item.id)}
                      <tr on:click={() => toShowInModal = item} class="border-b border-b-slate-200 cursor-pointer hover:bg-stone-100">
                        <td class="py-2 text-ellipsis">{item.invoice_data?.invoiceData?.invoiceNumber}</td>
                        <td class="py-2 text-ellipsis">{item.invoice_data?.billTo?.name}</td>
                        <td class="py-2 text-ellipsis">{item?.invoice_data?.total}</td>
                      </tr>
                    {/each}
                  {:else}
                    <tr>
                      <td colspan="3" class="font-rubik text-sm my-8 text-center">
                        You do not have any downloaded invoices.
                      </td>
                    </tr>
                  {/if}
                {:else}
                  <tr>
                    <td colspan="3" class="font-rubik text-sm my-8 text-center">
                      You do not have any invoices.
                      <a href="/generate/invoice/new?template=BlackWhiteMinimalist" class="inline text-primary-accent-color2">
                        Add your first Invoice
                      </a>
                    </td>
                  </tr>
                {/if}
              {/if}
            </tbody>                        
          </table>
        </div>
    </div>



    <InvoiceDetailsModal handleDeleteInvoice={handleDeleteInvoice} invoiceDetails={toShowInModal ? [toShowInModal] : null} />

    <a href="/generate/invoice/new?template=BlackWhiteMinimalist" class="block my-8 text-center w-fit mx-auto bg-green-200 p-3 shadow-lg rounded border border-stone-300 text-primary-accent-color2">
      Add Invoice
    </a>

    <Pagination.Root {count} perPage={15} let:pages let:range>
        <div class="my-14 flex flex-col items-center justify-center mx-4 sm:mx-auto">
          <div class="flex items-center justify-between w-full sm:w-auto space-x-4">
            <Pagination.PrevButton
              class="inline-flex items-center justify-center rounded-[9px] bg-transparent hover:bg-dark-10 active:scale-98 disabled:cursor-not-allowed disabled:text-muted-foreground hover:disabled:bg-transparent"
            >
              <Icon icon="bitcoin-icons:caret-left-filled" />
            </Pagination.PrevButton>
            <div class="flex items-center gap-5">
              {#each pages as page (page.key)}
                {#if page.type === "ellipsis"}
                  <div class="text-[15px] font-medium text-foreground-alt">...</div>
                {:else}
                  <Pagination.Page
                    {page}
                    class="inline-flex items-center justify-center rounded-[9px] bg-transparent text-[15px] font-medium hover:bg-dark-10 active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:bg-transparent data-[selected]:bg-foreground data-[selected]:text-background"
                  >
                    {page.value}
                  </Pagination.Page>
                {/if}
              {/each}
            </div>
            <Pagination.NextButton
              class="inline-flex items-center justify-center rounded-[9px] bg-transparent hover:bg-dark-10 active:scale-98 disabled:cursor-not-allowed disabled:text-muted-foreground hover:disabled:bg-transparent"
            >
              <Icon icon="bitcoin-icons:caret-right-filled" />
            </Pagination.NextButton>
          </div>
          <p class="text-center text-[13px] mt-4 text-muted-foreground">
            Showing invoices {range.start} - {range.end}
          </p>
        </div>
    </Pagination.Root>
</main>