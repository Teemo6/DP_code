import React, { useMemo } from 'react';
import { Form, InputNumber, Select, Space } from 'antd';

/**
 * Props for {@link SignalBindEditor}.
 */
export interface SignalBindEditorProps {
    /**
     * The name of the signal whose bind property is being edited.
     */
    signalName: string;
    /**
     * Bind property of the signal from the Vega specification.
     */
    bind: Record<string, unknown> | string | undefined;
    /**
     * Callback function that is called when the user wants to update the signal bind.
     * @param signalName - The name of the signal to be updated.
     * @param bind - The new bind value, which can be an object or undefined if the bind is removed.
     */
    onUpdateSignalBind: (signalName: string, bind: Record<string, unknown> | undefined) => void;
}

/**
 * Component responsible for rendering an editor interface for the bind property of a signal in a Vega specification.
 * @param props - {@link SignalBindEditorProps}
 */
const SignalBindEditor: React.FC<SignalBindEditorProps> = (props) => {
    // Memo bind property
    const bindObj = useMemo(() => {
        // Signal has no bind property
        if (!props.bind) return {};

        // Attempt to parse bind
        if (typeof props.bind === 'string') {
            try {
                return JSON.parse(props.bind);
            } catch {
                return {};
            }
        } else {
            return props.bind as Record<string, unknown>;
        }
    }, [props.bind]);

    // Handle bind type change
    const updateBindValue = (updates: Record<string, unknown> | undefined) => {
        props.onUpdateSignalBind(props.signalName, updates);
    }

    // Handle bind type change
    const updateNewBindType = (type: string) => {
        if (!type) {
            props.onUpdateSignalBind(props.signalName, undefined);
        } else if (type === 'text') {
            props.onUpdateSignalBind(props.signalName, { input: 'text' });
        } else if (type === 'number') {
            props.onUpdateSignalBind(props.signalName, { input: 'number' });
        } else if (type === 'range') {
            props.onUpdateSignalBind(props.signalName, { input: 'range', min: 0, max: 100, step: 1 });
        } else if (type === 'radio') {
            props.onUpdateSignalBind(props.signalName, { input: 'radio', options: bindObj.options || [] });
        } else if (type === 'select') {
            props.onUpdateSignalBind(props.signalName, { input: 'select', options: bindObj.options || [] });
        } else if (type === 'checkbox') {
            props.onUpdateSignalBind(props.signalName, { input: 'checkbox' });
        } else if (type === 'color') {
            props.onUpdateSignalBind(props.signalName, { input: 'color' });
        } else if (type === 'date') {
            props.onUpdateSignalBind(props.signalName, { input: 'date' });
        }
    };

    return (
        <>
            <Form.Item label="Bind Type">
                <Select
                    value={(bindObj.input) || ''}
                    onChange={updateNewBindType}
                    options={[
                        { value: '', label: 'None' },
                        { value: 'text', label: 'Text' },
                        { value: 'number', label: 'Number' },
                        { value: 'range', label: 'Slider' },
                        { value: 'radio', label: 'Radio' },
                        { value: 'select', label: 'Select' },
                        { value: 'checkbox', label: 'Checkbox' },
                        { value: 'color', label: 'Color' },
                        { value: 'date', label: 'Date' },
                    ]}
                />
            </Form.Item>

            {bindObj.input === 'range' && (
                <Space align="start">
                    <Form.Item label="Min">
                        <InputNumber value={bindObj.min as number} onChange={(min) => updateBindValue({ ...bindObj, min })} />
                    </Form.Item>
                    <Form.Item label="Max">
                        <InputNumber value={bindObj.max as number} onChange={(max) => updateBindValue({ ...bindObj, max })} />
                    </Form.Item>
                    <Form.Item label="Step">
                        <InputNumber value={bindObj.step as number} onChange={(step) => updateBindValue({ ...bindObj, step })} />
                    </Form.Item>
                </Space>
            )}

            {['radio', 'select'].includes(bindObj.input) && (
                <Form.Item label="Options">
                    <Select
                        mode="tags"
                        placeholder="Type an option and press Enter"
                        value={(bindObj.options) || []}
                        onChange={(newOptions) => updateBindValue({ ...bindObj, options: newOptions })}
                    />
                </Form.Item>
            )}
        </>
    );
};

export default SignalBindEditor;