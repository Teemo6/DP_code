import React from 'react';
import { Modal, Divider } from 'antd';
import type { ExportedData } from './helper/exportSelectedData.ts';
import { useExternalSelectionExporter } from "./hooks/useExternalSelectionExporter.ts";
import SelectionConfigurator from "./SelectionConfigurator.tsx";

/**
 * Props for {@link ExternalSelectionExporter}.
 */
export interface ExternalSelectionExporterProps {
    /**
     * The Vega specification code from which datasets and signals will be extracted for export.
     */
    code: string;
    /**
     * When `true`, the export modal is open and visible to the user. When `false`, the modal is closed and hidden.
     */
    isOpen: boolean;
    /**
     * Callback function that is called when the export modal is closed.
     * This allows the parent component to control the visibility of the modal.
     */
    onClose: () => void;
    /**
     * Callback function that is called when the user confirms the export action.
     * @param data - The exported data containing the selected datasets and signals, which is passed to the parent component for further handling.
     */
    onExport: (data: ExportedData) => void;
}

/**
 * Component responsible for allowing users to export selected datasets and signals from the Vega specification.
 * Export action is controlled externally by the parent component.
 * @param props - {@link ExternalSelectionExporterProps}
 */
const ExternalSelectionExporter: React.FC<ExternalSelectionExporterProps> = (props: ExternalSelectionExporterProps) => {
    const {
        datasetNames,
        signalNames,
        datasetSelection,
        signalSelection,
        setDatasetSelection,
        setSignalSelection,
        getExportedData
    } = useExternalSelectionExporter({ code: props.code });

    // Handle export: get data, pass to user, close modal
    const handleExport = () => {
        const data = getExportedData();
        props.onExport(data);
        props.onClose();
    };

    return (
        <Modal
            title="Select datasets and signals to export"
            open={props.isOpen}
            onOk={handleExport}
            onCancel={props.onClose}
            width={900}
        >
            <Divider style={{ width: 'auto' }} />
            <SelectionConfigurator
                datasetNames={datasetNames}
                signalNames={signalNames}
                datasetSelection={datasetSelection}
                signalSelection={signalSelection}
                setDatasetSelection={setDatasetSelection}
                setSignalSelection={setSignalSelection}
            />
        </Modal>
    );
};

export default ExternalSelectionExporter;