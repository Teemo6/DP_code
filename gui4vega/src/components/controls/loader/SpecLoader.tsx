import React from 'react';
import { Upload, Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { gui4VegaLogger } from '../../../logger';
import type { VegaEditorState } from "../../useVegaEditor.ts";

/**
 * Props for {@link SpecLoader}.
 */
interface SpecLoaderProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

/**
 * Component responsible for rendering a file upload button to load a Vega specification from a JSON file.
 * @param props - {@link SpecLoaderProps}
 */
const SpecLoader: React.FC<SpecLoaderProps> = (props: SpecLoaderProps) => {
    // State to hold message visibility
    const [messageApi, contextHolder] = message.useMessage();

    const handleFileUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            try {
                JSON.parse(content);
                props.editorState.setCode(content);
                messageApi.success('JSON specification loaded successfully');
            } catch (err) {
                messageApi.error('Failed to parse JSON file');
                gui4VegaLogger.error('Failed to parse JSON file: ', err);
            }
        };
        reader.readAsText(file);
        return false;
    };

    return (
        <>
            {contextHolder}
            <Upload beforeUpload={handleFileUpload} showUploadList={false} accept=".json">
                <Button icon={<DownloadOutlined />}>
                    Load JSON Specification
                </Button>
            </Upload>
        </>
    );
};

export default SpecLoader;