import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

/**
 * Props for {@link DatasetAddButton}.
 */
interface DatasetAddButtonProps {
    /**
     * Callback function that is called when a new dataset is added.
     * @param datasetName - The name of the new dataset to be added.
     */
    onAdd: (datasetName: string) => void;
}

/**
 * Component responsible for rendering a button that allows users to add a new dataset to the Vega specification.
 * @param props - {@link DatasetAddButtonProps}
 */
const DatasetAddButton: React.FC<DatasetAddButtonProps> = (props: DatasetAddButtonProps) => {
    // State to control the visibility of the modal
    const [visible, setVisible] = useState(false);

    // State to hold the input value for the new dataset name
    const [value, setValue] = useState('');

    // Call the onAdd callback and close the modal
    const handleOk = () => {
        props.onAdd(value);
        setVisible(false);
        setValue('');
    };

    // Close the modal and reset the input value
    const handleCancel = () => {
        setVisible(false);
        setValue('');
    };

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>
                Add Dataset
            </Button>
            <Modal
                title="Add New Dataset"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Add"
                cancelText="Cancel"
            >
                <Input
                    placeholder="Dataset name"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onPressEnter={handleOk}
                    autoFocus
                />
            </Modal>
        </>
    );
};

export default DatasetAddButton;