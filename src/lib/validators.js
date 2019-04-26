export function validateFloat(value, decimals) {
    return (new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`)).test(value)
}