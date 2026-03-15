import React, { useMemo, useState } from 'react';
import { Typography, Space, Flex, message } from 'antd';
import { parseDatasets, addDataset, deleteDataset } from './helper/datasetEdit.ts';
import DatasetAddButton from './button/DatasetAddButton.tsx';
import DatasetCard from './DatasetCard';
import DatasetDeleteButton from './button/DatasetDeleteButton.tsx';
import type { VegaEditorState } from "../useVegaEditor.ts";

interface DataViewProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

const DataView: React.FC<DataViewProps> = (props) => {
    // Parse datasets from spec, memoized by code
    const datasets = useMemo(() => parseDatasets(props.editorState.code), [props.editorState.code]);

    // Track confirmDelete state per dataset
    const [confirmDelete, setConfirmDelete] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        const parsed = parseDatasets(props.editorState.code);
        parsed.forEach(ds => { initial[ds.name] = true; });
        return initial;
    });

    // Update confirmDelete state for a dataset
    const handleConfirmDeleteChange = (datasetName: string, value: boolean) => {
        setConfirmDelete(prev => ({ ...prev, [datasetName]: value }));
    };

    // Add dataset handler
    const handleAddDataset = (datasetName: string) => {
        const trimmed = datasetName.trim();
        if (!trimmed) {
            message.error('Dataset name cannot be empty.');
            return;
        }
        if (datasets.some(ds => ds.name === trimmed)) {
            message.error('Dataset name already exists.');
            return;
        }
        props.editorState.setCode(addDataset(props.editorState.code, trimmed, [{ NewColumn: '' }]));
    };

    // Delete dataset handler (no modal here, handled in button)
    const handleDeleteDataset = (datasetName: string) => {
        props.editorState.setCode(deleteDataset(props.editorState.code, datasetName));
    };

    return (
        <Space orientation="vertical" style={{ width: '100%', padding: 8, overflow: 'auto'}}>
            <Flex justify="space-between" align="center">
                <Typography.Title level={5}>Datasets</Typography.Title>
                <DatasetAddButton onAdd={handleAddDataset} />
            </Flex>
            {datasets.length === 0 ? (
                <Typography.Text type="secondary">No inline data found in Vega specification.</Typography.Text>
            ) : (
                datasets.map(ds => (
                    <DatasetCard
                        key={ds.name}
                        ds={ds}
                        editorState={props.editorState}
                        confirmDelete={confirmDelete[ds.name]}
                        onConfirmDeleteChange={value => handleConfirmDeleteChange(ds.name, value)}
                        deleteButton={<DatasetDeleteButton datasetName={ds.name} onDelete={handleDeleteDataset} />}
                    />
                ))
            )}
        </Space>
    );
};

export default DataView;