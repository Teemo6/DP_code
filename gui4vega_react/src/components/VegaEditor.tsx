import { forwardRef, useImperativeHandle} from 'react';
import type { ForwardedRef } from 'react';
import { ConfigProvider, Splitter, Layout, theme } from 'antd';
import EditorTab from './editor_tab/EditorTab.tsx';
import VegaView from './viewer/VegaView.tsx';
import { useVegaEditor } from "./useVegaEditor.ts";
import type { ImportedData } from "./controls/loader/helper/importData.ts";
import ControlsTab from './controls/ControlsTab';
import { normalizeHideControls, isControlsTabShown } from './HideControls.ts';
import type { HideControls } from "./HideControls.ts";
import { overrideTheme } from './overrideTheme.ts';

/**
 * Props for {@link VegaEditor}.
 */
export interface VegaEditorProps {
    /**
     * Required editor container height.
     * Expects CSS value, for example `"700px"` or `"80vh"`.
     */
    height: string;
    /**
     * Optional editor container width.
     * Expects CSS value, for example `"100%"` or `"1200px"`.
     */
    width?: string;
    /**
     * Optional imported data used to initialize the editor state.
     * If not provided, the editor will initialize with a default Vega spec.
     */
    importedData?: ImportedData;
    /**
     * Hides all control butons when `true`.
     * Object specifies which controls to hide individually.
     */
    hideControls?: boolean | HideControls;
    /**
     * Optional editor color theme mode.
     * - `light` forces Ant Design light algorithm.
     * - `dark` forces Ant Design dark algorithm.
     * - `auto` keeps the inherited default token behavior.
     * @defaultValue 'auto'
     */
    theme?: 'light' | 'dark' | 'auto';
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

    // Call useVegaEditor hook
    const editorState = useVegaEditor({
        importedData: props.importedData,
    });

    // Returns the current Vega spec code. Exposed to parent via ref.
    useImperativeHandle(ref, () => ({
        getCode: (): string => editorState.code
    }), [editorState.code]);

    // Manage if user somehow bypasses height requirement
    const height = props.height || '700px';

    // Determine theme mode, defaulting to 'auto'
    const themeMode = props.theme ?? 'auto';

    // Normalize hideControls prop
    const hideControlsObj = normalizeHideControls(props.hideControls);

    return (
        <ConfigProvider theme={overrideTheme(antdToken, themeMode)}>
            <Layout style={{ width: props.width, height: height }}>
                { isControlsTabShown(hideControlsObj) && (
                    <ControlsTab
                        editorState={editorState}
                        hideImport={!!hideControlsObj.import}
                        hideExport={!!hideControlsObj.export}
                    />
                )}
                <Layout.Content>
                    <Splitter>
                        <Splitter.Panel defaultSize="50%" min="20%" max="80%">
                            <EditorTab editorState={editorState} height="100%" />
                        </Splitter.Panel>
                        <Splitter.Panel defaultSize="50%" min="20%" max="80%">
                            <VegaView editorState={editorState} hideActions={!!hideControlsObj.view} />
                        </Splitter.Panel>
                    </Splitter>
                </Layout.Content>
            </Layout>
        </ConfigProvider>
    );
});

export default VegaEditor;