export function generateInvoiceNumber(date: Date = new Date()): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    const numArr = []

    while (numArr.length < 3){
        numArr.push(Math.floor(Math.random() * 9))
    }

    return `IN${year}${month}${day}-${numArr}`;
}
  