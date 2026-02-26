import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

interface SpecViewProps {
    code: string;
    onChange: (value: string) => void;
}

const SpecView: React.FC<SpecViewProps> = ({ code, onChange }: SpecViewProps) => {
    return (
        <CodeMirror
            value={code}
            extensions={[json()]}
            onChange={onChange}
        />
    );
};

export default SpecView;