import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeLight, vscodeDark } from '@uiw/codemirror-theme-vscode';
import { theme } from 'antd';
import type { VegaEditorState } from "../useVegaEditor.ts";

/**
 * Props for {@link SpecView}.
 */
interface SpecViewProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

/**
 * Component responsible for rendering the CodeMirror editor for editing the Vega specification code.
 * @param props - {@link SpecViewProps}
 */
const SpecView: React.FC<SpecViewProps> = (props: SpecViewProps) => {
    // Access Ant Design theme token
    const { token } = theme.useToken();

    // Do the best to determine if theme is dark
    const isDarkMode = token.colorBgContainer === '#141414' ||
        token.colorTextBase === '#fff' ||
        token.colorBgBase.includes('0, 0, 0');

    return (
        <CodeMirror
            value={props.editorState.code}
            onChange={props.editorState.setCode}
            extensions={[json()]}
            theme={isDarkMode ? vscodeDark : vscodeLight}
        />
    );
};

export default SpecView;