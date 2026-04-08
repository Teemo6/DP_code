import React, { useMemo } from 'react';
import { Typography, Flex, message, Space } from 'antd';
import { addDataset, deleteDataset, moveDataset } from './helper/EditDataset.ts';
import DatasetAddButton from './button/DatasetAddButton';
import DatatypeHelpTooltip from './button/DatatypeHelpTooltip.tsx';
import DatasetEditor from './DatasetEditor';
import type { VegaEditorState } from "../useVegaEditor";
import { parseDatasets } from "./helper/VegaDataset.ts";
import type { VegaDataset } from "./helper/VegaDataset.ts";
import { isExportedDatasets } from "./helper/ImportDataset.ts";

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
    // Parse datasets from spec with code memo
    const datasets = useMemo(() => parseDatasets(props.editorState.code), [props.editorState.code]);

    // Add dataset handler
    const handleAddDataset = (datasetName: string, data?: Record<string, unknown>[]) => {
        // Check if datasets follow the known export format
        const items = isExportedDatasets(data) ? data! : [{ name: datasetName, values: data?.length ? data : [{ NewColumn: '' }] }];

        // Variables for appending new datasets
        let currentCode = props.editorState.code;
        let addedCount = 0;

        // Process each dataset item
        items.forEach((ds) => {
            const name = (ds.name as string || '').trim();
            if (!name) {
                if (!isExportedDatasets(data)) message.error('Dataset name cannot be empty.');
                return;
            }

            if (datasets.some(existing => existing.name === name)) {
                message.warning(`Dataset name ${name} already exists. Could not import.`);
            } else {
                currentCode = addDataset(currentCode, name, ds.values as Record<string, unknown>[]);
                addedCount++;
            }
        });

        // Update spec if at least one dataset was added
        if (addedCount > 0) {
            props.editorState.setCode(currentCode);
            if (isExportedDatasets(data)) message.success(`Successfully imported ${addedCount} dataset(s).`);
        }
    };

    // Delete dataset handler
    const handleDeleteDataset = (datasetName: string) => {
        props.editorState.setCode(deleteDataset(props.editorState.code, datasetName));
    };

    // Move dataset handler
    const handleMoveDataset = (datasetName: string, direction: 'up' | 'down') => {
        props.editorState.setCode(moveDataset(props.editorState.code, datasetName, direction));
    };

    return (
        <Flex vertical style={{ width: '100%', padding: 8, overflow: 'auto'}}>
            <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
                <Space>
                    <Typography.Title level={5} style={{ margin: 0 }}>Datasets</Typography.Title>
                    <DatatypeHelpTooltip />
                </Space>
                <DatasetAddButton onAdd={handleAddDataset} />
            </Flex>
            {datasets.length === 0 ? (
                <Typography.Text type="secondary">No inline data found in Vega specification.</Typography.Text>
            ) : (
                datasets.map((dataset: VegaDataset) => (
                    <DatasetEditor
                        dataset={dataset}
                        editorState={props.editorState}
                        onDeleteDataset={handleDeleteDataset}
                        onMoveDataset={handleMoveDataset}
                    />
                ))
            )}
        </Flex>
    );
};

export default DataView;