import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import vegaEmbed from 'vega-embed';
import defaultSpec from "../json/default.json";

const VegaEditor: React.FC = () => {
    const [code, setCode] = useState(JSON.stringify(defaultSpec, null, 2));
    const vegaContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const renderVega = async () => {
            if (!vegaContainerRef.current) return;

            try {
                const spec = JSON.parse(code);
                // Show export menu
                await vegaEmbed(vegaContainerRef.current, spec, {
                    actions: true
                });
            } catch (err) {
                console.error("Invalid Vega Spec:", err);
            }
        };

        renderVega();
    }, [code]);

    return (
        <div style={{ display: 'flex', height: '100vh', gap: '10px', padding: '10px', backgroundColor: '#282c34' }}>
            <div style={{ flex: 1, overflow: 'auto', border: '1px solid #444' }}>
                <CodeMirror
                    value={code}
                    height="100%"
                    extensions={[json()]}
                    theme={oneDark}
                    onChange={(value) => setCode(value)}
                />
            </div>
            <div
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    padding: '20px',
                    overflow: 'hidden'
                }}
            >
                <div ref={vegaContainerRef} style={{ width: '100%', height: '100%' }} />
            </div>
        </div>
    );
};

export default VegaEditor;