

<script lang="ts">
    import Signature from "$lib/components/inputs/Signature.svelte";
    import { formatCurrency } from "$lib/helperFns/formatAmount";
    import type { IBasicInvoiceData } from "../../../types/types";
  
    export let invoiceData: IBasicInvoiceData;
  </script>
  
  <main id="builder">
    <div>
        <div class="header">
            {#if invoiceData.logo}
                <img src={invoiceData.logo} alt="logo" width={140} height={140} loading="eager" />
            {/if}
            {#if invoiceData.logoText}
                <h2>{invoiceData.logoText}</h2>
            {/if}
        </div>
  
        <div class="invoice-title">
            <h1>INVOICE</h1>
            <div class="title-underline"></div>
        </div>
  
        <div class="invoice-info">
            <div>
                <p>ACCUSTOMED TO:</p>
                <h2>{invoiceData.billTo.name}</h2>
                <p>{invoiceData.billTo.contactInfo?.phoneNumber}</p>
                <p>{invoiceData.billTo.contactInfo?.emailAddress}</p>
                <p>{invoiceData.billTo.contactInfo?.address}</p>
            </div>
            <div class="date">
                <p>DATE: <span>{invoiceData.invoiceData.date?.toLocaleDateString()}</span></p>
            </div>
        </div>
  
        <div class="relative">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="description">DESCRIPTION</th>
                            <th>QTY</th>
                            <th>PRICE</th>
                            <th>AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#if invoiceData.invoiceData.items.length}
                            {#each invoiceData.invoiceData.items as item, i (i)}
                                <tr>
                                    <td class="description">{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.amount}</td>
                                </tr>
                            {/each}
                        {/if}
                    </tbody>
                </table>
            </div>
    
            <div class="totals">
                <div>
                    {#if invoiceData.tax}
                        <p>Tax %: <span>{invoiceData.tax}</span></p>
                    {/if}
                    {#if invoiceData.discount}
                        <p>DISCOUNT: <span>{formatCurrency(invoiceData.discount)}</span></p>
                    {/if}
                    {#if invoiceData.subTotal}
                        <p>SUB TOTAL: <span>{formatCurrency(invoiceData.subTotal)}</span></p>
                    {/if}
                    <p>TOTAL: <span>{formatCurrency(invoiceData.total || 0)}</span></p>
                </div>
                {#if invoiceData.signature?.length}
                    <div class="signature-container">
                        <div class="signature">
                            {#each invoiceData.signature as layer}
                                <Signature {layer} fill="#475C7B" />
                            {/each}
                        </div>
                        <p>{invoiceData.issuer.name}</p>
                    </div>
                {/if}
            </div>
            <div class="bg-shape"></div>
        </div>
    </div>
  </main>
  
  <style>
    /* General layout */
    #builder {
        font-family: 'Open Sans', sans-serif;
        font-weight: normal;
        width: 100%;
        max-width: 250mm;
        min-width: 250mm;
        min-height: 100vh;
        position: relative;
        z-index: 10;
        color: #475C7B;
        background-color: #E7EEF8;
        padding: 2rem 0;
    }
  
    .relative {
        position: relative;
    }
  
    .header {
        margin-top: 2.5rem;
        display: flex;
        justify-content: flex-end;
        align-items: end;
        flex-direction: column;
        text-align: right;
        padding-right: 4rem;
    }
  
    .header h2 {
        font-weight: 500;
        font-size: 1.5rem;
    }
  
    .invoice-title {
        padding: 2rem 4rem;
    }
  
    .invoice-title h1 {
        font-size: 5em;
        font-weight: bold;
        margin: 0;
    }
  
    .title-underline {
        background-color: #475C7B;
        height: 5px;
        width: 100%;
        margin-top: 0.5rem;
    }
  
    .invoice-info {
        display: flex;
        justify-content: space-between;
        margin: 2rem 4rem;
    }
  
    .invoice-info h2 {
        font-weight: 600;
        text-transform: uppercase;
        font-size: 2rem;
        margin-bottom: 1.25rem;
    }
  
    .invoice-info p:first-child{
        font-size: 1.1rem;
    }
  
    .date {
        text-align: right;
    }
  
    .date p {
        font-size: 1.2rem;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
    }
  
    /* Table styling */
    .table-container {
        padding: 0 4rem;
    }
  
    table {
        width: 100%;
        border-collapse: collapse;
        border: 2px solid #475C7B;
    }
  
    th {
        padding-inline: 1.5rem;
        padding-top: 0.75em;
        padding-bottom: 1.5em;
        text-align: center;
        font-size: 1.125rem;
        font-weight: 600;
        text-transform: uppercase;
        border-top: 1px solid #475C7B;
        border-bottom: 1px solid #475C7B;
        background-color: #475C7B;
        color: #E7EEF8;
    }
  
    td {
        padding: 1rem;
        text-align: center;
        border: 2px solid #475C7B;
        white-space: nowrap;
    }
  
    .description {
        text-align: left;
    }
  
    /* Totals section */
    .totals {
        margin-top: 2.5rem;
        padding: 0 4rem 10rem;
        display: flex;
        justify-content: space-between;
    }
  
    .totals p {
        font-size: 1.25rem;
        font-weight: bold;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 1rem;
    }
  
    .signature-container {
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        margin-top: 4rem;
        transform: translateY(4rem);
    }
  
    .signature {
        position: relative;
        text-align: center;
        width: 12rem;
        margin: 0 auto;
    }
  
    .signature::before {
        content: '';
        width: 100%;
        height: 1px;
        background-color: #475C7B;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 0.25rem;
    }
  
    .signature p {
        font-size: 1.125rem;
        text-transform: uppercase;
        margin-top: 1rem;
    }
  
    .signature-container p {
        text-align: center;
        width: 12rem;
        margin-top: 1rem;
        font-size: 1.125rem;
        font-weight: 500;
    }
  
    /* Background shape */
    .bg-shape {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 33em;
        background-color: #CADCF7;
        transform: translateY(5rem) skewY(-20deg);
        transform-origin: bottom right;
        opacity: 0.9;
        z-index: -10;
    }
</style>  