import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface SpecLoaderProps {
    onLoad: (spec: unknown) => void;
}

const SpecLoader: React.FC<SpecLoaderProps> = ({ onLoad }) => {
    const handleFileUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const jsonContent = JSON.parse(content);
                onLoad(jsonContent);
                message.success('JSON specification loaded successfully');
            } catch (err) {
                message.error('Failed to parse JSON file');
                console.error(err);
            }
        };
        reader.readAsText(file);
        return false;
    };

    return (
        <Upload
            beforeUpload={handleFileUpload}
            showUploadList={false}
            accept=".json"
        >
            <Button icon={<UploadOutlined />}>Load JSON Spec</Button>
        </Upload>
    );
};

export default SpecLoader;