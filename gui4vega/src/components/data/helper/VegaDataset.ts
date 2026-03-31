/**
 * Dataset representation for Vega specification used in the GUI4Vega application.
 * Supports only inline datasets defined in the `data` property of the Vega spec.
 */
export interface VegaDataset {
    /**
     * The name of the dataset, which is used to reference it in the Vega specification.
     * Must be unique within the spec.
     */
    name: string;
    /**
     * Inline data values of the dataset.
     */
    values: Record<string, unknown>[];
    /**
     * Additional properties of the dataset that may be present in the Vega specification.
     */
    [key: string]: unknown;
}

/**
 * Parses the provided Vega spec code to extract datasets defined in the `data` array.
 * @param code - The Vega spec as a JSON string
 * @returns An array of datasets according to {@link VegaDataset} structure.
 * If the code is invalid or contains no datasets, an empty array is returned.
 */
export function parseDatasets(code: string): VegaDataset[] {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.data)) return [];
        return spec.data
            // Filter datasets that do not follow VegaDataset structure
            .filter((d: VegaDataset) => Array.isArray(d.values) && d.values.length > 0)
            .map((d: VegaDataset) => ({name: d.name, values: d.values}));
    } catch {
        return [];
    }
}