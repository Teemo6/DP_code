export interface ExportedData {
    spec: string;
    datasets: string[];
    signals: string[];
}

export function exportSelectedDatasets(specString: string, selectedDatasetNames: string[]): ExportedData {
    let specObj: Record<string, unknown>;

    // Parse Vega specification
    try {
        specObj = JSON.parse(specString);
    } catch {
        throw new Error('Invalid JSON specification');
    }

    let exportedDatasets: string[] = [];

    // Filter and export only selected datasets
    if (Array.isArray(specObj.data)) {
        exportedDatasets = specObj.data
            .filter((d: Record<string, unknown>) => d && d.name && selectedDatasetNames.includes(d.name as string))
            .map((d: Record<string, unknown>) => JSON.stringify({ name: d.name, values: d.values }));
    }

    return {
        spec: specString,
        datasets: exportedDatasets,
        signals: []
    };
}