export interface ExportedData {
    spec: string;
    datasets: string[];
    signals: string[];
}

export function exportSelectedData(specString: string, datasetNames: string[] = [], signalNames: string[] = []): ExportedData {
    let specObj: Record<string, unknown>;

    // Parse Vega specification
    try {
        specObj = JSON.parse(specString);
    } catch {
        throw new Error('Invalid JSON specification');
    }

    let exportedDatasets: string[] = [];
    let exportedSignals: string[] = [];

    // Filter and export only selected datasets
    if (Array.isArray(specObj.data) && datasetNames.length > 0) {
        exportedDatasets = specObj.data
            .filter((d: Record<string, unknown>) => d && d.name && datasetNames.includes(d.name as string))
            .map((d: Record<string, unknown>) => JSON.stringify({ name: d.name, values: d.values }));
    }

    // Filter and export only selected signals
    if (Array.isArray(specObj.signals) && signalNames.length > 0) {
        exportedSignals = specObj.signals
            .filter((s: Record<string, unknown>) => s && s.name && signalNames.includes(s.name as string))
            .map((s: Record<string, unknown>) => JSON.stringify({ name: s.name, value: s.value }));
    }

    return {
        spec: specString,
        datasets: exportedDatasets,
        signals: exportedSignals
    };
}
