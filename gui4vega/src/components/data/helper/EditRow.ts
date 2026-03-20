import type { VegaDataset } from "./VegaDataset.ts";
import { gui4VegaLogger } from "../../../logger.ts";

/**
 * Utility function to transform a Vega spec's dataset by applying a provided transformation function.
 * @param code - The Vega spec as a JSON string
 * @param datasetName - The name of the dataset to transform
 * @param transform - A function that takes a VegaDataset and modifies it in place
 * @returns The updated Vega spec as a JSON string, or the original code if transformation fails
 */
export const transformSpec = (code: string, datasetName: string, transform: (ds: VegaDataset) => void): string => {
    try {
        const spec = JSON.parse(code);
        const dataset = spec.data?.find((d: VegaDataset) => d.name === datasetName);
        if (dataset) {
            transform(dataset);
            return JSON.stringify(spec, null, 2);
        }
    } catch (e) {
        gui4VegaLogger.error("Failed to transform datasets in Vega spec", e);
    }
    return code;
};

/**
 * Updates a specific cell value in a Vega dataset
 * @param dataset - The Vega dataset to modify
 * @param index - The row index of the cell to update
 * @param column - The column name of the cell to update
 * @param value - The new value to set in the specified cell
 * @returns The updated Vega dataset with the modified cell value
 */
export const updateDatasetValue = (dataset: VegaDataset, index: number, column: string, value: unknown) =>
    dataset.values[index][column] = value;

/**
 * Adds a new row to a Vega dataset
 * @param dataset - The Vega dataset to modify
 * @param row - An object representing the new row to add, where keys are column names and values are the corresponding cell values
 * @returns The updated Vega dataset with the new row added
 */
export const addDatasetRow = (dataset: VegaDataset, row: Record<string, unknown>) =>
    dataset.values.push(row);

/**
 * Deletes a row from a Vega dataset at the specified index
 * @param dataset - The Vega dataset to modify
 * @param index - The row index to delete from the dataset
 * @returns The updated Vega dataset with the specified row removed
 */
export const deleteDatasetRow = (dataset: VegaDataset, index: number) =>
    dataset.values.splice(index, 1);