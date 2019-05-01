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
