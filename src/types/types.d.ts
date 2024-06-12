import type { CurrencyEnum } from "../enums";

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
  phoneNumber?: string,
  emailAddress?: string
}

type InvoiceItems = {
  description: string,
  quantity?: number,
  price: string,
  amount: string,
  saved: boolean
}

interface IBasicInvoiceData {
  logo: string,
  logoText: string,
  issuer: {
    name: string,
    contactInfo?: IinvoiceContactInfo
  },

  billTo: {
    name: string,
    contactInfo?: IinvoiceContactInfo
  }

  invoiceData:{
    invoiceNumber: number,
    date: Date,
    items: InvoiceItems[]
  },

  accountDetails: {
    included: boolean,
    account: string
  },

  signatureInfo:{
    included: boolean,
    signatureI: string
  }
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