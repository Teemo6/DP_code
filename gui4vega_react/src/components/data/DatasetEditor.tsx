import React, { useState, useMemo } from 'react';
import { Card, Space, Table, Empty } from 'antd';
import type { VegaDataset } from './helper/datasetEdit';
import type { VegaEditorState } from "../useVegaEditor";
import { useDatasetActions } from './hooks/useDatasetActions';
import { useDatasetColumns } from './hooks/useDatasetColumns';
import DatasetHeader from './DatasetHeader';
import DatasetToolbar from './DatasetToolbar';

interface DatasetEditorProps {
    editorState: VegaEditorState;
    dataset: VegaDataset;
    onDeleteDataset: (datasetName: string) => void;
}

const DatasetEditor: React.FC<DatasetEditorProps> = (props: DatasetEditorProps) => {
    const [tableVisible, setTableVisible] = useState(true);
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