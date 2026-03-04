import type { VegaDataset } from "../../data/helper/datasetEdit.ts";
import type { VegaSignal } from "../../signal/helper/signalEdit.ts";

export interface ImportedData {
    schema: Record<string, unknown>; // The base Vega spec
    datasets?: VegaDataset[];
    signals?: VegaSignal[];
}

export function prependDatasetsToSchema(baseSpec: Record<string, unknown>, initialSchema?: ImportedData): Record<string, unknown> {
    // If provided, add initial datasets to the beginning of the data block
    const initialDatasets = initialSchema?.datasets;
    if (initialDatasets && Array.isArray(initialDatasets) && initialDatasets.length > 0) {
        // Ensure the data block exists and is an array
        if (!Array.isArray(baseSpec.data)) {
            baseSpec.data = [];
        }

        // Remove any existing datasets with the same name as those in initialDatasets
        const initialDatasetNames = initialDatasets.map((ds) => ds.name);
        const filteredData = (baseSpec.data as VegaDataset[]).filter(
            (d) => !initialDatasetNames.includes(d.name)
        );

        // Prepend initialDatasets to the beginning of the data array
        baseSpec.data = [...initialDatasets, ...filteredData];
    }
    return baseSpec;
}

export function prependSignalsToSchema(baseSpec: Record<string, unknown>, initialSchema?: ImportedData): Record<string, unknown> {
    // If provided, add initial signals to the beginning of the signals block
    const initialSignals = initialSchema?.signals;
    if (initialSignals && Array.isArray(initialSignals) && initialSignals.length > 0) {
        // Ensure the signals block exists and is an array
        if (!Array.isArray(baseSpec.signals)) {
            baseSpec.signals = [];
        }

        // Remove any existing signals with the same name as those in initialSignals
        const initialSignalNames = initialSignals.map((sgn) => sgn.name);
        const filteredSignals = (baseSpec.signals as VegaSignal[]).filter(
            (s) => !initialSignalNames.includes(s.name)
        );

        // Prepend initialSignals to the beginning of the signals array
        baseSpec.signals = [...initialSignals, ...filteredSignals];
    }
    return baseSpec;
}