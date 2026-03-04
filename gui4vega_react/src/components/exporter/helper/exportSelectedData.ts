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

    // Extract selected datasets before removing them from spec
    if (Array.isArray(specObj.data) && datasetNames.length > 0) {
        exportedDatasets = specObj.data
            .filter((d: Record<string, unknown>) => d && d.name && datasetNames.includes(d.name as string))
            .map((d: Record<string, unknown>) => JSON.stringify({ name: d.name, values: d.values }));

        // Remove selected datasets from spec
        specObj.data = specObj.data.filter((d: Record<string, unknown>) =>
            !d || !d.name || !datasetNames.includes(d.name as string)
        );
    }

    // Extract selected signals before removing them from spec
    if (Array.isArray(specObj.signals) && signalNames.length > 0) {
        exportedSignals = specObj.signals
            .filter((s: Record<string, unknown>) => s && s.name && signalNames.includes(s.name as string))
            .map((s: Record<string, unknown>) => JSON.stringify({ name: s.name, value: s.value }));

        // Remove selected signals from spec
        specObj.signals = specObj.signals.filter((s: Record<string, unknown>) =>
            !s || !s.name || !signalNames.includes(s.name as string)
        );
    }

    return {
        spec: JSON.stringify(specObj, null, 2),
        datasets: exportedDatasets,
        signals: exportedSignals
    };
}