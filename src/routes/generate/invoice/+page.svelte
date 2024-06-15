<script lang="ts">
    import CustomButton from "$lib/components/buttons/CustomButton.svelte";
    import { Tabs } from "bits-ui";
    import { Pagination } from "bits-ui";
    import  Icon from "@iconify/svelte";
    import { goto } from "$app/navigation";

    export let invoicesData;


    $:count = invoicesData?.length || 10;

    let searchValue = "";
    let activeTab : "allInvoices" | "Downloaded" | "Draft"  = "allInvoices";
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
            <div class="flex justify-between items-center border-b border-b-slate-300">
                <p>Invoice</p>
                <p>Client</p>
                <p>Amount</p>
            </div>

            {#if false}
                {#each [] as item}
                    <p></p>
                {/each}
            {:else}
                <p class="font-rubik text-sm my-8 text-center">You do not have an invoice <button on:click={() => goto("/generate/invoice/new?template=BlackWhiteMinimalist")} class="inline text-primary-accent-color2">Add your first Invoice</button></p>
            {/if}
        </div>
    </div>

    <Pagination.Root {count} perPage={10} let:pages let:range>
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