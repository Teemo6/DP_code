import React from 'react';
import { Layout, Space, theme } from 'antd';
import SpecLoader from './loader/SpecLoader.tsx';
import SelectionExporter from './exporter/SelectionExporter.tsx';

interface ControlsTabProps {
    onLoad: (data: unknown) => void;
    code: string;
    hideImport?: boolean;
    hideExport?: boolean;
}

const ControlsTab: React.FC<ControlsTabProps> = (props: ControlsTabProps) => {
    const { token: antdToken } = theme.useToken();

    return (
        <Layout.Header
            style={{
                padding: antdToken.padding,
                background: antdToken.colorBgContainer,
                lineHeight: 'normal',
                borderBottom: `1px solid ${antdToken.colorBorderSecondary}`,
            }}
        >
            <Space size="middle">
                {!props.hideImport && <SpecLoader onLoad={props.onLoad} />}
                {!props.hideExport && <SelectionExporter code={props.code} />}
            </Space>
        </Layout.Header>
    );
};

export default ControlsTab;