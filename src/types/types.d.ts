import type { SvelteComponent } from "svelte";
import type { CurrencyEnum } from "../enums";


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

  billTo: InvoiceUserDetails

  invoiceData:{
    invoiceNumber: number,
    date: Date,
    items: InvoiceItems[]
  },

  accountDetails?: string,
  currency: string,
  signature?: SvelteComponent,
  total: number | undefined,
  subTotal: number | undefined,
  discount: number | undefined,
  footerText: string,
  tax: number | undefined,
  templateInUse: string
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