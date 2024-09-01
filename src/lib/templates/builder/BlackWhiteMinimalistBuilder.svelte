<script lang="ts">
    import Signature from "$lib/components/inputs/Signature.svelte";
    import CurrencyIcon from "$lib/components/invoice/CurrencyIcon.svelte";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import type { IBasicInvoiceData } from "../../../types/types";
    import { formatCurrency } from "$lib/helperFns/formatAmount";

    export let invoiceData: IBasicInvoiceData;
</script>

<main id="builder">
    <div>
        <div class="header">
            {#if invoiceData.logo}
                <img src={invoiceData.logo} alt="Company Logo" class="logo">
            {/if}
            {#if invoiceData.logoText}
               <h1 class="logo-text">{invoiceData.logoText}</h1>
            {/if}
        </div>

        <div class="info">
            <div class="recipient-info">
                <h2>ISSUED TO :</h2>
                <p>{invoiceData.billTo.name}</p>
                <p>{invoiceData.billTo.contactInfo?.address}</p>
                <p>{invoiceData.billTo.contactInfo?.emailAddress}</p>
                <p>{invoiceData.billTo.contactInfo?.phoneNumber}</p>
            </div>
            <div class="invoice-details">
                <p>INVOICE NO: <span>{invoiceData.invoiceData.invoiceNumber}</span></p>
                <p>DATE: <span>{invoiceData.invoiceData.date?.toLocaleDateString()}</span></p>
            </div>
        </div>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr class="table-head">
                        <th class="table-head-cell description">DESCRIPTION</th>
                        <th class="table-head-cell unit-price">UNIT PRICE</th>
                        <th class="table-head-cell qty">QTY</th>
                        <th class="table-head-cell amount">AMOUNT</th>
                    </tr>
                </thead>
                <tbody class="table-body">
                    {#if invoiceData.invoiceData.items?.length > 0}
                        {#each invoiceData.invoiceData.items as item, i (i)}
                        <tr class="table-body-row">
                            <td class="table-body-cell description">{item.description}</td>
                            <td class="table-body-cell unit-price">{formatCurrency(item.price || 0)}</td>
                            <td class="table-body-cell qty">{item.quantity}</td>
                            <td class="table-body-cell amount">
                                <span>{formatCurrency(item.amount || 0)}</span>
                            </td>
                        </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div> 
    
        <div class="summary">
            {#if invoiceData.subTotal}
                <div class="subtotal">
                    <p>SUBTOTAL</p>
                    <p class="subtotal-amount">
                        {formatCurrency(invoiceData.subTotal)}
                    </p>
                </div>
            {/if}

            <div class="additional-details">
                {#if invoiceData.tax}
                <div class="tax">
                    <p>Tax</p>
                    <span>{invoiceData.tax}%</span>
                </div>
                {/if}
                {#if invoiceData.discount}
                <div class="discount">
                    <p>Discount</p>
                    <p class="discount-amount">
                        {formatCurrency(invoiceData.discount)}
                    </p>
                </div>
                {/if}
            </div>

            <div class="total">
                <p>TOTAL</p>
                <p class="total-amount">
                    {formatCurrency(invoiceData.total || 0)}
                </p>
            </div>
        </div>

        <div class="footer">
            {#if invoiceData.accountDetails}
                <div class="bank-details">
                    <h2>BANK DETAILS</h2>
                    <p>{@html invoiceData.accountDetails.replace(/\n/g, '<br/>')}</p>
                </div>
            {/if}
        
            <div class="thank-you">
                <p>THANK YOU</p>
                {#if invoiceData.signature && invoiceData.signature?.length}
                    <div class="signature">
                        {#each invoiceData.signature as layer}
                            <Signature {layer} />
                        {/each}
                    </div>
                {/if}
                <p class="issuer-name">{invoiceData.issuer.name}</p>
            </div>
        </div>
    </div>
</main>

<style>
    #builder {
        font-family: 'Open Sans', sans-serif;
        padding: 2rem 5rem;
        background-color: #fff;
        max-width: 250mm;
        min-width: 250mm;
        min-height: 100vh;
        color: #3D3B3A;
    }

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 2rem;
        margin-bottom: 6rem;
    }

    .logo {
        width: 10rem;
        margin-bottom: 1rem;
    }

    .logo-text {
        font-size: 2rem;
        font-weight: bold;
    }

    .info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: 1.5em;
    }

    .recipient-info {
        margin-bottom: 2rem;
    }

    .recipient-info h2 {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }

    .recipient-info p {
        font-size: 1.125rem;
    }

    .invoice-details {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 2em;
    }

    .invoice-details p {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    .invoice-details span {
        margin-left: 1rem;
        font-size: 1.125rem;
        font-weight: normal;
    }

    .table-container {
        margin-top: 5rem;
        color: #3D3B3A;
    }

    table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
    }

    thead {
        background-color: #E3DCD4;
    }

    .table-head {
        height: 2.5rem;
        padding: 0.5rem;
        color: #3D3B3A;
        font-weight: 600;
    }

    .table-head-cell {
        padding: 0.5rem 2rem;
        font-size: 0.875rem;
        white-space: nowrap;
    }

    .table-head-cell.description {
        text-align: left;
        width: 40%;
    }

    .table-head-cell.unit-price,
    .table-head-cell.qty {
        text-align: center;
        width: 15%;
    }

    .table-head-cell.amount {
        text-align: right;
        width: 30%;
    }

    .table-body {
        border-collapse: separate;
        border-spacing: 0;
    }

    .table-body-row {
        background-color: transparent;
        color: #3D3B3A;
    }

    .table-body-cell {
        padding: 0.5rem 2rem;
        font-size: 1.125rem;
    }

    .table-body-cell.description {
        text-align: left;
    }

    .table-body-cell.unit-price,
    .table-body-cell.qty {
        text-align: center;
    }

    .table-body-cell.amount {
        text-align: right;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .summary {
        margin: 1.5rem 0;
    }

    .subtotal {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem;
    }

    .subtotal-amount {
        font-size: 1.125rem;
        font-weight: 600;
    }

    .additional-details {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .tax,
    .discount {
        display: flex;
        gap: 5rem;
        font-size: 1.125rem;
        align-items: center;
        text-align: right;
        margin: 1rem 0;
        padding: 0 0.75rem;
    }

    .discount-amount {
        font-size: 1.125rem;
        font-weight: 600;
    }

    .total {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background-color: #E3DCD4;
        padding: 0.5rem;
        margin: 1rem 0;
        min-height: 2.5rem;
        height: 2.5rem;
        gap: 4rem;
    }

    .total-amount {
        font-size: 1.125rem;
        font-weight: 600;
    }

    .footer {
        display: flex;
        justify-content: space-between;
        margin: 2rem 0;
    }

    .bank-details {
        font-size: 1.125rem;
    }

    .thank-you {
        text-align: right;
    }

    .thank-you p {
        font-size: 1.125rem;
        font-weight: 600;
    }

    .signature {
        position: relative;
        overflow: hidden;
    }

    .issuer-name {
        font-family: "Great Vibes", cursive;
        padding-top: 1rem;
        border-top: 1px solid #000;
        font-weight: 500;
        text-transform: uppercase;
    }
</style>
