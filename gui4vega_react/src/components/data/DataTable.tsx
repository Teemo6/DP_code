import React from 'react';
import { Table, Typography, Button, Checkbox, Modal } from 'antd';
import type { VegaDataset } from '../../types/vega';
import { buildColumns } from './DataTableColumns';

interface DataTableProps {
    dataset: VegaDataset;
    onCellChange: (rowIndex: number, col: string, newValue: unknown) => void;
    onAddRow: () => void;
    onDeleteRow: (rowIndex: number) => void;
    deleteLock: boolean;
    onLockChange: (locked: boolean) => void;
    onColumnRename?: (oldCol: string, newCol: string, updatedRows: Record<string, unknown>[]) => void;
    onColumnDelete?: (col: string, updatedRows: Record<string, unknown>[]) => void;
    onColumnAdd?: (col: string, updatedRows: Record<string, unknown>[]) => void;
}

const DataTable: React.FC<DataTableProps> = ({ dataset, onCellChange, onAddRow, onDeleteRow, deleteLock, onLockChange, onColumnRename, onColumnDelete, onColumnAdd }) => {
    const handleColumnRename = (oldCol: string, newCol: string) => {
        // Update all rows: rename key oldCol to newCol
        const updatedRows = dataset.values.map(row => {
            const newRow = { ...row };
            newRow[newCol] = newRow[oldCol];
            delete newRow[oldCol];
            return newRow;
        });
        // Update dataset structure
        if (onColumnRename) onColumnRename(oldCol, newCol, updatedRows);
    };
    const handleColumnDelete = (col: string) => {
        if (deleteLock) {
            const updatedRows = dataset.values.map(row => {
                const newRow = { ...row };
                delete newRow[col];
                return newRow;
            });
            if (onColumnDelete) onColumnDelete(col, updatedRows);
        } else {
            Modal.confirm({
                title: 'Are you sure?',
                content: 'Do you really want to delete this column?',
                okText: 'Delete',
                okButtonProps: { danger: true },
                cancelText: 'Cancel',
                onOk: () => {
                    const updatedRows = dataset.values.map(row => {
                        const newRow = { ...row };
                        delete newRow[col];
                        return newRow;
                    });
                    if (onColumnDelete) onColumnDelete(col, updatedRows);
                },
            });
        }
    };
    const handleColumnAdd = () => {
        const col = prompt('Enter new column name:');
        if (!col) return;
        if (Object.keys(dataset.values[0] ?? {}).includes(col)) {
            alert('Column already exists!');
            return;
        }
        const updatedRows = dataset.values.map(row => ({ ...row, [col]: '' }));
        if (onColumnAdd) onColumnAdd(col, updatedRows);
    };
    const columns = buildColumns(
        dataset.values[0] ?? {},
        onCellChange,
        handleColumnRename,
        handleColumnDelete,
        deleteLock // unified lock
    );
    // Add delete column
    const columnsWithDelete = [
        ...columns,
        {
            title: 'Delete',
            key: 'delete',
            render: (_: unknown, _row: Record<string, unknown>, rowIndex: number) => (
                <Button danger size="small" onClick={() => {
                    if (deleteLock) {
                        onDeleteRow(rowIndex);
                    } else {
                        Modal.confirm({
                            title: 'Are you sure?',
                            content: 'Do you really want to delete this record?',
                            okText: 'Delete',
                            okButtonProps: { danger: true },
                            cancelText: 'Cancel',
                            onOk: () => onDeleteRow(rowIndex),
                        });
                    }
                }}>
                    Delete
                </Button>
            ),
        },
    ];
    const dataSource = dataset.values.map((row, i) => ({ ...row, _rowKey: i }));

    return (
        <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <Typography.Title level={5} style={{ marginBottom: 0 }}>
                    {dataset.name}
                    <Typography.Text type="secondary" style={{ fontWeight: 400, marginLeft: 8, fontSize: 13 }}>
                        ({dataset.values.length} rows)
                    </Typography.Text>
                </Typography.Title>
                <Button style={{ marginLeft: 16 }} size="small" type="primary" onClick={onAddRow}>
                    Add Record
                </Button>
                <Button style={{ marginLeft: 8 }} size="small" onClick={handleColumnAdd}>
                    Add Column
                </Button>
                <Checkbox
                    style={{ marginLeft: 16 }}
                    checked={deleteLock}
                    onChange={e => onLockChange(e.target.checked)}
                >
                    Do not confirm delete
                </Checkbox>
            </div>
            <Table
                columns={columnsWithDelete}
                dataSource={dataSource}
                rowKey="_rowKey"
                size="small"
                pagination={false}
                scroll={{ x: 'max-content' }}
            />
        </div>
    );
};

export default DataTable;