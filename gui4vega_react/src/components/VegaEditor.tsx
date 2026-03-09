import { forwardRef, useImperativeHandle} from 'react';
import type { ForwardedRef } from 'react';
import { ConfigProvider, Splitter, Layout, theme } from 'antd';
import EditorTab from './editor_tab/EditorTab.tsx';
import VegaView from './viewer/VegaView.tsx';
import { useVegaEditor } from "./useVegaEditor.ts";
import type { ImportedData } from "./controls/loader/helper/importData.ts";
import ControlsTab from './controls/ControlsTab';

 /**
 * Props for {@link VegaEditor}.
 */
export interface VegaEditorProps {
    /**
     * Required editor container height (e.g. `"700px"`, `"80vh"`).
     */
    height: string;
    /**
     * Optional editor container width (e.g. `"100%"`, `"1200px"`).
     */
    width?: string;
    /**
     * Optional imported payload used to initialize the editor state.
     */
    importedData?: ImportedData;
    /**
     * Hides the controls panel when `true`.
     */
    hideControls?: boolean;
}

/**
 * Imperative handle exposed by {@link VegaEditor}.
 */
export interface VegaEditorRef {
    /**
     * Returns the current Vega spec code/state shown by the editor.
     */
    getCode: () => string;
}

/**
 * Main Vega editor component with split panes for source editing and chart preview.
 *
 * Use a ref with {@link VegaEditorRef} to read the current editor content.
 */
const VegaEditor = forwardRef<VegaEditorRef, VegaEditorProps>((props: VegaEditorProps, ref: ForwardedRef<VegaEditorRef>) => {
    // Access Ant Design theme token
    const { token: antdToken } = theme.useToken();

    // Manage if user somehow bypasses height requirement
    const height = props.height || '700px';

    // Call useVegaEditor hook with unified initialSchema
    const { code, setCode, handleSpecLoad } = useVegaEditor({
        initialSchema: props.importedData,
    });

    // Returns the current Vega spec code. Exposed to parent via ref.
    useImperativeHandle(ref, () => ({
        getCode: (): string => code
    }), [code]);

    return (
        <ConfigProvider>
            <Layout style={{ width: props.width, height: height, background: antdToken.colorBgContainer }}>
                { !props.hideControls && (
                    <ControlsTab onLoad={handleSpecLoad} code={code} />
                )}
                <Layout.Content>
                    <Splitter>
                        <Splitter.Panel defaultSize="50%" min="20%" max="80%">
                            <EditorTab code={code} onChange={setCode} height="100%" />
                        </Splitter.Panel>
                        <Splitter.Panel defaultSize="50%" min="20%" max="80%">
                            <VegaView code={code} hideActions={props.hideControls} />
                        </Splitter.Panel>
                    </Splitter>
                </Layout.Content>
            </Layout>
        </ConfigProvider>
    );
});

export default VegaEditor;