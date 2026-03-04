import { forwardRef, useImperativeHandle} from 'react';
import type { ForwardedRef } from 'react';
import { ConfigProvider, Splitter, Layout, Space, theme } from 'antd';
import EditorTab from './editor_tab/EditorTab.tsx';
import SpecLoader from './loader/SpecLoader.tsx';
import VegaView from './viewer/VegaView.tsx';
import SelectionExporter from './exporter/SelectionExporter.tsx';
import { useVegaEditor } from "./useVegaEditor.ts";
import type { ImportedData } from "./loader/helper/importData.ts";

export interface VegaEditorProps {
    height: string;
    width?: string;
    importedData?: ImportedData;
}

// Define the type for the imperative handle
export interface VegaEditorRef {
    getCode: () => unknown;
}

const VegaEditor = forwardRef<VegaEditorRef, VegaEditorProps>((props: VegaEditorProps, ref: ForwardedRef<VegaEditorRef>) => {
    // Access Ant Design theme token
    const { token: antdToken } = theme.useToken();

    // Manage if user somehow bypasses height requirement
    const height = props.height || '700px';

    // Call useVegaEditor hook with unified initialSchema
    const { code, setCode, handleSpecLoad } = useVegaEditor({
        initialSchema: props.importedData,
    });

    // Returns the current Vega spec code. Exposed to parent via ref.
    useImperativeHandle(ref, () => ({
        getCode: () => code
    }), [code]);

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
                        <SelectionExporter code={code} />
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
});

export default VegaEditor;