import type { ColumnsType } from 'antd/es/table';
import EditableCell from './EditableCell';
import React, { useState } from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export function buildColumns(
    row: Record<string, unknown>,
    onCellChange: (rowIndex: number, col: string, newValue: unknown) => void,
    onColumnRename: (oldCol: string, newCol: string) => void,
    onColumnDelete: (col: string) => void,
    deleteLock: boolean
): ColumnsType<Record<string, unknown>> {
    return Object.keys(row).map(col => ({
        title: (
            <EditableColumnHeader
                col={col}
                onRename={newCol => onColumnRename(col, newCol)}
                onDelete={() => onColumnDelete(col)}
                deleteLock={deleteLock}
            />
        ),
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

const EditableColumnHeader: React.FC<{ col: string; onRename: (newCol: string) => void; onDelete: () => void; deleteLock: boolean }> = ({ col, onRename, onDelete, deleteLock }) => {
    const [editing, setEditing] = useState(false);
    const [inputVal, setInputVal] = useState(col);
    const save = () => {
        setEditing(false);
        if (inputVal && inputVal !== col) onRename(inputVal);
    };
    const handleDelete = () => {
        if (deleteLock) {
            onDelete();
        } else {
            if (window.confirm('Are you sure you want to delete this column?')) {
                onDelete();
            }
        }
    };
    if (editing) {
        return (
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    autoFocus
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onBlur={save}
                    onKeyDown={e => { if (e.key === 'Enter') save(); }}
                    style={{ minWidth: 80 }}
                />
                <Button danger size="small" style={{ marginLeft: 4 }} onClick={handleDelete} title="Delete column" icon={<DeleteOutlined />} />
            </span>
        );
    }
    return (
        <span style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setEditing(true)} title="Click to rename">
                {col}
            </span>
            <Button danger size="small" style={{ marginLeft: 4 }} onClick={handleDelete} title="Delete column" icon={<DeleteOutlined />} />
        </span>
    );
};
