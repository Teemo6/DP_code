import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import defaultSpec from '../json/default.json';
import EditorTabs from './EditorTabs';
import SpecLoader from './SpecLoader';
import VegaView from './VegaView';
import type { VegaEditorProps } from '../types';

const VegaEditor: React.FC<VegaEditorProps> = ({ initialSchema, height, width = '100%' }) => {
    useEffect(() => {
        if (!height) {
            throw new Error('gui4vega - VegaEditor: prop "height" is required and must be a string (e.g. "600px" or "100vh").');
        }
    }, [height]);

    const [code, setCode] = useState<string>(() => JSON.stringify(initialSchema ?? defaultSpec, null, 2));

    const handleSpecLoad = (spec: unknown) => {
        setCode(JSON.stringify(spec, null, 2));
    };

    return (
        <ConfigProvider>
            <div style={{ width }}>
                <div>
                    <SpecLoader onLoad={handleSpecLoad} />
                </div>
                <div style={{ height, display: 'flex', overflow: 'hidden', backgroundColor: '#fff' }}>
                    <div style={{ width: '50%' }}>
                        <EditorTabs code={code} onChange={setCode} />
                    </div>
                    <div style={{ width: '50%' }}>
                        <VegaView code={code} />
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VegaEditor;