import React from 'react';
import SpecView from '../spec/SpecView.tsx';
import DataView from '../data/DataView';
import PropertiesView from '../properties/PropertiesView';
import WizardView from '../wizard/WizardView.tsx';
import SignalView from '../signal/SignalView.tsx';
import type { EditorTabKey } from './EditorTabSelector';
import type { VegaEditorState } from "../useVegaEditor.ts";

/**
 * Props for {@link EditorTabContent}.
 */
interface EditorContentProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
    /**
     * The key of the currently active tab in the editor.
     */
    activeTab: EditorTabKey;
}

/**
 * Component responsible for rendering the content of the currently active tab in the editor interface.
 * @param props - {@link EditorContentProps}
 */
const EditorTabContent: React.FC<EditorContentProps> = (props: EditorContentProps) => {
    switch (props.activeTab) {
        case 'spec':
            return <SpecView editorState={props.editorState} />;
        case 'data':
            return <DataView editorState={props.editorState} />;
        case 'signals':
            return <SignalView editorState={props.editorState} />;
        case 'properties':
            return <PropertiesView editorState={props.editorState} />;
        case 'wizard':
            return <WizardView editorState={props.editorState} />;
        default:
            return null;
    }
};

export default EditorTabContent;