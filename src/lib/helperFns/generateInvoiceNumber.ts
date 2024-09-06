export function generateInvoiceNumber(date: Date = new Date()): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    const str = ""

    while (str.length < 3){
        str.concat((Math.floor(Math.random() * 9)).toString())
    }

    return `IN${year}${month}${day}-${str.trim()}`;
}
  