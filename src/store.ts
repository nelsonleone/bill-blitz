import { writable } from "svelte/store";
import type { AlertSeverity } from "./enums";

interface IStoreValue {
    severity: AlertSeverity | undefined,
    mssg: string
}

const storeValue : IStoreValue = {
    severity: undefined,
    mssg: ""
}

export const alertStore = writable(storeValue)