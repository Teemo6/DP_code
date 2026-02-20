import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import EditableCell from './EditableCell';

export function buildColumns(
    row: Record<string, unknown>,
    onCellChange: (rowIndex: number, col: string, newValue: unknown) => void
): ColumnsType<Record<string, unknown>> {
    return Object.keys(row).map(col => ({
        title: col,
        dataIndex: col,
        key: col,
        render: (val: unknown, _row: Record<string, unknown>, rowIndex: number) => (
            <EditableCell
                value={val}
                onSave={newValue => onCellChange(rowIndex, col, newValue)}
            />
        ),
    }));
}