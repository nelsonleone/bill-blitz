import { CurrencyEnum, TemplateNames } from "../../enums";
import type { IBasicInvoiceData, InvoiceFormSubmitError } from "../../types/types";

export function validateInvoiceFormData(formData: Partial<IBasicInvoiceData>) {
  let validationErrors = setEmptyValidationErrors()

  // Validate logo and company name
  if (!formData.logo && !formData.logoText) {
    validationErrors.logo.message = 'Logo Text Alt. is required if there is no logo.';
  }


  if (!formData.issuer?.name) {
    validationErrors.issuer.message = 'Please enter issuer name';
  }

  // Validate issuer contact info
  if (formData.issuer?.contactInfo) {
    if (!formData.issuer.contactInfo.emailAddress && !formData.issuer.contactInfo.phoneNumber && !formData.issuer.contactInfo.address) {
      validationErrors.issuerContactInfo.message = 'At least one contact information field is required for the issuer.';
    }
  }

  // Validate bill to contact info
  if (!formData.billTo?.name) {
    validationErrors.billToName.message = 'Customer name is required.';
  }

  if (formData.billTo?.contactInfo) {
    if (!formData.billTo?.contactInfo.emailAddress && !formData.billTo?.contactInfo.phoneNumber && !formData.billTo.contactInfo.address) {
      validationErrors.billToContactInfo.message = 'At least one contact information field is required for the customer.';
    }
  }

  // Validate invoice items
  if (formData.invoiceData && formData.invoiceData.items?.length < 1) {
    validationErrors.items.message = 'No item was added'
  }

  // Validate other fields
  if (!formData.invoiceData?.invoiceNumber) {
    validationErrors.invoiceNumber.message = 'Please select input an invoice number.'
  }
  if (!formData.invoiceData?.date) {
    validationErrors.date.message = 'Please select date for invoice'
  }

  if (!formData.total) {
    validationErrors.total.message = 'Please sum up Total or use the total calculator tool'
  }


  const errorMessagesArr = Object.values(validationErrors).map(val => val?.message && val.message) || []

  const isValid = errorMessagesArr.find(val => val) ? false : true;
  return { isValid, validationErrors }
}


export const setEmptyValidationErrors : () => InvoiceFormSubmitError = () => {
  return {
    issuer: { message: ""},
    issuerContactInfo: { message: ""},
    billToContactInfo: { message: ""},
    billToName: { message: ""},
    currency: { message: ""},
    items: { message: ""},
    invoiceNumber: { message: ""},
    date: { message: ""},
    logo: { message: ""},
    total: { message: ""}
  }
}

export const demoData: IBasicInvoiceData = {
  logo: 'https://via.placeholder.com/150',
  logoText: 'MyCompany',
  issuer: {
    name: 'John Doe',
    contactInfo: {
      address: '123 Main St, Anytown USA',
      phoneNumber: '555-1234',
      emailAddress: 'john@mycompany.com'
    }
  },
  billTo: {
    name: 'Jane Doe',
    contactInfo: {
      address: '456 Oak Rd, Someplace CA',
      phoneNumber: '555-5678',
      emailAddress: 'jane@client.com'
    }
  },
  invoiceData: {
    invoiceNumber: '1234',
    date: new Date('2023-05-15'),
    items: [
      {
        description: 'Product A',
        quantity: 2,
        price: 10.99,
        amount: 21.98,
        saved: false
      },
      {
        description: 'Service B',
        quantity: 1,
        price: 50.00,
        amount: 50.00,
        saved: true
      },
      {
        description: 'Discount C',
        quantity: 1,
        price: -5.00,
        amount: -5.00,
        saved: true
      }
    ]
  },
  accountDetails: 'Bank Account: 12345678',
  currency: CurrencyEnum.UnitedStates,
  signature: [],
  total: 66.98,
  subTotal: 71.98,
  discount: 5.00,
  footerText: 'Thank you for your business!',
  tax: 0,
  templateInUse: TemplateNames.BlackWhiteMinimalist,
}