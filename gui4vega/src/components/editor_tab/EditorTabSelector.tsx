import React from 'react';
import { Tabs } from 'antd';

/**
 * Defines the possible keys for the editor tabs. Each key corresponds to a specific tab in the editor interface:
 * - 'spec': The tab for editing the Vega specification code.
 * - 'data': The tab for managing the data sources used in the Vega visualization.
 * - 'properties': The tab for editing properties of marks and encodings in the Vega specification.
 * - 'wizard': The tab for generating visualizations using a wizard.
 */
export type EditorTabKey = 'spec' | 'data' | 'properties' | 'wizard';

/**
 * Props for {@link EditorTabSelector}.
 */
interface EditorTabSelectorProps {
    /**
     * The key of the currently active tab in the editor.
     * Determines which tab is highlighted as active in the UI.
     */
    activeTab: EditorTabKey;
    /**
     * Callback function that is called when the user selects a different tab in the editor.
     * @param tabKey - The key of the newly selected tab, {@link EditorTabKey}.
     */
    onChange: (tabKey: EditorTabKey) => void;
}

/**
 * Component responsible for rendering the tab selector in the editor interface.
 * @param props - {@link EditorTabSelectorProps}
 */
const EditorTabSelector: React.FC<EditorTabSelectorProps> = (props: EditorTabSelectorProps) => {
    // Define the tab items for the Tabs component.
    const tabItems = [
        {
            key: 'spec',
            label: 'Specification',
        },
        {
            key: 'data',
            label: 'Data',
        },
        {
            key: 'properties',
            label: 'Properties',
        },
        {
            key: 'wizard',
            label: 'Wizard',
        },
    ];

    return (
        <Tabs
            activeKey={props.activeTab}
            items={tabItems}
            onChange={(key) => props.onChange(key as EditorTabKey)}
        />
    );
};

export default EditorTabSelector;