export function formatPrice(number?: number) {
    const result = Number(number).toFixed(2);

    return `$ ${result}`.replace(".", ",");
}
