import type { SvelteComponent } from "svelte";
import type { CurrencyEnum, TemplateNames } from "../enums";
import type Signature from "$lib/components/inputs/Signature.svelte";
import type { DateValue } from "@internationalized/date";


type NestedKeys<T, D extends number = 5> = [D] extends [0]
  ? keyof T
  : {
      [K in keyof T]: `${K & string}.${NestedKeys<T[K], Prev<D>>}`;
    }[keyof T];

type Prev<T extends number> = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`][T]
type IBasicInvoiceDataKeys = NestedKeys<IBasicInvoiceData>

export type AuthPageInputData = {
  name: string,
  id: string,
  placeholder: string,
  inputType: "email" | "password" | "text", 
  label?: string, 
  labelStyles?: string, 
  name: string, 
  inputStyles?: string, 
  containerStyles?: string,
  error?: string
}

export type CustomButtonPropsType = {
  text: string,
  id?: string,
  class?: string
}


interface InputObjForValidation {
  name: string;
  value: any;
  rules: {
    required?: boolean | string;
    [key: string]: any;
  }
}

interface ValidationErrors {
  [key: string]: {
    message: string;
  }
}

interface ITitleTextContent {
  title: string,
  text: string,
  icon?: string
  id?: string
}


interface IinvoiceContactInfo {
  address: string,
  phoneNumber?: string,
  emailAddress?: string
}

type InvoiceItems = {
  description: string,
  quantity?: number,
  price: number | undefined,
  amount: number | undefined,
  saved: boolean
}

interface InvoiceUserDetails {
  name: string,
  contactInfo?: IinvoiceContactInfo
}

interface IBasicInvoiceData {
  logo?: string,
  logoText?: string,
  issuer: InvoiceUserDetails,

  billTo: InvoiceUserDetails,

  invoiceData:{
    invoiceNumber: string,
    // still yet to find proper type for Bits-Ui DateInput DateValue
    date: any, 
    items: InvoiceItems[]
  },

  accountDetails?: string,
  currency: CurrencyEnum,
  signature?: { path: string; width: number; height: number }[],
  total: number | undefined,
  subTotal: number | undefined,
  discount: number | undefined,
  footerText: string,
  tax: number | undefined,
  templateInUse: TemplateNames,
}



interface ICurrency  {
  value: CurrencyEnum,
  label: string,
  icon: string
}


type InvoiceDateValue  = {
  calendar: {
    identifier: "gregory",
  },
  day: number,
  era: "AD",
  month: number,
  year: number,
}


interface InvoiceFormSubmitErrorMessage {
  message: string
}

type InvoiceFormSubmitError = {
  issuer: InvoiceFormSubmitErrorMessage,
  issuerContactInfo: InvoiceFormSubmitErrorMessage,
  billToContactInfo: InvoiceFormSubmitErrorMessage,
  billToName: InvoiceFormSubmitErrorMessage,
  currency: InvoiceFormSubmitErrorMessage,
  items: InvoiceFormSubmitErrorMessage,
  invoiceNumber: InvoiceFormSubmitErrorMessage,
  date: InvoiceFormSubmitErrorMessage,
  logo: InvoiceFormSubmitErrorMessage,
  total: InvoiceFormSubmitErrorMessage
}


interface ISavedInvoice { invoice_data: IBasicInvoiceData, pngImg: string, id: string, created_at: string, is_draft: boolean }