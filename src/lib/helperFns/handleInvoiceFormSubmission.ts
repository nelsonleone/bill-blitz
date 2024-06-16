import type { IBasicInvoiceData, ValidationErrors } from "../../types/types";

  
export function validateInvoiceForm(e: { currentTarget: EventTarget & HTMLFormElement}) { 
    
    let errors : ValidationErrors = {}
    const formData = new FormData(e.currentTarget)
    console.log(formData)

    // // Validate issuer name
    // if (!formData.issuer.name) {
    //   errors.issuerName = { message: 'Issuer name is required' }
    // }
  
    // // Validate issuer contact info
    // if (formData.issuer.contactInfo) {
    //   if (!formData.issuer.contactInfo.phoneNumber) {
    //     errors.issuerPhone = { message: 'Issuer phone number is required' }
    //   }
    //   if (!formData.issuer.contactInfo.emailAddress) {
    //     errors.issuerEmail = { message: 'Issuer email address is required' }
    //   }
    // }
  
    // // Validate bill to name
    // if (!formData.billTo.name) {
    //   errors.billToName = { message: 'Receiver name is required' }
    // }
  
    // // Validate Receiver contact info
    // if (formData.billTo.contactInfo) {
    //   if (!formData.billTo.contactInfo.phoneNumber) {
    //     errors.billToPhone = { message: 'Receiver phone number is required' }
    //   }
    //   if (!formData.billTo.contactInfo.emailAddress) {
    //     errors.billToEmail = { message: 'Receiver email address is required' }
    //   }
    // }


  
    // if (!formData.currency || !formData.currency.value) {
    //   errors.invoiceNumber = { message: 'Invoice currency is required' }
    // }
  
    // // Validate total and subtotal
    // if (!formData.total) {
    //   errors.total = { message: 'Total is required' }
    // }
    // if (!formData.subTotal) {
    //   errors.subTotal = { message: 'Subtotal is required' }
    // }
  
    // return errors;
}
  