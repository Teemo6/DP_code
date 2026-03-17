import React from 'react';
import { Form, Select, Button, Card, Segmented } from 'antd';
import { useWizardView } from './useWizardView';
import type { VegaEditorState } from "../useVegaEditor.ts";

interface WizardViewProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

const WizardView: React.FC<WizardViewProps> = (props: WizardViewProps) => {
    const {
        form,
        datasets,
        datasetName,
        adapterFields,
        fields,
        handleFinish
    } = useWizardView(props);

    return (
        <Card variant={'borderless'} style={{ height: '100%', overflowY: 'auto' }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{ chartType: 'bar' }}
            >
                <Form.Item name="chartType" label="Chart Type">
                    <Segmented
                        block
                        options={[
                            { label: 'Bar Chart', value: 'bar' },
                            { label: 'Circular Chart', value: 'pie' }
                        ]}
                    />
                </Form.Item>

                <Form.Item name="datasetName" label="Dataset">
                    <Select
                        placeholder="Select a dataset"
                        options={datasets.map(ds => ({ label: ds.name, value: ds.name }))}
                    />
                </Form.Item>

                {datasetName && adapterFields.map(field => (
                    <Form.Item
                        key={field.name}
                        name={['fields', field.name]}
                        label={field.label}
                        rules={[{ required: field.required, message: `Please select ${field.label}` }]}
                        tooltip={field.description}
                    >
                        <Select
                            placeholder={`Select ${field.label}`}
                            allowClear={!field.required}
                            options={fields.map(f => ({ label: f, value: f }))}
                        />
                    </Form.Item>
                ))}

                <Form.Item>
                    <Button block type="primary" htmlType="submit" disabled={!datasetName}>
                        Generate Visualization
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default WizardView;