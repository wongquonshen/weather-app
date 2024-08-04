export function NumberFormatter(num: number) {
    // Parse the number to ensure proper formatting operations
    const number = parseInt(num.toString());

    return number.toLocaleString();
}