import type { VegaDataset } from "./VegaDataset.ts";

/**
 * Parses the provided Vega spec code to extract datasets defined in the `data` array.
 * @param code - The Vega spec as a JSON string
 * @returns An array of VegaDataset objects found in the spec
 */
export function parseDatasets(code: string): VegaDataset[] {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.data)) return [];

        return spec.data
            .filter((d: VegaDataset) => Array.isArray(d.values) && d.values.length > 0)
            .map((d: VegaDataset) => ({ name: d.name, values: d.values }));
    } catch {
        return [];
    }
}

/**
 * Adds a new dataset to the Vega spec's data array with the specified name and optional initial values.
 * @param code - The Vega spec as a JSON string
 * @param datasetName - The name of the new dataset to add
 * @param initialValues - Optional initial values for the new dataset, defaulting to an empty array
 * @return The updated Vega spec as a JSON string, or the original code if addition fails
 */
export function addDataset(code: string, datasetName: string, initialValues: Record<string, unknown>[] = []): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.data)) spec.data = [];

        // Ensure unique name
        if (spec.data.some((d: VegaDataset) => d.name === datasetName)) return code;
        spec.data.push({ name: datasetName, values: initialValues });

        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

/**
 * Deletes a dataset from the Vega spec's data array based on the provided dataset name.
 * @param code - The Vega spec as a JSON string
 * @param datasetName - The name of the dataset to delete
 * @returns The updated Vega spec as a JSON string, or the original code if deletion fails
 */
export function deleteDataset(code: string, datasetName: string): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.data)) return code;

        // Filter dataset with the given name
        spec.data = spec.data.filter((d: VegaDataset) => d.name !== datasetName);

        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

/**
 * Moves a dataset up or down in the order of the Vega spec's data array.
 * Skipping any datasets that are not visible (for example empty values).
 * @param code - The Vega spec as a JSON string
 * @param datasetName - The name of the dataset to move
 * @param direction - The direction to move the dataset, either 'up' or 'down'
 * @returns The updated Vega spec as a JSON string, or the original code if movement fails
 */
export function moveDataset(code: string, datasetName: string, direction: 'up' | 'down'): string {
    try {
        const spec = JSON.parse(code);
        const datasets = spec?.data;

        // No datasets found, nothing to move
        if (!Array.isArray(datasets)) return code;

        // Find the valid index of the dataset to move
        const currentIndex = datasets.findIndex((d: VegaDataset) => d.name === datasetName);
        if (currentIndex === -1) return code;

        // Helper to check if a dataset is visible (has non-empty values)
        const isVisible = (d: VegaDataset) => Array.isArray(d.values) && d.values.length > 0;

        // Determine step direction
        const isUp = direction === 'up';
        const step = isUp ? -1 : 1;

        // Make target start or end of the list
        let targetIndex = isUp ? 0 : datasets.length - 1;

        // Count how many datasets are above/below the current one
        for (let i = currentIndex + step; i >= 0 && i < datasets.length; i += step) {
            if (isVisible(datasets[i])) {
                targetIndex = i;
                break;
            }
        }

        // Swap datasets
        const [movedItem] = datasets.splice(currentIndex, 1);
        datasets.splice(targetIndex, 0, movedItem);

        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}