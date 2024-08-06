<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import CurrencyIcon from './CurrencyIcon.svelte';
    import type { CurrencyEnum } from '../../../enums';
    import type { InvoiceItems } from '../../../types/types';
    import IconButton from '../buttons/IconButton.svelte';
    import Icon from '@iconify/svelte';
  
    export let invoiceItemsArr: InvoiceItems[]
    export let currency: CurrencyEnum | undefined;
    export let handleRemoveItem : (indeX:number) => void;
 </script>

<Table divClass="hidden md:flex justify-center items-center mx-auto p-10" shadow>
  <TableHead class="border-b border-b-gray-200">
    <TableHeadCell class="p-0 text-stone-700 font-medium text-left text-base">Description</TableHeadCell>
    <TableHeadCell class="p-0 text-stone-700 font-medium text-left text-base">Quantity</TableHeadCell>
    <TableHeadCell class="p-0 text-stone-700 font-medium text-left text-base">Price</TableHeadCell>
    <TableHeadCell class="p-0 text-stone-700 font-medium text-right text-base">Amount</TableHeadCell>
  </TableHead>
      
  
  <TableBody tableBodyClass="divide-y">
    {#each invoiceItemsArr as invoiceItem, i (i)}
      {#if invoiceItem?.description && invoiceItem?.price && invoiceItem?.amount}
      <TableBodyRow class="relative">
        <TableBodyCell tdClass="py-5 relative text-base font-overpass overflow-hidden">
            <p class="text-left text-stone-700">{invoiceItem?.description}</p>
            </TableBodyCell>
            <TableBodyCell tdClass="py-4 text-base font-overpass">
            <p class="text-left text-stone-700">{invoiceItem?.quantity || ""}</p>
            </TableBodyCell>
            <TableBodyCell tdClass="py-4 text-base font-overpass">
            <p class="text-center text-stone-700 flex items-center">
                <CurrencyIcon styles="text-base font-normal inline opacity-80" {currency} />
                <span>{invoiceItem?.price}</span>
            </p>
            </TableBodyCell>
            <TableBodyCell tdClass="py-4 text-base font-overpass">
            <p class="text-stone-700 flex items-center justify-end">
                <CurrencyIcon styles="text-base font-normal opacity-80" {currency} />
                <span>{invoiceItem?.amount}</span>
            </p>

            <IconButton on:click={() => handleRemoveItem(i)} styles="absolute -right-12 w-fit bg-transparent p-0 text-primary-accent-color3 text-xl top-0 bottom-0 h-fit transition ease-in-out duration-200">
              <Icon aria-label="trash" icon="entypo:trash" />
            </IconButton>
          </TableBodyCell>
        </TableBodyRow>
      {/if}
    {/each}
  </TableBody>
</Table>  