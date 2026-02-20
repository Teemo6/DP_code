export type Tab = 'spec' | 'data';

export interface VegaDataset {
    name: string;
    values: Record<string, unknown>[];
}

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

export function updateDatasetValue(
    code: string,
    datasetName: string,
    rowIndex: number,
    col: string,
    newValue: unknown
): string {
    try {
        const spec = JSON.parse(code);
        const dataset = spec.data.find((d: VegaDataset) => d.name === datasetName);
        if (!dataset) return code;
        dataset.values[rowIndex][col] = newValue;
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}
