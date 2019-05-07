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

//returns date and time in readable format
//example
export function getLocalDateTime(date) {
    const options = {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
    };

    const parts = date.toLocaleString('uk-UA', options).split(', ');
    return {date: parts.slice(0,2).join(', '), time: parts[2]}
}

//convert date to yyyy-month-day
export function getLocalDateString(date) {
    const month = date.getMonth()+1;
    const day = date.getDate();
    return `${date.getFullYear()}-${month < 10 ? '0'+month : month}-${day < 10 ? '0' + day : day}`
}
