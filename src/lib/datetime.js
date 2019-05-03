export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function resetTime(date) {
    const newDate = new Date(date);
    newDate.setHours(0,0,0,0);
    return newDate;
}
