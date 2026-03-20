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