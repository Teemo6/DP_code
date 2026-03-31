import React from 'react';
import { Button, Modal } from 'antd';

/**
 * Props for {@link SignalDeleteButton}.
 */
interface SignalDeleteButtonProps {
    /**
     * The name of the signal to be deleted.
     */
    signalName: string;
    /**
     * Callback function that is called when the delete action is triggered.
     * @param signalName - The name of the signal to be deleted.
     */
    onDelete: (signalName: string) => void;
}

/**
 * Component responsible for rendering a delete button for a signal in the signal view.
 * @param props - {@link SignalDeleteButtonProps}
 */
const SignalDeleteButton: React.FC<SignalDeleteButtonProps> = (props: SignalDeleteButtonProps) => {
    // Show a confirmation before deleting the signal
    const handleClick = () => {
        Modal.confirm({
            title: `Delete signal "${props.signalName}"?`,
            content: 'This will remove the signal entirely. This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => props.onDelete(props.signalName),
        });
    };

    return (
        <Button danger size="small" onClick={handleClick}>
            Delete
        </Button>
    );
};

export default SignalDeleteButton;