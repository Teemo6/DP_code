/**
 * Represents a legend in a Vega specification.
 */
export interface VegaLegend {
    fill?: string;
    title?: string;
    [key: string]: unknown;
}

/**
 * Updates a property of a legend in the Vega specification code.
 * @param code - The Vega specification code as a JSON string.
 * @param legendIndex - The index of the legend to update in the legends array.
 * @param property - The name of the property to update.
 * @param newValue - The new value to set for the specified property.
 * @returns The updated Vega specification code as a JSON string, or the original code if update fails.
 */
export function updateLegendProperty(
    code: string,
    legendIndex: number,
    property: string,
    newValue: unknown
): string {
    try {
        // Parse Vega spec
        const spec = JSON.parse(code);

        // Legends array must exist and the specified index must be valid
        if (!Array.isArray(spec.legends) || !spec.legends[legendIndex]) {
            return code;
        }

        // Update the specified property
        spec.legends[legendIndex][property] = newValue;
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}