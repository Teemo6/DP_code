import React from 'react';
import { Typography, Flex, Space, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import SignalDeleteButton from './button/SignalDeleteButton';

const { Text } = Typography;

/**
 * Props for {@link SignalHeader}.
 */
interface SignalHeaderProps {
    /**
     * The name of the signal to be displayed in the header.
     */
    signalName: string;
    /**
     * Callback function invoked when the user clicks the delete button to remove the signal.
     * @param signalName - The name of the signal to be deleted.
     */
    onDeleteSignal: (signalName: string) => void;
    /**
     * Callback function invoked when the user clicks the move up or move down buttons.
     * @param signalName - The name of the signal to be moved.
     * @param direction - The direction to move the signal, either 'up' or 'down'.
     */
    onMoveSignal: (signalName: string, direction: 'up' | 'down') => void;
    /**
     * Boolean indicating whether the signal form editor is currently visible.
     */
    formVisible: boolean;
    /**
     * Callback function invoked when the user clicks the toggle button to show or hide the signal form editor.
     */
    onToggleForm: () => void;
}

/**
 * Component responsible for rendering the header section of a signal editor.
 * @param props - {@link SignalHeaderProps}
 */
const SignalHeader: React.FC<SignalHeaderProps> = (props: SignalHeaderProps) => {
    return (
        <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
            <Space>
                <Flex vertical align="center">
                    <Button
                        icon={<UpOutlined />}
                        onClick={() => props.onMoveSignal(props.signalName, 'up')}
                        size="small"
                        type="text"
                        title="Move up"
                    />
                    <Button
                        icon={<DownOutlined />}
                        onClick={() => props.onMoveSignal(props.signalName, 'down')}
                        size="small"
                        type="text"
                        title="Move down"
                    />
                </Flex>
                <Text strong style={{ fontSize: 16 }}>
                    {props.signalName}
                </Text>
                <Button
                    icon={props.formVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    onClick={props.onToggleForm}
                    size="small"
                    type="text"
                />
            </Space>
            <SignalDeleteButton
                signalName={props.signalName}
                onDelete={props.onDeleteSignal}
            />
        </Flex>
    );
};

export default SignalHeader;