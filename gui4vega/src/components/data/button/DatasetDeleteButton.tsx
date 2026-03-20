import React from 'react';
import { Button, Modal } from 'antd';

/**
 * Props for {@link DatasetDeleteButton}.
 */
interface DatasetDeleteButtonProps {
    /**
     * The name of the dataset to be deleted.
     */
    datasetName: string;
    /**
     * Callback function that is called when the delete action is triggered.
     * @param datasetName - The name of the dataset to be deleted.
     */
    onDelete: (datasetName: string) => void;
}

/**
 * Component responsible for rendering a delete button for a dataset in the data view.
 * @param props - {@link DatasetDeleteButtonProps}
 */
const DatasetDeleteButton: React.FC<DatasetDeleteButtonProps> = (props: DatasetDeleteButtonProps) => {
    // Show a confirmation before deleting the dataset
    const handleClick = () => {
        Modal.confirm({
            title: `Delete dataset "${props.datasetName}"?`,
            content: 'This will remove the entire dataset and all its data. This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => props.onDelete(props.datasetName),
        });
    };
    
    return (
        <Button danger size="small" onClick={handleClick}>
            Delete
        </Button>
    );
};

export default DatasetDeleteButton;