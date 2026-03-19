import React, { useMemo } from 'react';
import { Typography, Space, Flex, message } from 'antd';
import { parseDatasets, addDataset, deleteDataset } from './helper/EditDataset.ts';
import DatasetAddButton from './button/DatasetAddButton';
import DatasetEditor from './DatasetEditor';
import type { VegaEditorState } from "../useVegaEditor";

/**
 * Props for {@link DataView}.
 */
interface DataViewProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

/**
 * Component responsible for rendering the data view and editor.
 * @param props - {@link DataViewProps}
 * @constructor
 */
const DataView: React.FC<DataViewProps> = (props: DataViewProps) => {
    // Parse datasets from spec, memoized by code
    const datasets = useMemo(() => parseDatasets(props.editorState.code), [props.editorState.code]);

    // Add dataset handler
    const handleAddDataset = (datasetName: string, data?: Record<string, unknown>[]) => {
        const trimmed = datasetName.trim();
        if (!trimmed) {
            message.error('Dataset name cannot be empty.');
            return;
        }
        if (datasets.some(ds => ds.name === trimmed)) {
            message.error('Dataset name already exists.');
            return;
        }

        const initialData = data && data.length > 0 ? data : [{ NewColumn: '' }];
        props.editorState.setCode(addDataset(props.editorState.code, trimmed, initialData));
    };

    // Delete dataset handler
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
                datasets.map(dataset => (
                    <DatasetEditor
                        dataset={dataset}
                        editorState={props.editorState}
                        onDeleteDataset={handleDeleteDataset}
                    />
                ))
            )}
        </Space>
    );
};

export default DataView;