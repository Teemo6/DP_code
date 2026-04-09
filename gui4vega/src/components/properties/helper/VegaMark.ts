/**
 * Represents a mark in a Vega specification.
 */
export interface VegaMark {
    type: string;
    from?: { data: string };
    encode?: Record<string, Record<string, unknown>>;
    [key: string]: unknown;
}

/**
 * Updates a property of a mark's encode set in the Vega specification code.
 * @param code - The Vega specification code as a JSON string.
 * @param markIndex - The index of the mark to update in the marks array.
 * @param encodeSet - The name of the encode set to update (e.g., "enter", "update", "exit").
 * @param property - The name of the property to update within the encode set (e.g., "x", "y", "fill").
 * @param field - The specific field within the property to update (e.g., "value", "signal", "field").
 * @param newValue - The new value to set for the specified property field, which can be of any type.
 * @returns The updated Vega specification code as a JSON string, or the original code if update fails.
 */
export function updateMarkProperty(
    code: string,
    markIndex: number,
    encodeSet: string,
    property: string,
    field: string,
    newValue: unknown
): string {
    try {
        // Parse Vega spec
        const spec = JSON.parse(code);

        // Marks array must exist and the specified index must be valid
        if (!Array.isArray(spec.marks) || !spec.marks[markIndex]) {
            return code;
        }

        // Handle encoded objects in fields
        const mark = spec.marks[markIndex];
        if (!mark.encode) mark.encode = {};
        if (!mark.encode[encodeSet]) mark.encode[encodeSet] = {};
        const entry = mark.encode[encodeSet][property];

        // Update the specified property
        if (entry !== null && typeof entry === 'object' && !Array.isArray(entry)) {
            (entry as Record<string, unknown>)[field] = newValue;
        } else {
            mark.encode[encodeSet][property] = { [field]: newValue };
        }
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}