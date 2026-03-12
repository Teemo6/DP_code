import React from 'react';
import SpecView from '../spec/SpecView.tsx';
import DataView from '../data/DataView';
import PropertiesView from '../properties/PropertiesView';
import type { EditorTabKey } from './EditorTabSelector';

/**
 * Props for {@link EditorTabContent}.
 */
interface EditorContentProps {
    /**
     * The key of the currently active tab in the editor.
     */
    activeTab: EditorTabKey;
    /**
     * The Vega specification code that is being edited in the editor.
     */
    code: string;
    /**
     * Callback function that is called whenever the content of the editor changes in any of the tabs.
     * @param value - The updated Vega specification code from the editor.
     */
    onChange: (value: string) => void;
}

/**
 * Component responsible for rendering the content of the currently active tab in the editor interface.
 * @param props - {@link EditorContentProps}
 */
const EditorTabContent: React.FC<EditorContentProps> = (props: EditorContentProps) => {
    switch (props.activeTab) {
        case 'spec':
            return <SpecView code={props.code} onChange={props.onChange} />;
        case 'data':
            return <DataView code={props.code} onCodeChange={props.onChange} />;
        case 'properties':
            return <PropertiesView code={props.code} onCodeChange={props.onChange} />;
        default:
            return null;
    }
};

export default EditorTabContent;