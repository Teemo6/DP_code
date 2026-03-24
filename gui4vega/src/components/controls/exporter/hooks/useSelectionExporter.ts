import { useMemo, useState } from 'react';
import { message } from 'antd';
import { parseDatasets } from '../../../data/helper/EditDataset.ts';
import { parseSignals } from '../../../signal/helper/VegaSignal.ts';
import { exportSelectedData } from '../helper/exportSelectedData.ts';
import type { ExportedData } from '../helper/exportSelectedData.ts';
import type { VegaEditorState } from "../../../useVegaEditor.ts";

/**
 * Props for {@link useSelectionExporter}.
 */
interface UseSelectionExporterProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
    /**
     * Optional callback that is called with the exported data when export is successful.
     * @param data - The data that was exported based on the selection of datasets and signals.
     */
    onExportSuccess?: (data: ExportedData) => void;
}

/**
 * Custom hook to manage the state and logic for exporting selected datasets and signals from a Vega specification.
 * @param props - {@link UseSelectionExporterProps}
 * @return An object containing state and handlers for managing the export process.
 */
export const useSelectionExporter = (props: UseSelectionExporterProps) => {
    // Data extraction logic
    const datasetObjs = useMemo(() => parseDatasets(props.editorState.code), [props.editorState.code]);
    const signalObjs = useMemo(() => parseSignals(props.editorState.code), [props.editorState.code]);

    // Data names for checkbox groups
    const datasetNames = useMemo(() => datasetObjs.map(ds => ds.name), [datasetObjs]);
    const signalNames = useMemo(() => signalObjs.map(s => s.name), [signalObjs]);

    // State for modal visibility and selections
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [datasetSelection, setDatasetSelection] = useState<string[]>([]);
    const [signalSelection, setSignalSelection] = useState<string[]>([]);

    // Open the exporter modal and pre-select all datasets and signals by default
    const openExporter = () => {
        try {
            setIsModalOpen(true);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Export does not work with invalid JSON spec.';
            message.error(errorMsg);
        }
    };

    // Close the exporter modal without doing anything
    const closeExporter = () => {
        setIsModalOpen(false);
    };

    // Confirm the export and call the export function with selected datasets and signals
    const confirmExport = () => {
        try {
            const exported = exportSelectedData(props.editorState.code, datasetSelection, signalSelection);
            if (props.onExportSuccess) props.onExportSuccess(exported);
            setIsModalOpen(false);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Export does not work with invalid JSON specification.';
            message.error(errorMsg);
        }
    };

    return {
        // State
        isModalOpen,
        datasetNames,
        signalNames,
        datasetSelection,
        signalSelection,
        // Setters for Checkbox Groups
        setDatasetSelection,
        setSignalSelection,
        // Handlers
        openExporter,
        closeExporter,
        confirmExport,
    };
};