export function generateInvoiceNumber(date: Date = new Date()): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
  
    let randomStr = '';
  
    while (randomStr.length < 3) {
      randomStr += Math.floor(Math.random() * 9).toString()
    }
  
    return `IN${year}${month}${day}-${randomStr}`;
}
  