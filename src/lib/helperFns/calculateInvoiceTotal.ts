import type { InvoiceItems } from "../../types/types";

export function calculateInvoiceTotal(invoiceItemsArr: InvoiceItems[], discount: number = 0, taxPercentage: number = 0): { subTotal: number, total: number } {
    const subTotal = invoiceItemsArr.reduce((total, item) => {
        const itemAmount = parseFloat(`${item.amount}`)
        return total + itemAmount;
    }, 0)

    let taxAmount = 0;
    if (taxPercentage > 0) {
        taxAmount = subTotal * (taxPercentage / 100)
    }

    const total = subTotal - discount - taxAmount;

    return {
        subTotal: parseFloat(subTotal.toFixed(2)),
        total: parseFloat(total.toFixed(2))
    }
}
