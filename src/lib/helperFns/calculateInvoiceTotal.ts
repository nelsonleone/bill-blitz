import type { InvoiceItems } from "../../types/types";

export function calculateInvoiceTotal(invoiceItemsArr:InvoiceItems[],discount:number = 0) : number {
    const total = invoiceItemsArr.reduce((total, item) => {
        const itemAmount = parseFloat(item.amount)
        return total + itemAmount;
    }, 0)
    return total - discount;
}