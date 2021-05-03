export function getPreviousMonday(date:Date) {
    date.setDate(date.getDate() + 1 - (date.getDay() || 7));
    return date;
}

export function offsetDate(date: Date, offset: number): Date {
    let result = new Date(date);
    result.setDate(result.getDate() + offset);
    return result;
}