import React from 'react';
import { Modal, Checkbox, Typography, Divider, Flex, Layout } from 'antd';
import type { ExportedData } from './helper/exportSelectedData.ts';
import { useExternalSelectionExporter } from "./hooks/useExternalSelectionExporter.ts";

const { Title } = Typography;

interface ExternalSelectionExporterProps {
    code: string;
    isOpen: boolean;
    onClose: () => void;
    onExport: (data: ExportedData) => void;
}

const ExternalSelectionExporter: React.FC<ExternalSelectionExporterProps> = (props) => {
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
            width={800}
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
    );
};

export default ExternalSelectionExporter;