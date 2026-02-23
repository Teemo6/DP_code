import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import defaultSpec from '../json/default.json';
import EditorTabs from './EditorTabs';
import SpecLoader from './SpecLoader';
import VegaView from './VegaView';

const VegaEditor: React.FC = () => {
    const [code, setCode] = useState(JSON.stringify(defaultSpec, null, 2));

    const handleSpecLoad = (spec: unknown) => {
        setCode(JSON.stringify(spec, null, 2));
    };

    return (
        <ConfigProvider>
            <div>
                <SpecLoader onLoad={handleSpecLoad} />
            </div>
            <div style={{ display: 'flex', height: '600px', overflow: 'hidden', backgroundColor: '#fff' }}>
                <div style={{ width: '50%' }}>
                    <EditorTabs code={code} onChange={setCode} />
                </div>
                <div style={{ width: '50%' }}>
                    <VegaView code={code} />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VegaEditor;