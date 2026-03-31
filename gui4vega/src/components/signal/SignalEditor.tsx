import React from 'react';
import { Card, Input, Form } from 'antd';
import type { VegaSignal } from './helper/VegaSignal';
import SignalHeader from './SignalHeader';
import SignalBindEditor from './SignalBindEditor';

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
    return (
        <Card size="small" style={{ marginBottom: 16 }}>
            <SignalHeader
                signalName={props.signal.name}
                onDeleteSignal={props.onDeleteSignal}
                onMoveSignal={props.onMoveSignal}
            />
            <Form layout="vertical" size="small">
                <Form.Item label="Value">
                    <Input
                        defaultValue={typeof props.signal.value === 'object' ? JSON.stringify(props.signal.value) : String(props.signal.value)}
                        onBlur={(e) => props.onUpdateSignal(props.signal.name, e.target.value)}
                        onPressEnter={(e) => props.onUpdateSignal(props.signal.name, (e.target as HTMLInputElement).value)}
                    />
                </Form.Item>

                <SignalBindEditor
                    signalName={props.signal.name}
                    bind={props.signal.bind as Record<string, unknown> | string | undefined}
                    onUpdateSignalBind={props.onUpdateSignalBind}
                />
            </Form>
        </Card>
    );
};

export default SignalEditor;