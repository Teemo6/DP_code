import React, { useMemo, useState } from 'react';
import { Typography } from 'antd';
import { parseValue } from "./helper/ParseValue.ts";

const { Text } = Typography;

/**
 * Props for {@link EditableCell}.
 */
interface EditableCellProps {
    /**
     * The value to be displayed and edited in the cell.
     */
    value: unknown;
    /**
     * Callback function invoked when the user saves a new value for the cell.
     * @param val - The new value entered by the user, parsed to the correct type.
     */
    onSave: (val: unknown) => void;
}

/**
 * Component responsible for rendering an editable cell in the data table.
 * Displays the current value and allows users to click and edit it.
 * @param props - {@link EditableCellProps}
 */
const EditableCell: React.FC<EditableCellProps> = (props) => {
    // Whether the cell is being edited
    const [isEditing, setIsEditing] = useState(false);

    // Memoize display string to prevent unnecessary recalculations
    const display = useMemo(() => {
        if (props.value === null || props.value === undefined) return '';
        return typeof props.value === 'object' ? JSON.stringify(props.value) : String(props.value);
    }, [props.value]);

    // Maximum number of characters to display in the cell
    const MAX_DISPLAY_LENGTH = 20;

    // Handle saving the new value
    const handleSave = (val: string) => {
        props.onSave(parseValue(val));
        setIsEditing(false);
    };

    return (
        <Text
            style={{ cursor: 'pointer', display: 'block' }}
            ellipsis={display.length > MAX_DISPLAY_LENGTH ? { tooltip: display } : false}
            editable={{
                editing: isEditing,
                onStart: () => setIsEditing(true),
                onChange: handleSave,
                onCancel: () => setIsEditing(false),
                triggerType: ['text'],
            }}
        >
            {/* Show either data value or placeholder */}
            {display || (
                <Text type="secondary" italic>
                    Click to edit
                </Text>
            )}
        </Text>
    );
};

export default EditableCell;