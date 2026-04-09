import React from 'react';
import { Button, Divider, Modal, Typography } from 'antd';
import { useSelectionExporter } from "./hooks/useSelectionExporter.ts";
import type { ExportedData } from './helper/exportSelectedData.ts';
import { UploadOutlined } from "@ant-design/icons";
import ExportPreviewModal from "./ExportPreviewModal.tsx";
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
    };

    const handleBack = () => {
        openExporter();
        handleCloseExportModal();
    };

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
    } = useSelectionExporter({
        editorState: props.editorState,
        onExportSuccess: handleExportSuccess,
    });

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
                <Typography.Text type="secondary" style={{ textAlign: 'center' }}>
                    Selected datasets and signals will be extracted from the specification and exported separately.
                    To export the entire specification with datasets and signals, do not select anything.
                </Typography.Text>
                <Divider />
                <SelectionConfigurator
                    datasetNames={datasetNames}
                    signalNames={signalNames}
                    datasetSelection={datasetSelection}
                    signalSelection={signalSelection}
                    setDatasetSelection={setDatasetSelection}
                    setSignalSelection={setSignalSelection}
                />
            </Modal>

            <ExportPreviewModal
                open={isExportModalOpen}
                data={exportedData}
                onClose={handleCloseExportModal}
                onBack={handleBack}
                onConfirm={handleCloseExportModal}
            />
        </>
    );
};

export default SelectionExporter;