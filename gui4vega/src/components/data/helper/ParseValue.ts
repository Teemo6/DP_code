/**
 * Parses user input to the correct primitive type.
 * @param val - The user input string.
 * @returns The converted value.
 */
export function parseValue(val: string): unknown {
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (val === 'null') return null;
    if (val.trim() !== '' && !isNaN(Number(val))) {
        return Number(val);
    }
    return val;
}