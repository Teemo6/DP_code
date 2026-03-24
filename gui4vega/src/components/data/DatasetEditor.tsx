import React, { useState, useMemo } from 'react';
import { Card, Space, Table, Empty } from 'antd';
import type { VegaEditorState } from "../useVegaEditor";
import { useDatasetActions } from './hooks/useDatasetActions';
import { useDatasetColumns } from './hooks/useDatasetColumns';
import DatasetHeader from './DatasetHeader';
import DatasetToolbar from './DatasetToolbar';
import type { VegaDataset } from "./helper/VegaDataset.ts";

/**
 * Props for {@link DatasetEditor}.
 */
interface DatasetEditorProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
    /**
     * The dataset object that this editor will manage and display.
     */
    dataset: VegaDataset;
    /**
     * Callback function that is called when the user wants to delete the dataset.
     * @param datasetName - The name of the dataset to be deleted.
     */
    onDeleteDataset: (datasetName: string) => void;
    /**
     * Callback function that is called when the user wants to move the dataset up or down in the list.
     * @param datasetName - The name of the dataset to be moved.
     * @param direction - The direction to move the dataset, either 'up' or 'down'.
     */
    onMoveDataset: (datasetName: string, direction: 'up' | 'down') => void;
}

/**
 * Component responsible for rendering an editor interface for a single dataset in a Vega specification.
 * @param props - {@link DatasetEditorProps}
 */
const DatasetEditor: React.FC<DatasetEditorProps> = (props: DatasetEditorProps) => {
    // Controls visibility of the dataset table editor
    const [tableVisible, setTableVisible] = useState(false);

    // Controls whether delete actions require confirmation
    const [confirmDelete, setConfirmDelete] = useState(true);

    const {
        handleColumnRename,
        handleColumnDelete,
        handleColumnAdd,
        handleAddRow,
        handleDeleteRow,
        handleCellChange
    } = useDatasetActions(props.editorState, props.dataset);

    const columns = useDatasetColumns({
        dataset: props.dataset,
        confirmDelete,
        onColumnRename: handleColumnRename,
        onColumnDelete: handleColumnDelete,
        onCellChange: handleCellChange,
        onDeleteRow: handleDeleteRow
    });

    const dataSource = useMemo(() =>
            props.dataset.values.map((row, i) => ({ ...row, _rowKey: i })),
        [props.dataset.values]
    );

    return (
        <Card size="small" style={{ marginBottom: 16 }}>
            <DatasetHeader
                datasetName={props.dataset.name}
                rowCount={props.dataset.values.length}
                tableVisible={tableVisible}
                onToggleTable={() => setTableVisible(!tableVisible)}
                onDeleteDataset={props.onDeleteDataset}
                onMoveDataset={props.onMoveDataset}
            />

            {/* Toolbar and Table */}
            {tableVisible && (
                <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                    <DatasetToolbar
                        confirmDelete={confirmDelete}
                        onSetConfirmDelete={setConfirmDelete}
                        onAddRow={handleAddRow}
                        onAddColumn={handleColumnAdd}
                    />

                    {props.dataset.values.length === 0 ? (
                        <Empty description="No data. Click 'Add Record' to start." />
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            rowKey="_rowKey"
                            size="small"
                            pagination={false}
                            scroll={{ x: 'max-content' }}
                            bordered
                        />
                    )}
                </Space>
            )}
        </Card>
    );
};

export default DatasetEditor;