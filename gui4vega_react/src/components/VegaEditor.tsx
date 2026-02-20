import React, { useState, useEffect, useRef } from 'react';
import vegaEmbed from 'vega-embed';
import { ConfigProvider } from 'antd';
import defaultSpec from '../json/default.json';
import EditorTabs from './EditorTabs';

const VegaEditor: React.FC = () => {
    const [code, setCode] = useState(JSON.stringify(defaultSpec, null, 2));
    const vegaContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const renderVega = async () => {
            if (!vegaContainerRef.current) return;
            try {
                const spec = JSON.parse(code);
                await vegaEmbed(vegaContainerRef.current, spec, { actions: true });
            } catch (err) {
                console.error('Invalid Vega Spec:', err);
            }
        };
        renderVega();
    }, [code]);

    return (
        <ConfigProvider>
            <div style={{ display: 'flex', height: '600px', gap: 0, backgroundColor: '#f5f5f5' }}>
                <div style={{ width: '50%', height: '100%', overflow: 'hidden' }}>
                    <EditorTabs code={code} onChange={setCode} />
                </div>
                <div style={{ width: '50%', height: '100%', padding: 16, overflow: 'hidden', backgroundColor: '#fff' }}>
                    <div ref={vegaContainerRef} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VegaEditor;