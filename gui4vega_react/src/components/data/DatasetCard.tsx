import React from 'react';
import { Card, Typography, Flex } from 'antd';
import DataTable from './DataTable';
import type { VegaDataset } from './helper/datasetEdit.ts';
import { updateDatasetValue, addDatasetRow, deleteDatasetRow } from './helper/datasetEdit.ts';
import type { VegaEditorState } from "../useVegaEditor.ts";
import { gui4VegaLogger } from "../../logger.ts";

interface DatasetCardProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
    ds: VegaDataset;
    confirmDelete: boolean;
    onConfirmDeleteChange: (value: boolean) => void;
    deleteButton: React.ReactNode;
}

const DatasetCard: React.FC<DatasetCardProps> = (props: DatasetCardProps) => {
    // Helper to update dataset values in the spec
    const updateDatasetRows = (updatedRows: Record<string, unknown>[]) => {
        try {
            const spec = JSON.parse(props.editorState.code);
            const dataset = spec.data.find((d: VegaDataset) => d.name === props.ds.name);
            if (dataset) {
                dataset.values = updatedRows;
            }
            props.editorState.setCode(JSON.stringify(spec, null, 2));
        } catch {
            gui4VegaLogger.error('Failed to update dataset rows: Invalid JSON in editor code.');
        }
    };

    return (
        <Card key={props.ds.name}>
            <Flex justify="space-between" align="center">
                <Typography.Text strong>{props.ds.name}</Typography.Text>
                {props.deleteButton}
            </Flex>
            <DataTable
                dataset={props.ds}
                onCellChange={(rowIndex, col, newValue) =>
                    props.editorState.setCode(updateDatasetValue(props.editorState.code, props.ds.name, rowIndex, col, newValue))
                }
                onAddRow={() => {
                    const keys = Object.keys(props.ds.values[0] ?? {});
                    const newRow = keys.reduce((acc, key) => ({ ...acc, [key]: '' }), {} as Record<string, unknown>);
                    props.editorState.setCode(addDatasetRow(props.editorState.code, props.ds.name, newRow));
                }}
                onDeleteRow={rowIndex =>
                    props.editorState.setCode(deleteDatasetRow(props.editorState.code, props.ds.name, rowIndex))
                }
                confirmDelete={props.confirmDelete}
                onConfirmDeleteChange={props.onConfirmDeleteChange}
                onColumnRename={(_oldCol, _newCol, updatedRows) => updateDatasetRows(updatedRows)}
                onColumnDelete={(_col, updatedRows) => updateDatasetRows(updatedRows)}
                onColumnAdd={(_col, updatedRows) => updateDatasetRows(updatedRows)}
            />
        </Card>
    );
};

export default DatasetCard;