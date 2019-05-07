import {getLocalDateString, resetTime} from "./datetime";

export function validateFloat(value, decimals=2) {
    return (new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`)).test(value)
}
export function validateInt(value) {
    return /^\d*$/.test(value)
}

//should contain 4-16 chars - letter, digits, first char should be letter
export function validateLogin(value) {
    const status = /^[A-Za-z][A-Za-z\d]{3,15}$/.test(value);
    return {status, error: (status ? null : "Поле має містити 4-16 латинських літер і цифр, перший символ - літера")};
}

//should contain 4-16 chars - letter, digits, underscore, first char should be letter
export function validatePassword(value) {
    const status = /^[A-Za-z]\w{3,15}$/.test(value);
    return {status, error: (status ? null : "Поле має містити 4-16 латинських літер, цифр або символ підкреслення, перший символ - літера")};
}

//should contain only letters (eng, rus)
export function validateTextField(value) {
    const status = /^[a-zа-їґ]+$/iu.test(value);
    return {status, error: (status ? null : "Поле має містити тільки літери англійського або українського алфавіту")};
}

//should be in format: 0XX-XXXXXXX
export function validateTelephoneField(value) {
    const status = /^0\d{2}-\d{7}$/.test(value);
    return {status, error: (status ? null : "Поле має бути заповнене в форматі: 0XX-XXXXXXX")}
}

//validates date format (yyyy-mm-dd) and that min <= date <= max
export function getDateValidator(min, max) {
    return (value) => {
        if(!/^(\d+-){2}\d+$/.test(value)) {
            return {status: false, error: 'Дата повинна бути в форматі: дд.мм.рррр'}
        }
        const parts = value.split('-');
        //-1 from month number, because new Date takes month in range 0-11
        const date = new Date(+parts[0], +parts[1]-1, +parts[2]);
        const minDate = resetTime(min);
        const maxDate = resetTime(max);
        if(date >= minDate && date <= maxDate) {
            return {status: true, error: null}
        }
        else {
            return {status: false, error: `Зараз бронювання можливе лише на дні від ${getLocalDateString(minDate)} до ${getLocalDateString(maxDate)}`}
        }
    }
}

function checkTimeIsLessOrEqual(time1, time2) {
    if(time1.h < time2.h) {
        return true
    }
    if(time1.h > time2.h) {
        return false
    }
    return time1.m <= time2.m
}

//validates time obj and that min <= time <= max
export function getTimeValidator(min, max) {
    return (value) => {
        if(value.h === undefined || value.m === undefined) {
            return {status: false, error: 'Поле має бути повністю заповнене'}
        }
        if(checkTimeIsLessOrEqual(min, value) && checkTimeIsLessOrEqual(value, max)) {
            return {status: true, error: null}
        }
        else {
            return {status: false, error: `Можливе бронювання на час від ${min.h}:${min.m} до ${max.h}:${max.m}`}
        }
    }
}


