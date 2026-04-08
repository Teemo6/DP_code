import React from 'react';
import { Typography, Tooltip } from 'antd';
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
 * Converts a value to a string for display purposes.
 * If the value is an object, it will be stringified as JSON.
 * @param value - The value to convert to a display string.
 * @returns A string representation of the value for display.
 */
function toDisplay(value: unknown): string {
    return value !== null && typeof value === 'object'
        ? JSON.stringify(value)
        : String(value ?? '');
}

/**
 * Component responsible for rendering an editable cell in the data table.
 * Displays the current value and allows users to click and edit it.
 * @param props - {@link EditableCellProps}
 */
const EditableCell: React.FC<EditableCellProps> = (props: EditableCellProps) => {
    // Convert the value to a display string
    const display = toDisplay(props.value);

    // Maximum number of characters to display in the cell
    const MAX_DISPLAY_LENGTH = 20;

    return (
        <Tooltip title="Click to edit">
            <Text
                style={{ cursor: 'pointer', maxWidth: 150 }}
                ellipsis={display.length > MAX_DISPLAY_LENGTH ? { tooltip: display } : false}
                editable={{
                    onChange: (val) => props.onSave(parseValue(val)),
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
        </Tooltip>
    );
};

export default EditableCell;