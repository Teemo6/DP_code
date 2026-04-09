/**
 * Represents an axis in a Vega specification.
 */
export interface VegaAxis {
    orient?: string;
    scale?: string;
    title?: string;
    [key: string]: unknown;
}

/**
 * Updates a property of an axis in the Vega specification code.
 * @param code - The Vega specification code as a JSON string.
 * @param axisIndex - The index of the axis to update in the axes array.
 * @param property - The name of the property to update (e.g., "orient", "scale", "title").
 * @param newValue - The new value to set for the specified property, which can be of any type.
 * @returns The updated Vega specification code as a JSON string, or the original code if update fails.
 */
export function updateAxisProperty(
    code: string,
    axisIndex: number,
    property: string,
    newValue: unknown
): string {
    try {
        // Parse Vega spec
        const spec = JSON.parse(code);

        // Axes array must exist and the specified index must be valid
        if (!Array.isArray(spec.axes) || !spec.axes[axisIndex]) {
            return code;
        }

        // Update the specified property
        spec.axes[axisIndex][property] = newValue;
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}