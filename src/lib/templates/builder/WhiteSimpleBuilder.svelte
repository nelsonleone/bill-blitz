<script lang="ts">
  import Signature from "$lib/components/inputs/Signature.svelte";
  import { formatCurrency } from "$lib/helperFns/formatAmount";
  import type { IBasicInvoiceData } from "../../../types/types";
  import stripesBgImg from "../../statics-assets/grey-lines.png"

  export let invoiceData: IBasicInvoiceData;
</script>

<main id="builder">
  <img src={stripesBgImg} alt="" class="background-image" />
  <div class="header">
    <div>
      {#if invoiceData.logo}
        <img src={invoiceData.logo} alt="logo" width={120} height={120} class="logo" />
      {/if}
      {#if invoiceData.logoText}
        <h2 class="logo-text">{invoiceData.logoText}</h2>
      {/if}
    </div>

    {#if invoiceData.issuer.contactInfo}
      <div class="contact-info">
        {#each Object.values(invoiceData.issuer?.contactInfo) as info, i (i)}
          <p class="contact-info-item">{info}</p>
        {/each}
      </div>
    {/if}
  </div>

  <h1 class="invoice-title">Invoice</h1>

  <div class="invoice-details">
    <div class="invoice-meta">
      <p class="invoice-number">Invoice No: <span>{invoiceData.invoiceData.invoiceNumber}</span></p>
      <p class="invoice-date">Date: <span>{invoiceData.invoiceData.date?.toLocaleDateString()}</span></p>
    </div>

    <div class="bill-to">
      <p class="bill-to-label">Bill to:</p>
      <div class="bill-to-info">
        <p class="bill-to-name">{invoiceData.billTo.name}</p>
        <p>{invoiceData.billTo.contactInfo?.address}</p>
        <p>{invoiceData.billTo.contactInfo?.emailAddress}</p>
        <p>{invoiceData.billTo.contactInfo?.phoneNumber}</p>
      </div>
    </div>
  </div>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {#if invoiceData.invoiceData.items.length}
          {#each invoiceData.invoiceData.items as item, i (i)}
            <tr>
              <td>{i + 1}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.amount}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  <div class="summary">
    <div class="summary-details">
      {#if invoiceData.tax}
        <h3 class="tax">Tax: <span>{invoiceData.tax}%</span></h3>
      {/if}
      {#if invoiceData.discount}
        <h3 class="discount">Discount: <span>{formatCurrency(invoiceData.discount)}</span></h3>
      {/if}
    </div>
    <div class="total">
      {#if invoiceData.subTotal}
        <h3 class="sub-total">Sub-Total: <span>{formatCurrency(invoiceData.subTotal)}</span></h3>
      {/if}
      <h2 class="total-amount">Total <span>{formatCurrency(invoiceData.total || 0)}</span></h2>
    </div>
  </div>

  <div class="details-container">

      <div>
        {#if invoiceData.accountDetails}
        <div class="bank-details">
            <h3>Bank Details:</h3>
            <p>{@html invoiceData.accountDetails.replace(/\n/g, '<br/>')}</p>
          </div>
        {/if}
      </div>

      {#if invoiceData.signature?.length}
          <div class="signature-container">
          <div>
              {#each invoiceData.signature as layer}
              <Signature {layer} />
              {/each}
          </div>
          <p class="issuer-name">{invoiceData.issuer.name}</p>
          </div>
      {/if}
  </div>

  {#if invoiceData.footerText}
    <div class="footer">
      <p>{invoiceData.footerText}</p>
    </div>
  {/if}
</main>

<style>
  #builder {
    max-width: 250mm;
    min-width: 250mm;
    min-height: 100vh;
    padding: 32px;
    padding-inline: 5.5em;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    position: relative;
    z-index: 10;
    overflow: hidden;
  }

  .background-image {
    width: 20em;
    transform: rotate(180deg);
    position: absolute;
    top: 10em;
    left: -8em;
    opacity: 0.15;
  }

  .header {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
  }

  .logo {
    width: 8em;
    height: 8em;
  }

  .logo-text {
    font-weight: bold;
    font-size: 1.5rem;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    gap: 4px;
  }

  .contact-info-item {
    font-size: 1.2rem;
    white-space: nowrap;
  }

  .invoice-title {
    font-weight: 500;
    text-transform: uppercase;
    font-size: 7rem;
    font-family: 'Montserrat', sans-serif;
    margin: 64px 0;
  }

  .invoice-details {
    font-family: 'Open Sans', sans-serif;
  }

  .invoice-meta {
    display: flex;
    justify-content: space-between;
  }

  .invoice-number,
  .invoice-date {
    font-weight: bold;
    font-size: 1.2rem;
  }


  .invoice-number span , .invoice-date span{
      font-weight: normal;
      display: inline-block;
  }

  .bill-to {
    display: flex;
    gap: 28px;
    margin-top: 16px;
  }

  .bill-to-label {
    font-weight: bold;
  }

  .bill-to-info {
    margin-left: 1em;
  }

  .bill-to-name {
    font-weight: 500;
    font-size: 1.3rem;
  }

  .table-container {
    overflow-x: auto;
    margin-top: 64px;
    border-bottom: 2px solid #ccc;
    padding-bottom: 16px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    font-weight: bold;
    padding-inline: 24px;
    font-size: 1.3rem;
    padding-top: .5em;
    padding-bottom: 1.5em;
    text-align: center;
    text-transform: capitalize;
    border-top: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
    letter-spacing: 0.05em;
  }

  td {
    font-size: 1.1rem;
    padding: 12px 24px;
    text-align: center;
    white-space: nowrap;
  }

  .summary {
    margin-top: 32px;
    display: grid;
    grid-template-rows: repeat(3, auto);
    justify-content: end;
  }

  .summary-details {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 4.5em;
  }

  .tax,
  .discount {
    font-size: 1.4rem;
    font-weight: 500;
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .total {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 2em;
    align-items: center;
  }

  .sub-total {
    font-size: 1.3rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .total-amount {
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .details-container {
      display: flex;
      margin-block: 2em;
      justify-content: space-between;
  }

  .bank-details {
    margin: 20px 0;
    max-width: 22em;
  }

  .bank-details h3 {
    font-size: 1.3rem;
  }

  .bank-details p {
    font-size: 1.2rem;
  }

  .signature-container div {
    min-width: 8em;
    border-bottom: 1px solid #000;
  }

  .signature-container {
      display: flex;
      margin-top: 3em;
      flex-direction: column;
      justify-content: end;
      align-items: end;
  }

  .issuer-name {
    font-weight: 500;
    font-size: 1.2rem;
    text-transform: uppercase;
  }

  .footer {
    text-align: center;
    display: flex;
    justify-content: center;
    border-top: 1px solid #ccc;
    padding: 32px 0;
    margin-top: 40px;
    margin-bottom: 24px;
  }

  .footer p{
    font-size: 1.25rem;
  }
</style>