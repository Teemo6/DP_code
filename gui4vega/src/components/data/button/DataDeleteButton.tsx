import React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

/**
 * Props for {@link DataDeleteButton}.
 */
interface DataDeleteButtonProps {
    /**
     * The index of the record or column to be deleted.
     */
    index: number;
    /**
     * The type of the item to be deleted.
     */
    type: 'record' | 'column';
    /**
     * When `true`, shows a confirmation dialog before performing the delete action.
     */
    confirmDelete: boolean;
    /**
     * Callback function that is called when the delete action is triggered.
     * @param rowIndex - The index of the record or column to be deleted, as specified in the `index` prop.
     */
    onDelete: (rowIndex: number) => void;
}

/**
 * Component responsible for rendering a delete button for records or columns in the data view.
 * @param props - {@link DataDeleteButtonProps}
 */
const DataDeleteButton: React.FC<DataDeleteButtonProps> = (props: DataDeleteButtonProps) => {
    // Logic to handle delete with confirmation
    const handleClick = () => {
        if (props.confirmDelete) {
            Modal.confirm({
                title: 'Are you sure?',
                content: `Do you really want to delete this ${props.type}?`,
                okText: 'Delete',
                okButtonProps: { danger: true, type: 'default' },
                cancelText: 'Cancel',
                onOk: () => props.onDelete(props.index),
            });
        } else {
            props.onDelete(props.index);
        }
    };

    return (
        <Button size="small" type="text" onClick={handleClick} title={"Delete " + props.type}>
            <DeleteOutlined />
        </Button>
    );
};

export default DataDeleteButton;