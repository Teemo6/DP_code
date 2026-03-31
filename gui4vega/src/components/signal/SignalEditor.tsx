import React, {useMemo} from 'react';
import { Card, Input, Form, InputNumber, Select, Space } from 'antd';
import type { VegaSignal } from './helper/VegaSignal';
import SignalHeader from './SignalHeader';

/**
 * Props for {@link SignalEditor}.
 */
interface SignalEditorProps {
    /**
     * Signal object this editor is cabaple of editing.
     */
    signal: VegaSignal;
    /**
     * Callback function that is called when the user wants to delete the signal.
     * @param signalName - The name of the signal to be deleted.
     */
    onDeleteSignal: (signalName: string) => void;
    /**
     * Callback function that is called when the user wants to move the signal up or down in the list.
     * @param signalName - The name of the signal to be moved.
     * @param direction - The direction to move the signal, either 'up' or 'down'.
     */
    onMoveSignal: (signalName: string, direction: 'up' | 'down') => void;
    /**
     * Callback function that is called when the user wants to update the signal value.
     * @param signalName - The name of the signal to be updated.
     * @param value - The new value of the signal.
     */
    onUpdateSignal: (signalName: string, value: string) => void;
    /**
     * Callback function that is called when the user wants to update the signal bind.
     * @param signalName - The name of the signal to be updated.
     * @param bind - The new string value of the bind.
     */
    onUpdateSignalBind: (signalName: string, bind: Record<string, unknown> | undefined) => void;
}

/**
 * Component responsible for rendering an editor interface for a single signal in a Vega specification.
 * @param props - {@link SignalEditorProps}
 */
const SignalEditor: React.FC<SignalEditorProps> = (props: SignalEditorProps) => {
    // Memo bind property
    const bindObj = useMemo(() => {
        // Signal has no bind property
        if (!props.signal.bind) return {};

        // Attempt to parse bind
        if (typeof props.signal.bind === 'string') {
            try {
                return JSON.parse(props.signal.bind);
            } catch {
                return {};
            }
        } else {
            return props.signal.bind as Record<string, unknown>;
        }
    }, [props.signal.bind]);

    // Handle bind type change
    const updateBindValue = (updates: Record<string, unknown> | undefined) => {
        props.onUpdateSignalBind(props.signal.name, updates);
    }

    // Handle bind type change
    const updateNewBindType = (type: string) => {
        if (!type) {
            props.onUpdateSignalBind(props.signal.name, undefined);
        } else if (type === 'range') {
            props.onUpdateSignalBind(props.signal.name, { input: 'range', min: 0, max: 100, step: 1 });
        }
    };

    return (
        <Card size="small" style={{ marginBottom: 16 }}>
            <SignalHeader
                signalName={props.signal.name}
                onDeleteSignal={props.onDeleteSignal}
                onMoveSignal={props.onMoveSignal}
            />
            <Form layout="vertical" size="small">
                <Form.Item label="Default value">
                    <Input
                        defaultValue={typeof props.signal.value === 'object' ? JSON.stringify(props.signal.value) : String(props.signal.value)}
                        onBlur={(e) => props.onUpdateSignal(props.signal.name, e.target.value)}
                        onPressEnter={(e) => props.onUpdateSignal(props.signal.name, (e.target as HTMLInputElement).value)}
                    />
                </Form.Item>

                <Form.Item label="Bind Type">
                    <Select
                        value={(bindObj.input) || ''}
                        onChange={updateNewBindType}
                        options={[
                            { value: '', label: 'None' },
                            { value: 'range', label: 'Slider' },
                        ]}
                    />
                </Form.Item>

                {bindObj.input === 'range' && (
                    <Space align="start">
                        <Form.Item label="Min">
                            <InputNumber value={bindObj.min} onChange={(min) => updateBindValue({ ...bindObj, min })} />
                        </Form.Item>
                        <Form.Item label="Max">
                            <InputNumber value={bindObj.max} onChange={(max) => updateBindValue({ ...bindObj, max })} />
                        </Form.Item>
                        <Form.Item label="Step">
                            <InputNumber value={bindObj.step} onChange={(step) => updateBindValue({ ...bindObj, step })} />
                        </Form.Item>
                    </Space>
                )}
            </Form>
        </Card>
    );
};

export default SignalEditor;