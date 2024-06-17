import type { IBasicInvoiceData, ValidationErrors } from "../../types/types";

export function validateInvoiceFormData(formData: Partial<IBasicInvoiceData>) {
  let validationErrors = {
    issuer: { message: ""},
    issuerContactInfo: { message: ""},
    billToContactInfo: { message: ""},
    billToName: { message: ""},
    currency: { message: ""},
    items: { message: ""},
    total: { message: ""}
  }

  // Validate logo and company name
  if (!formData.logo && !formData.issuer?.name) {
      validationErrors.issuer.message = 'Company name is required if there is no logo.';
  }

  // Validate issuer contact info
  if (formData.issuer?.contactInfo) {
    if (!formData.issuer.contactInfo.emailAddress && !formData.issuer.contactInfo.phoneNumber && !formData.issuer.contactInfo.address) {
      validationErrors.issuerContactInfo.message = 'At least one contact information field is required for the issuer.';
    }
  }

  // Validate bill to contact info
  if (!formData.billTo?.name) {
    validationErrors.billToName.message = 'Bill to name is required.';
  }
  if (formData.billTo?.contactInfo) {
    if (!formData.billTo?.contactInfo.emailAddress && !formData.billTo?.contactInfo.phoneNumber && !formData.billTo.contactInfo.address) {
        validationErrors.billToContactInfo.message = 'At least one contact information field is required for the customer.';
    }
  }

  // Validate invoice items
  if (formData.invoiceData && formData.invoiceData.items.length !== 0) {
    validationErrors.items.message = 'No item was added'
  }

  // Validate other fields
  if (!formData.currency) {
    validationErrors.currency.message = 'Please select a Currency.'
  }
  if (!formData.total) {
    validationErrors.total.message = 'Please sum up Total or use the total calculator tool'
  }


  const errorMessagesArr = Object.values(validationErrors).map(val => val?.message && val.message) || []

  const isValid = Object.values(errorMessagesArr).length === 0;
  return { isValid, validationErrors }
}