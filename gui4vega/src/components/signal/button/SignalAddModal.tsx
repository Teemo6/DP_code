import React from 'react';
import { Modal, Input, Form } from 'antd';
import { gui4VegaLogger } from "../../../logger.ts";

/**
 * Props for {@link SignalAddModal}.
 */
interface SignalAddModalProps {
    /**
     * Boolean flag to control the visibility of the modal.
     */
    open: boolean;
    /**
     * Callback function that is called when the modal is closed without adding a signal.
     */
    onCancel: () => void;
    /**
     * Callback function that is called when a new signal is added.
     * @param signalName - The name of the new signal to be added.
     */
    onAdd: (signalName: string) => void;
}

/**
 * Component responsible for rendering a modal that allows users to add a new signal.
 * @param props - {@link SignalAddModalProps}
 */
const SignalAddModal: React.FC<SignalAddModalProps> = (props: SignalAddModalProps) => {
    // State to track the form
    const [form] = Form.useForm();

    // Reset state and call onCancel when modal is closed
    const handleCancel = () => {
        form.resetFields();
        props.onCancel();
    };

    // Validate form and call onAdd, then reset state
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            props.onAdd(values.signalName);
            handleCancel();
        } catch {
            gui4VegaLogger.error('Signal add validation failed');
        }
    };

    return (
        <Modal
            title="Add New Signal"
            open={props.open}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Add"
            destroyOnHidden
        >
            <Form form={form} layout="vertical">
                <Form.Item name="signalName" label="Signal Name" rules={[{ required: true }]}>
                    <Input autoFocus placeholder="Enter name" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SignalAddModal;