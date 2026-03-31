import React, { useMemo } from 'react';
import { Typography, Flex } from 'antd';
import { parseSignals } from './helper/VegaSignal';
import type { VegaSignal } from './helper/VegaSignal';
import { addSignal, deleteSignal, moveSignal, updateSignal } from './helper/EditSignal';
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
    const signals = useMemo(() => parseSignals(props.editorState.code), [props.editorState.code]);

    const handleAddSignal = (name: string) => {
        props.editorState.setCode(addSignal(props.editorState.code, name, ""));
    };

    const handleDeleteSignal = (name: string) => {
        props.editorState.setCode(deleteSignal(props.editorState.code, name));
    };

    const handleMoveSignal = (name: string, direction: 'up' | 'down') => {
        props.editorState.setCode(moveSignal(props.editorState.code, name, direction));
    };

    const handleUpdateSignal = (name: string, value: string) => {
        let parsed: unknown = value;
        try {
            parsed = JSON.parse(value);
        } catch {
            // keep as string
        }
        props.editorState.setCode(updateSignal(props.editorState.code, name, parsed));
    };

    return (
        <Flex vertical gap={16} style={{ width: '100%', padding: 8 }}>
            <Flex justify="space-between" align="center">
                <Typography.Title level={5}>Signals</Typography.Title>
                <SignalAddButton onAdd={handleAddSignal} />
            </Flex>
            {signals.length === 0 ? (
                <Typography.Text type="secondary">No signals found in Vega specification.</Typography.Text>
            ) : (
                signals.map((signal: VegaSignal) => (
                    <SignalEditor
                        key={signal.name}
                        signal={signal}
                        onDeleteSignal={handleDeleteSignal}
                        onMoveSignal={handleMoveSignal}
                        onUpdateSignal={handleUpdateSignal}
                    />
                ))
            )}
        </Flex>
    );
};

export default SignalView;