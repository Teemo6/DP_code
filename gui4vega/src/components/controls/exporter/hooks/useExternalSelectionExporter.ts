import { useMemo, useState } from 'react';
import { parseDatasets } from '../../../data/helper/EditDataset.ts';
import { parseSignals } from '../../../signal/helper/VegaSignal.ts';
import { exportSelectedData } from '../helper/exportSelectedData.ts';

/**
 * Props for {@link useExternalSelectionExporter}.
 */
interface UseExternalSelectionExporterProps {
    /**
     * The Vega specification code from which datasets and signals will be parsed for selection and export.
     */
    code: string;
}

/**
 * Custom hook to manage the state and logic for exporting selected datasets and signals from the provided Vega specification.
 * @param props - {@link UseExternalSelectionExporterProps}
 * @return An object containing state and handlers for managing the export process based on the provided code.
 */
export const useExternalSelectionExporter = (props: UseExternalSelectionExporterProps) => {
    // Data extraction logic
    const datasetObjs = useMemo(() => parseDatasets(props.code), [props.code]);
    const signalObjs = useMemo(() => parseSignals(props.code), [props.code]);

    // Data names for checkbox groups
    const datasetNames = useMemo(() => datasetObjs.map(ds => ds.name), [datasetObjs]);
    const signalNames = useMemo(() => signalObjs.map(s => s.name), [signalObjs]);

    // State for modal visibility and selections
    const [datasetSelection, setDatasetSelection] = useState<string[]>([]);
    const [signalSelection, setSignalSelection] = useState<string[]>([]);

    // Get the data that would be exported based on current selections
    const getExportedData = () => {
        return exportSelectedData(props.code, datasetSelection, signalSelection);
    };

    return {
        // State
        datasetNames,
        signalNames,
        datasetSelection,
        signalSelection,
        // Setters for Checkbox Groups
        setDatasetSelection,
        setSignalSelection,
        // Handlers
        getExportedData,
    };
};