import React from 'react';
import { Space, Button, Checkbox } from 'antd';

interface DatasetToolbarProps {
    confirmDelete: boolean;
    onSetConfirmDelete: (val: boolean) => void;
    onAddRow: () => void;
    onAddColumn: () => void;
}

const DatasetToolbar: React.FC<DatasetToolbarProps> = (props: DatasetToolbarProps) => {
    return (
        <Space>
            <Button size="small" type="primary" onClick={props.onAddRow}>
                Add Record
            </Button>
            <Button size="small" onClick={props.onAddColumn}>
                Add Column
            </Button>
            <Checkbox
                checked={props.confirmDelete}
                onChange={e => props.onSetConfirmDelete(e.target.checked)}
            >
                Confirm Delete
            </Checkbox>
        </Space>
    );
};

export default DatasetToolbar;