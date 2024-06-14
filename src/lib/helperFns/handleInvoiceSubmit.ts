import type { EventHandler } from "svelte/elements";

export async function handleInvoiceSubmit(e: { currentTarget: EventTarget & HTMLFormElement}){

    const formData = new FormData(e.currentTarget)

    const enterpriseName = formData.get('enterpriseName')
    const enterpriseAddress = formData.get('enterpriseAddress')
    const enterpriseEmail = formData.get('enterpriseEmail')
    const billToEnterprisePhone = formData.get('billToEnterprisePhone')
    const invoiceNumber = formData.get('invoiceNumber')
    const billToCustomerName = formData.get('billToCustomerName')
    const billToCustomerAddress = formData.get('billToCustomerAddress')
    const billToCustomerEmail = formData.get('billToCustomerEmail')
    const customerPhone = formData.get('customerPhone')
    const total = formData.get('total')
    const bankDetails = formData.get('bankDetails')
    const footerText = formData.get('footerText')
}