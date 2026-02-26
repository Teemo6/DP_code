import React from 'react';
import { Tabs } from 'antd';

export type EditorTabKey = 'spec' | 'data' | 'properties';

interface EditorTabSelectorProps {
    activeTab: EditorTabKey;
    onChange: (tabKey: EditorTabKey) => void;
}

const EditorTabSelector: React.FC<EditorTabSelectorProps> = ({ activeTab, onChange }: EditorTabSelectorProps) => {
    const tabItems = [
        {
            key: 'spec',
            label: 'Spec',
        },
        {
            key: 'data',
            label: 'Data',
        },
        {
            key: 'properties',
            label: 'Properties',
        },
    ];

    return (
        <Tabs
            activeKey={activeTab}
            items={tabItems}
            onChange={(key) => onChange(key as EditorTabKey)}
        />
    );
};

export default EditorTabSelector;