import React from 'react';
import { Form, Select, ColorPicker, Input, InputNumber, Switch } from 'antd';
import type { WizardField } from './adapters/WizardAdapter';

/**
 * Props for {@link WizardDynamicField}.
 */
interface WizardDynamicFieldProps {
    /**
     * The configuration for the dynamic field to be rendered.
     */
    field: WizardField;
    /**
     * List of available fields that can be selected for the dynamic field, used when the field type is 'select'.
     */
    availableFields: string[];
}

/**
 * Component responsible for rendering a dynamic form field in the wizard based on the provided {@link WizardField} configuration.
 * @param props - {@link WizardDynamicFieldProps}
 */
export const WizardDynamicField: React.FC<WizardDynamicFieldProps> = (props: WizardDynamicFieldProps) => {
    // Function to normalize color values for the ColorPicker component
    const normalizeColor = (color: string | { toHexString: () => string }) => {
        if (typeof color === 'string') {
            return color;
        }
        return color?.toHexString();
    };

    // Handles appropriate rendering of the input component based on the field type
    const renderInput = () => {
        switch (props.field.type) {
            case 'color':
                return <ColorPicker showText />;
            case 'select':
                return (
                    <Select
                        placeholder={`Select ${props.field.label}`}
                        allowClear={!props.field.required}
                        options={props.field.options?.map(f => ({ label: f, value: f })) || []}
                    />
                );
            case 'field':
                return (
                    <Select
                        placeholder={`Map to ${props.field.label}`}
                        allowClear={!props.field.required}
                        options={props.availableFields.map(f => ({ label: f, value: f }))}
                    />
                );
            case 'number':
                return <InputNumber placeholder={`Enter ${props.field.label}`} style={{ width: '100%' }} />;
            case 'boolean':
                return <Switch />;
            case 'string':
            default:
                return <Input placeholder={`Enter ${props.field.label}`} />;
        }
    };

    return (
        <Form.Item
            key={props.field.name}
            name={['fields', props.field.name]}
            label={props.field.label}
            rules={[{ required: props.field.required, message: `Please provide ${props.field.label}` }]}
            initialValue={props.field.defaultValue}
            getValueFromEvent={props.field.type === 'color' ? normalizeColor : undefined}
            valuePropName={props.field.type === 'boolean' ? 'checked' : 'value'}
        >
            {renderInput()}
        </Form.Item>
    );
};