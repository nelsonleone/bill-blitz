export function getInvoiceDateString(dateValue: any): string {
  return `${dateValue.year}-${dateValue.month.toString().padStart(2, '0')}-${dateValue.day.toString().padStart(2, '0')}`
}