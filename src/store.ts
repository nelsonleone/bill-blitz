import { writable } from "svelte/store";
import type { AlertSeverity, TemplateNames } from "./enums";

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

const builtTemplate : TemplateNames | null = null;


export const alertStore = writable(storeValue)
export const imagePreviewModalStore = writable(imagePreviewModalVal)
export const hasUnsavedChanges = writable(false)
export const showNav = writable(false)
export const builtTemplateStore = writable(builtTemplate)
