<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import CurrencyIcon from './CurrencyIcon.svelte';
    import type { CurrencyEnum } from '../../../enums';
    import type { InvoiceItems } from '../../../types/types';
  
    export let invoiceItemsArr: InvoiceItems[]
    export let currency: CurrencyEnum;
 </script>
  
<Table>
    <TableHead>
      <TableHeadCell>Description</TableHeadCell>
      <TableHeadCell>Quantity</TableHeadCell>
      <TableHeadCell>Price</TableHeadCell>
      <TableHeadCell>Amount</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each invoiceItemsArr as invoiceItem, i (i)}
        <TableBodyRow>
          <TableBodyCell>{invoiceItem?.description}</TableBodyCell>
          <TableBodyCell>{invoiceItem?.quantity || ""}</TableBodyCell>
          <TableBodyCell><CurrencyIcon {currency} /> {invoiceItem?.price}</TableBodyCell>
          <TableBodyCell><CurrencyIcon {currency} />{invoiceItem?.amount}</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
</Table>
  