import React, { useState } from 'react';
import { Button } from 'antd';
import DatasetImportModal from './DatasetImportModal';

/**
 * Props for {@link DatasetAddButton}.
 */
interface DatasetAddButtonProps {
    /**
     * Callback function that is called when a new dataset is added.
     * @param datasetName - The name of the new dataset to be added.
     * @param data - The data to be added to the dataset, if imported from a file.
     */
    onAdd: (datasetName: string, data?: Record<string, unknown>[]) => void;
}

/**
 * Component responsible for rendering a button that allows users to add a new dataset to the Vega specification.
 * @param props - {@link DatasetAddButtonProps}
 */
const DatasetAddButton: React.FC<DatasetAddButtonProps> = (props: DatasetAddButtonProps) => {
    // State to control the visibility of the modal
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>
                Add Dataset
            </Button>
            <DatasetImportModal
                open={visible}
                onCancel={() => setVisible(false)}
                onAdd={props.onAdd}
            />
        </>
    );
};

export default DatasetAddButton;