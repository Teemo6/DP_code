import React, { useState } from 'react';
import { Layout } from 'antd';
import EditorTabSelector from './EditorTabSelector';
import EditorTabContent from './EditorTabContent.tsx';
import type { EditorTabKey } from './EditorTabSelector';
import type { VegaEditorState } from "../useVegaEditor.ts";

/**
 * Props for {@link EditorTab}.
 */
interface EditorTabsProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
    /**
     * The height of the editor layout.
     */
    height: string;
}

/**
 * Component responsible for rendering the editor interface with predefined tabs.
 * @param props - {@link EditorTabsProps}
 */
const EditorTab: React.FC<EditorTabsProps> = (props) => {
    // State to track the active tab
    const [activeTab, setActiveTab] = useState<EditorTabKey>('spec');

    return (
        <Layout style={{ height: props.height }}>
            <Layout.Header>
                <EditorTabSelector activeTab={activeTab} onChange={setActiveTab} />
            </Layout.Header>

            { /* Overflow needs to be 'auto', otherwise whole layout with the tabs part will scroll with the content */ }
            <Layout.Content style={{ overflow: 'auto' }}>
                <EditorTabContent activeTab={activeTab} editorState={props.editorState} />
            </Layout.Content>
        </Layout>
    );
};

export default EditorTab;