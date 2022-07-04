export function getPreviousStartDay(date:Date) {
    // Don't back date up to a start day. Just use the one passed in.
    // TODO: Make start day a user preference.
    // date.setDate(date.getDate() + 1 - (date.getDay() || 7));
    return date;
}

export function offsetDate(date: Date, offset: number): Date {
    let result = new Date(date);
    result.setDate(result.getDate() + offset);
    return result;
}