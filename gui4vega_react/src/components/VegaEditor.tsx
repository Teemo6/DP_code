import React, { useState, useEffect, useRef } from 'react';
import vegaEmbed from 'vega-embed';
import { ConfigProvider, Alert } from 'antd';
import defaultSpec from '../json/default.json';
import EditorTabs from './EditorTabs';
import SpecLoader from './SpecLoader';

const VegaEditor: React.FC = () => {
    const [code, setCode] = useState(JSON.stringify(defaultSpec, null, 2));
    const [error, setError] = useState<string | null>(null);
    const vegaContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const renderVega = async () => {
            if (!vegaContainerRef.current) return;
            try {
                const spec = JSON.parse(code);
                await vegaEmbed(vegaContainerRef.current, spec, { actions: true });
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            }
        };
        renderVega();
    }, [code]);

    const handleSpecLoad = (spec: unknown) => {
        setCode(JSON.stringify(spec, null, 2));
    };

    return (
        <ConfigProvider>
            <div>
                <SpecLoader onLoad={handleSpecLoad} />
            </div>
            <div style={{ display: 'flex', height: '600px', gap: 0, backgroundColor: '#f5f5f5' }}>
                <div style={{ width: '50%', height: '100%', overflow: 'hidden' }}>
                    <EditorTabs code={code} onChange={setCode} />
                </div>
                <div style={{ width: '50%', height: '100%', padding: 16, overflow: 'hidden', backgroundColor: '#fff' }}>
                    {error && (
                        <Alert
                            type="error"
                            showIcon
                            title="Invalid Vega Specification"
                            description={error}
                            style={{ marginBottom: 16 }}
                        />
                    )}
                    <div
                        ref={vegaContainerRef}
                        style={{ width: '100%', height: '100%', display: error ? 'none' : 'block' }}
                    />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VegaEditor;