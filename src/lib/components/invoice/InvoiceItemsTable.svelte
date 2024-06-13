<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import CurrencyIcon from './CurrencyIcon.svelte';
    import type { CurrencyEnum } from '../../../enums';
    import type { InvoiceItems } from '../../../types/types';
  
    export let invoiceItemsArr: InvoiceItems[]
    export let currency: CurrencyEnum;
 </script>
  
<Table shadow divClass="font-overpass text-base p-16 hidden lg:block">
  <TableHead theadClass="font-overpass text-lg border-b py-4 text-stone-700">
    <TableHeadCell class="p-0 text-stone-700 font-medium">Description</TableHeadCell>
    <TableHeadCell class="p-0 text-stone-700 font-medium">Quantity</TableHeadCell>
    <TableHeadCell class="p-0 text-stone-700 font-medium">Price</TableHeadCell>
    <TableHeadCell class="p-0 text-stone-700 font-medium">Amount</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y p-16">
    {#each invoiceItemsArr as invoiceItem, i (i)}
      {#if invoiceItem?.description && invoiceItem?.price && invoiceItem?.amount}
      <TableBodyRow>
          <TableBodyCell tdClass="py-4 text-base font-overpass">
              <p class="text-stone-700">{invoiceItem?.description}</p>
              </TableBodyCell>
              <TableBodyCell tdClass="py-4 text-base font-overpass">
              <p class="text-stone-700">{invoiceItem?.quantity || ""}</p>
              </TableBodyCell>
              <TableBodyCell tdClass="py-4 text-base font-overpass">
              <p class="text-stone-700 flex items-center">
                  <CurrencyIcon styles="text-base font-normal inline opacity-80" {currency} />
                  <span>{invoiceItem?.price}</span>
              </p>
              </TableBodyCell>
              <TableBodyCell tdClass="py-4 text-base font-overpass">
              <p class="text-stone-700 flex items-start">
                  <CurrencyIcon styles="text-base font-normal opacity-80" {currency} />
                  <span>{invoiceItem?.amount}</span>
              </p>
              </TableBodyCell>
        </TableBodyRow>
      {/if}
    {/each}
  </TableBody>
</Table>
  