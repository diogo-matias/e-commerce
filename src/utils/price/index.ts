export function formatPrice(number?: number) {
    const result = Number(number).toFixed(2);

    return `$ ${result}`.replace(".", ",");
}

export function formatString(str: string, end: number) {
    const result = str.slice(0, end);

    return `${result}...`;
}
