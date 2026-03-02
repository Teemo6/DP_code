import React from 'react';
import { ConfigProvider, Splitter, Layout, Space, theme } from 'antd';
import EditorTab from './editor_tab/EditorTab.tsx';
import SpecLoader from './loader/SpecLoader.tsx';
import VegaView from './viewer/VegaView.tsx';
import SpecExporter from './exporter/SpecExporter.tsx';
import type { ExportedData } from "./exporter/helper/exportSelectedData.ts";
import type { VegaDataset } from './data/helper/datasetEdit.ts';
import type { VegaSignal } from './signal/helper/signalEdit.ts';
import { useVegaEditor } from "./useVegaEditor.ts";

export interface VegaEditorProps {
    height: string;
    width?: string;
    initialSchema?: Record<string, unknown>;
    initialDatasets?: VegaDataset[];
    initialSignals?: VegaSignal[];
    onExport?: (data: ExportedData) => void;
}

const VegaEditor: React.FC<VegaEditorProps> = (props: VegaEditorProps) => {
    // Access Ant Design theme token
    const { token: antdToken } = theme.useToken();

    // Manage if user somehow bypasses height requirement
    const height = props.height || '700px';

    // Call useVegaEditor hook
    const { code, setCode, handleSpecLoad } = useVegaEditor({
        initialSchema: props.initialSchema,
        initialDatasets: props.initialDatasets,
        initialSignals: props.initialSignals,
    });

    return (
        <ConfigProvider>
            <Layout style={{ width: props.width, height: height, background: antdToken.colorBgContainer }}>
                <Layout.Header style={{
                    padding: antdToken.padding,
                    background: antdToken.colorBgContainer,
                    lineHeight: 'normal',
                    borderBottom: `1px solid ${antdToken.colorBorderSecondary}`
                }}>
                    <Space size="middle">
                        <SpecLoader onLoad={handleSpecLoad} />
                        <SpecExporter code={code} onExport={props.onExport} />
                    </Space>
                </Layout.Header>
                <Layout.Content>
                    <Splitter>
                        <Splitter.Panel defaultSize="50%" min="20%" max="80%">
                            <EditorTab code={code} onChange={setCode} height="100%" />
                        </Splitter.Panel>
                        <Splitter.Panel defaultSize="50%" min="20%" max="80%">
                            <VegaView code={code} />
                        </Splitter.Panel>
                    </Splitter>
                </Layout.Content>
            </Layout>
        </ConfigProvider>
    );
};

export default VegaEditor;