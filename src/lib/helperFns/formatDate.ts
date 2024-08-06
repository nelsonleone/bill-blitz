import { format, parseISO } from 'date-fns';

export function formatDateTime(dateString: string): string {
    if(!dateString){
        return "";
    }
    const date = parseISO(dateString)
    const day = format(date, 'do')
    const month = format(date, 'MMMM')
    const year = format(date, 'yyyy')
    const time = format(date, 'hh:mm a')

    return `${day} ${month} ${year}, ${time}`;
}