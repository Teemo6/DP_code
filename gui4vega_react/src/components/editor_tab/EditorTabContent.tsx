import React from 'react';
import SpecView from '../spec/SpecView.tsx';
import DataView from '../data/DataView';
import PropertiesView from '../properties/PropertiesView';
import type { EditorTabKey } from './EditorTabSelector';

interface EditorContentProps {
    activeTab: EditorTabKey;
    code: string;
    onChange: (value: string) => void;
}

const EditorTabContent: React.FC<EditorContentProps> = ({ activeTab, code, onChange }: EditorContentProps) => {
    switch (activeTab) {
        case 'spec':
            return <SpecView code={code} onChange={onChange} />;
        case 'data':
            return <DataView code={code} onCodeChange={onChange} />;
        case 'properties':
            return <PropertiesView code={code} onCodeChange={onChange} />;
        default:
            return null;
    }
};

export default EditorTabContent;