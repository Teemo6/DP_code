import React, { useState } from 'react';
import { Input } from 'antd';

interface EditableCellProps {
    value: unknown;
    onSave: (val: unknown) => void;
}

function toDisplay(value: unknown): string {
    return value !== null && typeof value === 'object'
        ? JSON.stringify(value)
        : String(value ?? '');
}

function coerce(raw: string): unknown {
    return raw.trim() !== '' && !isNaN(Number(raw)) ? Number(raw) : raw;
}

const EditableCell: React.FC<EditableCellProps> = ({ value, onSave }) => {
    const display = toDisplay(value);
    const [editing, setEditing] = useState(false);
    const [inputVal, setInputVal] = useState(display);

    const save = () => {
        setEditing(false);
        onSave(coerce(inputVal));
    };

    if (editing) {
        return (
            <Input
                autoFocus
                size="small"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onBlur={save}
                onPressEnter={save}
                style={{ minWidth: 80 }}
            />
        );
    }

    return (
        <span
            onClick={() => { setInputVal(display); setEditing(true); }}
            style={{ cursor: 'pointer', display: 'block', minWidth: 80 }}
            title="Click to edit"
        >
            {display}
        </span>
    );
};

export default EditableCell;