import React from 'react';
import { Button, Modal, Checkbox, Typography, Divider, Flex, Layout } from 'antd';
import {useSelectionExporter} from "./hooks/useSelectionExporter.ts";
import type { ExportedData } from './helper/exportSelectedData.ts';
import { UploadOutlined } from "@ant-design/icons";
import ExportedContent from './ExportedContent';
import type { VegaEditorState } from "../../useVegaEditor.ts";

const { Title } = Typography;

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
                <Flex gap="large" style={{ minHeight: 200 }}>
                    {datasetNames.length > 0 && (
                        <Flex vertical flex={1} style={{ minWidth: 0 }}>
                            <Title level={5}>Datasets</Title>
                            <Layout style={{ overflow: 'auto', maxHeight: '350px', background: 'transparent' }}>
                                <Checkbox.Group
                                    options={datasetNames}
                                    value={datasetSelection}
                                    onChange={setDatasetSelection}
                                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                                />
                            </Layout>
                        </Flex>
                    )}

                    {datasetNames.length > 0 && signalNames.length > 0 && <Divider vertical style={{ height: 'auto' }} />}

                    {signalNames.length > 0 && (
                        <Flex vertical flex={1} style={{ minWidth: 0 }}>
                            <Title level={5}>Signals</Title>
                            <Layout style={{ overflow: 'auto', maxHeight: '350px', background: 'transparent' }}>
                                <Checkbox.Group
                                    options={signalNames}
                                    value={signalSelection}
                                    onChange={setSignalSelection}
                                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                                />
                            </Layout>
                        </Flex>
                    )}
                </Flex>
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