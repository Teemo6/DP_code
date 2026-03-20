import React, { useState } from 'react';
import { Modal, Input, Tabs, Upload, Form, Typography, message } from 'antd';
import { CheckCircleOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { importCSV, importJSON } from '../helper/ImportDataset.ts';
import { gui4VegaLogger } from "../../../logger.ts";

const { Text, Paragraph } = Typography;
const { Dragger } = Upload;

/**
 * Props for {@link DatasetImportModal}.
 */
interface DatasetImportModalProps {
    open: boolean;
    onCancel: () => void;
    onAdd: (datasetName: string, data?: Record<string, unknown>[]) => void;
}

/**
 * Component responsible for rendering a modal that allows users to add a new dataset to the Vega specification.
 * @param props - {@link DatasetImportModalProps}
 */
const DatasetImportModal: React.FC<DatasetImportModalProps> = (props: DatasetImportModalProps) => {
    // State to track the form
    const [form] = Form.useForm();

    // State to track the active tab inside the modal
    const [activeTab, setActiveTab] = useState('empty');

    // State to store the imported data from the file
    const [importedData, setImportedData] = useState<Record<string, unknown>[] | undefined>(undefined);

    // Reset state and call onCancel when modal is closed
    const handleCancel = () => {
        form.resetFields();
        setImportedData(undefined);
        setActiveTab('empty');
        props.onCancel();
    };

    // Validate form and call onAdd, then reset state
    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (activeTab === 'import' && !importedData) {
                message.error('Please upload a file.');
                return;
            }

            props.onAdd(values.datasetName, activeTab === 'import' ? importedData : undefined);
            handleCancel();
        } catch {
            gui4VegaLogger.error('Dataset import validation failed');
        }
    };

    // Upload component props with file type validation and parsing logic
    const uploadProps: UploadProps = {
        accept: ".csv,.json",
        multiple: false,
        maxCount: 1,
        beforeUpload: async (file) => {
            const isCSV = file.type === 'text/csv' || file.name.endsWith('.csv');
            const isJSON = file.type === 'application/json' || file.name.endsWith('.json');

            // User can drag any file, catch it here
            if (!isCSV && !isJSON) {
                gui4VegaLogger.error(`${file.name} is not a supported file type.`);
                return Upload.LIST_IGNORE;
            }

            try {
                const data = isCSV ? await importCSV(file) : await importJSON(file);
                setImportedData(data);
            } catch {
                gui4VegaLogger.error(`Failed to parse ${file.name}`);
                return Upload.LIST_IGNORE;
            }
            return false;
        },
        onRemove: () => setImportedData(undefined),
    };

    return (
        <Modal
            title="Add New Dataset"
            open={props.open}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Add"
            destroyOnHidden
        >
            <Form form={form} layout="vertical">
                <Form.Item name="datasetName" label="Dataset Name" rules={[{ required: true }]}>
                    <Input autoFocus placeholder="Enter name" />
                </Form.Item>

                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        {
                            key: 'empty',
                            label: 'Create Empty',
                            children: <Paragraph type="secondary">Creates a new dataset with a blank template. You can add data later.</Paragraph>
                        },
                        {
                            key: 'import',
                            label: 'Import File',
                            children: (
                                <Form.Item
                                    name="file"
                                    rules={[{ required: activeTab === 'import', message: 'Upload required' }]}
                                >
                                    <Dragger {...uploadProps} maxCount={1}>
                                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                                        <p className="ant-upload-text">Click or drag to upload CSV/JSON</p>
                                        {importedData && (
                                            <Text type="success">
                                                <CheckCircleOutlined /> {importedData.length.toLocaleString()} rows found
                                            </Text>
                                        )}
                                    </Dragger>
                                </Form.Item>
                            ),
                        },
                    ]}
                />
            </Form>
        </Modal>
    );
};

export default DatasetImportModal;