import React from 'react';
import { Space, Button, Checkbox } from 'antd';

/**
 * Props for {@link DatasetToolbar}.
 */
interface DatasetToolbarProps {
    /**
     * Whether delete actions should require confirmation.
     */
    confirmDelete: boolean;
    /**
     * Callback function invoked when the user toggles the delete confirmation setting.
     * @param val - New confirmation value where `true` means confirmation is required, `false` means it is not required.
     */
    onSetConfirmDelete: (val: boolean) => void;
    /**
     * Callback function invoked when the user adds a new row to the dataset (record).
     */
    onAddRow: () => void;
    /**
     * Callback function invoked when the user adds a new column to the dataset.
     */
    onAddColumn: () => void;
}

/**
 * Component responsible for rendering the toolbar with actions related to dataset editing.
 * @param props - {@link DatasetToolbarProps}
 */
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