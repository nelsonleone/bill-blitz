import { writable } from "svelte/store";
import type { AlertSeverity } from "./enums";

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