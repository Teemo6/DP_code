import React, { useState } from 'react';
import { Space, Button, Checkbox, Input, Tooltip } from 'antd';
import { parseValue } from './helper/ParseValue';

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
     * @param defaultValue - The default value to be used for all cells in the new column.
     */
    onAddColumn: (defaultValue?: unknown) => void;
}

/**
 * Component responsible for rendering the toolbar with actions related to dataset editing.
 * @param props - {@link DatasetToolbarProps}
 */
const DatasetToolbar: React.FC<DatasetToolbarProps> = (props: DatasetToolbarProps) => {
    // State to hold the default value for new columns
    const [defaultValue, setDefaultValue] = useState<string>('');

    return (
        <Space>
            <Button size="small" type="primary" onClick={props.onAddRow}>
                Add Record
            </Button>
            <Tooltip title={defaultValue.trim() === '' ? "You need to type something in the input field" : ""}>
                <Button
                    size="small"
                    onClick={() => props.onAddColumn(parseValue(defaultValue))}
                    disabled={defaultValue.trim() === ''}
                >
                    Add Column
                </Button>
            </Tooltip>
            <Tooltip title="Default value for new column">
                <Input
                    size="small"
                    placeholder="Default value for new column"
                    value={defaultValue}
                    onChange={(e) => setDefaultValue(e.target.value)}
                    style={{ width: 100 }}
                />
            </Tooltip>
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