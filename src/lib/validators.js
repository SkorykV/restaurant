export function validateFloat(value, decimals=2) {
    return (new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`)).test(value)
}
export function validateInt(value) {
    return /^\d*$/.test(value)
}
