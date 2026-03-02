import React, { useMemo, useState } from 'react';
import { Button, Modal, Checkbox, message, Typography, Divider, Flex, Layout } from 'antd';
import { exportSelectedData } from './helper/exportSelectedData.ts';
import { parseDatasets } from '../data/helper/datasetEdit.ts';
import { parseSignals } from '../signal/helper/signalEdit.ts';
import type { ExportedData } from './helper/exportSelectedData.ts';
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface SpecExporterProps {
    code: string;
    onExport?: (data: ExportedData) => void;
}

const SpecExporter: React.FC<SpecExporterProps> = (props) => {
    const datasetObjs = useMemo(() => parseDatasets(props.code), [props.code]);
    const signalObjs = useMemo(() => parseSignals(props.code), [props.code]);
    const datasetNames = datasetObjs.map(ds => ds.name);
    const signalNames = signalObjs.map(s => s.name);
    const [exportModalOpen, setExportModalOpen] = useState(false);
    const [exportSelection, setExportSelection] = useState<string[]>([]);
    const [signalSelection, setSignalSelection] = useState<string[]>([]);

    // When the user clicks the export button, open the modal and select all datasets and signals by default
    const handleExport = () => {
        try {
            setExportSelection(datasetNames);
            setSignalSelection(signalNames);
            setExportModalOpen(true);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Export does not work with invalid JSON spec.';
            message.error(errorMsg);
        }
    };

    // When the user confirms the export, call the export function with selected datasets and signals
    const handleExportConfirm = () => {
        try {

            const exported = exportSelectedData(props.code, exportSelection, signalSelection);
            if (props.onExport) props.onExport(exported);
            setExportModalOpen(false);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Export does not work with invalid JSON specification.';
            message.error(errorMsg);
        }
    };

    // If the user cancels, just close the modal without doing anything
    const handleExportCancel = () => {
        setExportModalOpen(false);
    };

    return (
        <>
            <Button onClick={handleExport} icon={<UploadOutlined />}>
                Export JSON Specification
            </Button>
            <Modal
                title="Select datasets and signals to export"
                open={exportModalOpen}
                onOk={handleExportConfirm}
                onCancel={handleExportCancel}
                width={800}
                styles={{ header: { textAlign: 'center' }}}
            >
                <Divider style={{ width: 'auto' }} />
                <Flex gap="large" style={{ minHeight: 200 }}>
                    {datasetNames.length > 0 && (
                        <Flex vertical flex={1} style={{ minWidth: 0 }}>
                            <Title level={5}>Datasets</Title>
                            <Layout style={{ overflow: 'auto', maxHeight: '350px', background: 'transparent' }}>
                                <Checkbox.Group
                                    options={datasetNames}
                                    value={exportSelection}
                                    onChange={setExportSelection}
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
        </>
    );
};

export default SpecExporter;