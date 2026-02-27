import React, { useMemo, useState } from 'react';
import { Typography, Space, Card, Button, Modal, Input, message } from 'antd';
import { parseDatasets, updateDatasetValue, addDatasetRow, deleteDatasetRow, addDataset, deleteDataset } from '../../types/vega';
import type { VegaDataset as VegaDatasetType } from '../../types/vega';
import DataTable from './DataTable';

interface DataViewProps {
    code: string;
    onCodeChange: (code: string) => void;
}

const DataView: React.FC<DataViewProps> = (props) => {
    // Save datasets parsed from spec, parse again only when code changes
    const datasets = useMemo(() => parseDatasets(props.code), [props.code]);

    // Lock state per dataset, default to true for all datasets
    const [confirmDelete, setConfirmDelete] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        const parsed = parseDatasets(props.code);
        parsed.forEach(ds => { initial[ds.name] = true; });
        return initial;
    });

    // State for add dataset modal
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [newDatasetName, setNewDatasetName] = useState('');

    // If datasets change, add new entries to confirmDelete state
    const handleConfirmDeleteChange = (datasetName: string, value: boolean) => {
        setConfirmDelete(prev => ({ ...prev, [datasetName]: value }));
    };

    // Add dataset handler
    const handleAddDataset = () => {
        const trimmed = newDatasetName.trim();
        if (!trimmed) {
            message.error('Dataset name cannot be empty.');
            return;
        }
        if (datasets.some(ds => ds.name === trimmed)) {
            message.error('Dataset name already exists.');
            return;
        }
        // Create dataset with one empty record and one column named 'NewColumn'
        props.onCodeChange(addDataset(props.code, trimmed, [{ NewColumn: '' }]));
        setAddModalVisible(false);
        setNewDatasetName('');
    };

    // Delete dataset handler
    const handleDeleteDataset = (datasetName: string) => {
        Modal.confirm({
            title: `Delete dataset "${datasetName}"?`,
            content: 'This will remove the entire dataset and all its data. This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => {
                props.onCodeChange(deleteDataset(props.code, datasetName));
            },
        });
    };

    return (
        <Space orientation="vertical" style={{ width: '100%', height: '100%', padding: 16, overflow: 'auto' }} size="middle">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Title level={5} style={{ margin: 0 }}>Datasets</Typography.Title>
                <Button type="primary" onClick={() => setAddModalVisible(true)}>
                    Add Dataset
                </Button>
            </div>
            {datasets.length === 0 ? (
                <Typography.Text type="secondary">No inline data found in spec.</Typography.Text>
            ) : (
                datasets.map(ds => (
                    <Card key={ds.name} style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <Typography.Text strong>{ds.name}</Typography.Text>
                            <Button danger size="small" onClick={() => handleDeleteDataset(ds.name)}>
                                Delete
                            </Button>
                        </div>
                        <DataTable
                            dataset={ds}
                            onCellChange={(rowIndex, col, newValue) =>
                                props.onCodeChange(updateDatasetValue(props.code, ds.name, rowIndex, col, newValue))
                            }
                            onAddRow={() => {
                                // Create a new row with same keys as first row, empty values
                                const keys = Object.keys(ds.values[0] ?? {});
                                const newRow = keys.reduce((acc, key) => ({ ...acc, [key]: '' }), {});
                                props.onCodeChange(addDatasetRow(props.code, ds.name, newRow));
                            }}
                            onDeleteRow={rowIndex =>
                                props.onCodeChange(deleteDatasetRow(props.code, ds.name, rowIndex))
                            }
                            confirmDelete={confirmDelete[ds.name]}
                            onConfirmDeleteChange={value => handleConfirmDeleteChange(ds.name, value)}
                            onColumnRename={(_oldCol, _newCol, updatedRows) => {
                                // Update the dataset in the spec
                                try {
                                    const spec = JSON.parse(props.code);
                                    const dataset = spec.data.find((d: VegaDatasetType) => d.name === ds.name);
                                    if (dataset) {
                                        dataset.values = updatedRows;
                                    }
                                    props.onCodeChange(JSON.stringify(spec, null, 2));
                                } catch {
                                    // If parsing fails, do nothing
                                }
                            }}
                            onColumnDelete={(_col, updatedRows) => {
                                try {
                                    const spec = JSON.parse(props.code);
                                    const dataset = spec.data.find((d: VegaDatasetType) => d.name === ds.name);
                                    if (dataset) {
                                        dataset.values = updatedRows;
                                    }
                                    props.onCodeChange(JSON.stringify(spec, null, 2));
                                } catch {
                                    // If parsing fails, do nothing
                                }
                            }}
                            onColumnAdd={(_col, updatedRows) => {
                                try {
                                    const spec = JSON.parse(props.code);
                                    const dataset = spec.data.find((d: VegaDatasetType) => d.name === ds.name);
                                    if (dataset) {
                                        dataset.values = updatedRows;
                                    }
                                    props.onCodeChange(JSON.stringify(spec, null, 2));
                                } catch {
                                    // If parsing fails, do nothing
                                }
                            }}
                        />
                    </Card>
                ))
            )}
            <Modal
                title="Add New Dataset"
                open={addModalVisible}
                onOk={handleAddDataset}
                onCancel={() => { setAddModalVisible(false); setNewDatasetName(''); }}
                okText="Add"
                cancelText="Cancel"
            >
                <Input
                    placeholder="Dataset name"
                    value={newDatasetName}
                    onChange={e => setNewDatasetName(e.target.value)}
                    onPressEnter={handleAddDataset}
                    autoFocus
                />
            </Modal>
        </Space>
    );
};

export default DataView;