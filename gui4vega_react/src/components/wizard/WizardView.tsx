import React from 'react';
import { Form, Select, Button, Card, Segmented } from 'antd';
import { useWizardView } from './hooks/useWizardView.ts';
import { WizardDynamicField } from './WizardDynamicField';
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
                {/* This should have same name as the WizardConfig attribute */}
                <Form.Item name="chartType" label="Chart Type">
                    <Segmented
                        block
                        options={[
                            { label: 'Vertical Bar Chart', value: 'barVertical' },
                            { label: 'Horizontal Bar Chart', value: 'barHorizontal' },
                            { label: 'Circular Chart', value: 'pie' },
                            { label: 'Scatter Plot', value: 'scatter' },
                            { label: 'Add Rect', value: 'rect' }
                        ]}
                    />
                </Form.Item>

                {/* This should have same name as the WizardConfig attribute */}
                <Form.Item name="datasetName" label="Dataset">
                    <Select
                        placeholder="Select a dataset"
                        options={datasets.map(ds => ({ label: ds.name, value: ds.name }))}
                    />
                </Form.Item>

                {datasetName && adapterFields.map(field => (
                    <WizardDynamicField
                        key={field.name}
                        field={field}
                        availableFields={fields}
                    />
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