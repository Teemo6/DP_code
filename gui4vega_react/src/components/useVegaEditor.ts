import { useState } from 'react';
import defaultSpec from '../assets/default.json';
import type { VegaDataset } from './data/helper/datasetEdit.ts';

export interface VegaSignal {
    name: string;
    value: unknown;
}

interface useVegaEditorProps {
    initialSchema?: Record<string, unknown>;
    initialDatasets?: VegaDataset[];
    initialSignals?: VegaSignal[];
}

export const useVegaEditor = (props: useVegaEditorProps) => {
    // State to hold the current Vega specification code
    const [code, setCode] = useState<string>(() => {
        // Start with the provided initial schema or fall back to the default spec
        const baseSpec = props.initialSchema ?? defaultSpec;
        const specWithData = { ...baseSpec };

        // If provided, add initial datasets to the beginning of the data block
        if (props.initialDatasets && Array.isArray(props.initialDatasets) && props.initialDatasets.length > 0) {
            // Ensure the data block exists and is an array
            if (!Array.isArray(specWithData.data)) {
                specWithData.data = [];
            }

            // Remove any existing datasets with the same name as those in initialDatasets
            const initialDatasetNames = props.initialDatasets.map((ds) => ds.name);
            const filteredData = (specWithData.data as VegaDataset[]).filter(
                (d) => !initialDatasetNames.includes(d.name)
            );

            // Prepend initialDatasets to the beginning of the data array
            specWithData.data = [...props.initialDatasets, ...filteredData];
        }

        // If provided, add initial signals to the beginning of the signals block
        if (props.initialSignals && Array.isArray(props.initialSignals) && props.initialSignals.length > 0) {
            // Ensure the signals block exists and is an array
            if (!Array.isArray(specWithData.signals)) {
                specWithData.signals = [];
            }

            // Remove any existing signals with the same name as those in initialSignals
            const initialSignalNames = props.initialSignals.map((sgn) => sgn.name);
            const filteredSignals = (specWithData.signals as VegaSignal[]).filter(
                (s) => !initialSignalNames.includes(s.name)
            );

            // Prepend initialSignals to the beginning of the signals array
            specWithData.signals = [...props.initialSignals, ...filteredSignals];
        }

        return JSON.stringify(specWithData, null, 2);
    });

    // Handler for when a new spec is loaded from the SpecLoader component
    const handleSpecLoad = (spec: unknown) => {
        setCode(JSON.stringify(spec, null, 2));
    };

    return { code, setCode, handleSpecLoad };
};