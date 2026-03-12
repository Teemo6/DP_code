import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeLight, vscodeDark } from '@uiw/codemirror-theme-vscode';
import { theme } from 'antd';

/**
 * Props for {@link SpecView}.
 */
interface SpecViewProps {
    /**
     * The Vega specification code to display and edit in the CodeMirror editor.
     */
    code: string;
    /**
     * Callback function that is called whenever the content of the CodeMirror editor changes.
     * @param value - The updated Vega specification code from the editor.
     */
    onChange: (value: string) => void;
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
            value={props.code}
            extensions={[json()]}
            onChange={props.onChange}
            theme={isDarkMode ? vscodeDark : vscodeLight}
        />
    );
};

export default SpecView;