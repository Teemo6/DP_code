import React, { useState, useEffect } from 'react';
import { ConfigProvider, Splitter, Layout, theme } from 'antd';
import defaultSpec from '../json/default.json';
import EditorTab from './editor_tab/EditorTab.tsx';
import SpecLoader from './loader/SpecLoader';
import VegaView from './viewer/VegaView';
import type { VegaEditorProps } from '../types';

const VegaEditor: React.FC<VegaEditorProps> = ({ initialSchema, height, width = '100%' }: VegaEditorProps) => {
    // Access Ant Design theme token
    const { token: antdToken } = theme.useToken();

    // State to hold the current Vega specification code
    const [code, setCode] = useState<string>(() => JSON.stringify(initialSchema ?? defaultSpec, null, 2));

    // Validate that the height prop is provided and is a string
    useEffect(() => {
        if (!height) {
            throw new Error('gui4vega - VegaEditor: prop "height" is required and must be a string (e.g. "600px" or "100vh").');
        }
    }, [height]);

    // Handler for when a new spec is loaded from the SpecLoader component
    const handleSpecLoad = (spec: unknown) => {
        setCode(JSON.stringify(spec, null, 2));
    };

    return (
        <ConfigProvider>
            <Layout style={{ width, height, background: antdToken.colorBgContainer }}>
                <Layout.Header style={{
                    padding: antdToken.padding,
                    background: antdToken.colorBgContainer,
                    lineHeight: 'normal',
                    borderBottom: `1px solid ${antdToken.colorBorderSecondary}`
                }}>
                    <SpecLoader onLoad={handleSpecLoad} />
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