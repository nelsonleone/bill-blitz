import { writable } from "svelte/store";
import type { AlertSeverity } from "./enums";
import type { IBasicInvoiceData, ISavedInvoice } from "./types/types";

interface IStoreValue {
    severity: AlertSeverity | undefined,
    mssg: string
}

interface IimagePreviewModalStore {
    src: string | null
}

const storeValue : IStoreValue = {
    severity: undefined,
    mssg: ""
}

const imagePreviewModalVal : IimagePreviewModalStore = {
    src: null
}

export const alertStore = writable(storeValue)
export const imagePreviewModalStore = writable(imagePreviewModalVal)
export const hasUnsavedChanges = writable(false)
export const showNav = writable(false)
export const newInvoiceDataStore = writable<IBasicInvoiceData | null>(null)
export const editInvoiceDataStore = writable<ISavedInvoice | null>(null)
