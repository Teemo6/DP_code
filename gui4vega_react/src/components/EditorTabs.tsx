import React from 'react';
import { Tabs } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import DataView from './DataView';

interface EditorTabsProps {
    code: string;
    onChange: (value: string) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({ code, onChange }) => {
    const tabItems = [
        {
            key: 'spec',
            label: 'Spec',
            children: (
                <CodeMirror
                    value={code}
                    height="calc(600px - 54px)"
                    extensions={[json()]}
                    onChange={onChange}
                />
            ),
        },
        {
            key: 'data',
            label: 'Data',
            children: <DataView code={code} />,
        },
    ];

    return (
        <Tabs
            defaultActiveKey="spec"
            items={tabItems}
            style={{ height: '600px' }}
            styles={{ content: { height: 'calc(600px - 46px)', overflow: 'hidden' } }}
        />
    );
};

export default EditorTabs;