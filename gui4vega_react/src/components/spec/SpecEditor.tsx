import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

interface SpecEditorProps {
    code: string;
    onChange: (value: string) => void;
}

const SpecEditor: React.FC<SpecEditorProps> = ({ code, onChange }: SpecEditorProps) => {
    return (
        <CodeMirror
            value={code}
            height={'100%'}
            extensions={[json()]}
            onChange={onChange}
        />
    );
};

export default SpecEditor;