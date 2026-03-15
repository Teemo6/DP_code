import React from 'react';
import { Layout, Space, theme } from 'antd';
import SpecLoader from './loader/SpecLoader.tsx';
import SelectionExporter from './exporter/SelectionExporter.tsx';
import type { VegaEditorState } from "../useVegaEditor.ts";

/**
 * Props for {@link ControlsTab}.
 */
interface ControlsTabProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
    /**
     * Optional flag to hide the import controls.
     */
    hideImport?: boolean;
    /**
     * Optional flag to hide the export controls.
     */
    hideExport?: boolean;
}

/**
 * Component responsible for rendering the controls tab in the editor interface.
 * @param props - {@link ControlsTabProps}
 */
const ControlsTab: React.FC<ControlsTabProps> = (props: ControlsTabProps) => {
    const { token: antdToken } = theme.useToken();

    return (
        <Layout.Header
            style={{
                padding: antdToken.padding,
                lineHeight: 'normal',
                borderBottom: `1px solid ${antdToken.colorBorderSecondary}`,
            }}
        >
            <Space size="middle">
                {!props.hideImport && <SpecLoader editorState={props.editorState} />}
                {!props.hideExport && <SelectionExporter editorState={props.editorState} />}
            </Space>
        </Layout.Header>
    );
};

export default ControlsTab;