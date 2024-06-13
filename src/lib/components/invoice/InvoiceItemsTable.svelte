<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import CurrencyIcon from './CurrencyIcon.svelte';
    import type { CurrencyEnum } from '../../../enums';
    import type { InvoiceItems } from '../../../types/types';
  
    export let invoiceItemsArr: InvoiceItems[]
    export let currency: CurrencyEnum;
 </script>
  
<Table shadow divClass="font-overpass text-base p-16">
    <TableHead theadClass="font-overpass text-lg border-b py-4 text-stone-700">
      <TableHeadCell class="p-0 text-stone-700 font-medium">Description</TableHeadCell>
      <TableHeadCell class="p-0 text-stone-700 font-medium">Quantity</TableHeadCell>
      <TableHeadCell class="p-0 text-stone-700 font-medium">Price</TableHeadCell>
      <TableHeadCell class="p-0 text-stone-700 font-medium">Amount</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y p-16">
      {#each invoiceItemsArr as invoiceItem, i (i)}
        <TableBodyRow>
          <TableBodyCell tdClass="py-4 text-base font-overpass text-stone-700">{invoiceItem?.description}</TableBodyCell>
          <TableBodyCell tdClass="py-4 text-base font-overpass text-stone-700">{invoiceItem?.quantity || ""}</TableBodyCell>
          <TableBodyCell tdClass="py-4 text-base font-overpass text-stone-700">
            <p class="flex items-center"><CurrencyIcon styles="text-base font-normal inline opacity-80" {currency} /> {invoiceItem?.price}</p>
          </TableBodyCell>
          <TableBodyCell tdClass="py-4 text-base font-overpass text-stone-700">
            <p class="flex items-center"><CurrencyIcon styles="text-base font-normal inline opacity-80" {currency} />{invoiceItem?.amount}</p>
           </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
</Table>
  