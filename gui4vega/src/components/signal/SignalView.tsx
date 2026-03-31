import React, { useMemo } from 'react';
import {Typography, Flex, message} from 'antd';
import { parseSignals } from './helper/VegaSignal';
import type { VegaSignal } from './helper/VegaSignal';
import { addSignal, deleteSignal, moveSignal, updateSignal, updateSignalBind } from './helper/EditSignal';
import type { VegaEditorState } from "../useVegaEditor.ts";
import SignalEditor from './SignalEditor';
import SignalAddButton from './button/SignalAddButton.tsx';

/**
 * Props for {@link SignalView}.
 */
interface SignalViewProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

/**
 * Component responsible for displaying and managing the signals defined in the Vega specification.
 * @param props - {@link SignalViewProps}
 */
const SignalView: React.FC<SignalViewProps> = (props) => {
    // Parse signals from spec with code memo
    const signals = useMemo(() => parseSignals(props.editorState.code), [props.editorState.code]);

    // Add signal handler
    const handleAddSignal = (signalName: string) => {
        const trimmed = signalName.trim();
        if (!trimmed) {
            message.error('Dataset name cannot be empty.');
            return;
        }
        if (signals.some(s => s.name === trimmed)) {
            message.error('Dataset name already exists.');
            return;
        }

        props.editorState.setCode(addSignal(props.editorState.code, signalName, ""));
    };

    // Delete signal handler
    const handleDeleteSignal = (signalName: string) => {
        props.editorState.setCode(deleteSignal(props.editorState.code, signalName));
    };

    // Move signal handler
    const handleMoveSignal = (signalName: string, direction: 'up' | 'down') => {
        props.editorState.setCode(moveSignal(props.editorState.code, signalName, direction));
    };

    // Update signal handler
    const handleUpdateSignal = (signalName: string, value: string) => {
        let parsed: unknown = value;
        try {
            parsed = JSON.parse(value);
        } catch {
            // keep as string
        }
        props.editorState.setCode(updateSignal(props.editorState.code, signalName, parsed));
    };

    // Update signal bind handler
    const handleUpdateSignalBind = (name: string, bind: Record<string, unknown> | undefined) => {
        props.editorState.setCode(updateSignalBind(props.editorState.code, name, bind));
    };

    return (
        <Flex vertical style={{ width: '100%', padding: 8, overflow: 'auto' }}>
            <Flex justify="space-between" align="center">
                <Typography.Title level={5}>Signals</Typography.Title>
                <SignalAddButton onAdd={handleAddSignal} />
            </Flex>
            {signals.length === 0 ? (
                <Typography.Text type="secondary">No signals found in Vega specification.</Typography.Text>
            ) : (
                signals.map((signal: VegaSignal) => (
                    <SignalEditor
                        signal={signal}
                        onDeleteSignal={handleDeleteSignal}
                        onMoveSignal={handleMoveSignal}
                        onUpdateSignal={handleUpdateSignal}
                        onUpdateSignalBind={handleUpdateSignalBind}
                    />
                ))
            )}
        </Flex>
    );
};

export default SignalView;