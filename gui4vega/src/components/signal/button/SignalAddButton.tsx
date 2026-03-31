import React, { useState } from 'react';
import { Button } from 'antd';
import SignalAddModal from './SignalAddModal.tsx';

/**
 * Props for {@link SignalAddButton}.
 */
interface SignalAddButtonProps {
    /**
     * Callback function that is called when a new signal is added.
     * @param signalName - The name of the new signal to be added.
     */
    onAdd: (signalName: string) => void;
}

/**
 * Component responsible for rendering a button that allows users to add a new signal to the Vega specification.
 * @param props - {@link SignalAddButtonProps}
 */
const SignalAddButton: React.FC<SignalAddButtonProps> = (props: SignalAddButtonProps) => {
    // State to control the visibility of the modal
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>
                Add Signal
            </Button>
            <SignalAddModal
                open={visible}
                onCancel={() => setVisible(false)}
                onAdd={props.onAdd}
            />
        </>
    );
};

export default SignalAddButton;