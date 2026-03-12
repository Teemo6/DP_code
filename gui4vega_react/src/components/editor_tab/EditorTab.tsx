import React, { useState } from 'react';
import { Layout } from 'antd';
import EditorTabSelector from './EditorTabSelector';
import EditorTabContent from './EditorTabContent.tsx';
import type { EditorTabKey } from './EditorTabSelector';

/**
 * Props for {@link EditorTab}.
 */
interface EditorTabsProps {
    /**
     * The height of the editor layout.
     */
    height: string;
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
                <EditorTabContent activeTab={activeTab} code={props.code} onChange={props.onChange} />
            </Layout.Content>
        </Layout>
    );
};

export default EditorTab;