export function formatPrice(number: number) {
    const result = number.toFixed(2);

    return `R$${result}`.replace(".", ",");
}
