import React from 'react';
import { Button, Modal, Divider } from 'antd';
import {useSelectionExporter} from "./hooks/useSelectionExporter.ts";
import type { ExportedData } from './helper/exportSelectedData.ts';
import { UploadOutlined } from "@ant-design/icons";
import ExportedContent from './ExportedContent';
import type { VegaEditorState } from "../../useVegaEditor.ts";
import SelectionConfigurator from "./SelectionConfigurator.tsx";

/**
 * Props for {@link SelectionExporter}.
 */
interface SelectionExporterProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

/**
 * Component responsible for allowing users to export selected datasets and signals from the Vega specification.
 * @param props - {@link SelectionExporterProps}
 */
const SelectionExporter: React.FC<SelectionExporterProps> = (props: SelectionExporterProps) => {
    const [exportedData, setExportedData] = React.useState<ExportedData | null>(null);
    const [isExportModalOpen, setIsExportModalOpen] = React.useState(false);

    const handleExportSuccess = (data: ExportedData) => {
        setExportedData(data);
        setIsExportModalOpen(true);
    };

    const handleCloseExportModal = () => {
        setIsExportModalOpen(false);
        setExportedData(null);
    };

    const exporter = useSelectionExporter({
        editorState: props.editorState,
        onExportSuccess: handleExportSuccess,
    });
    const {
        isModalOpen,
        datasetNames,
        signalNames,
        datasetSelection,
        signalSelection,
        setDatasetSelection,
        setSignalSelection,
        openExporter,
        closeExporter,
        confirmExport
    } = exporter;

    return (
        <>
            <Button onClick={openExporter} icon={<UploadOutlined />}>
                Export by Selection
            </Button>

            <Modal
                title="Select datasets and signals to export"
                open={isModalOpen}
                onOk={confirmExport}
                onCancel={closeExporter}
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

            <Modal
                title="Exported Content"
                open={isExportModalOpen}
                onOk={handleCloseExportModal}
                onCancel={handleCloseExportModal}
                width={900}
            >
                {exportedData && <ExportedContent data={exportedData} />}
            </Modal>
        </>
    );
};

export default SelectionExporter;