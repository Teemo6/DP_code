import React from 'react';
import { Form, Select, Button, Card, Typography, Flex, Tabs } from 'antd';
import { useWizardView } from './hooks/useWizardView.ts';
import { WizardDynamicField } from './WizardDynamicField';
import type { VegaEditorState } from "../useVegaEditor.ts";

/**
 * Props for {@link WizardView}.
 */
interface WizardViewProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

/**
 * Component responsible for rendering the wizard view with dynamic fields based on the selected dataset and chart type.
 * @param props - {@link WizardViewProps}
 */
const WizardView: React.FC<WizardViewProps> = (props: WizardViewProps) => {
    const {
        form,
        datasets,
        datasetName,
        adapterFields,
        fields,
        handleFinish
    } = useWizardView(props);

    // Chart types for the tabs
    const chartTypeOptions = [
        { label: 'Vertical Bar Chart', value: 'barVertical' },
        { label: 'Horizontal Bar Chart', value: 'barHorizontal' },
        { label: 'Circular Chart', value: 'pie' },
        { label: 'Scatter Plot', value: 'scatter' },
        { label: 'Add Rect', value: 'rect' }
    ];

    // Default chart the first one in the options list
    const defaultChartType = chartTypeOptions[0].value;

    // Default dataset the first one in the list
    const defaultDatasetName = datasets?.[0]?.name;

    return (
        <Card variant={'borderless'} style={{ height: '100%', overflowY: 'auto' }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{
                    chartType: defaultChartType,
                    datasetName: defaultDatasetName
                }}
            >
                {/* This should have same name as the WizardConfig attribute */}
                <Form.Item name="datasetName" label="Dataset">
                    <Select
                        placeholder="Select a dataset"
                        options={datasets.map(ds => ({ label: ds.name, value: ds.name }))}
                    />
                </Form.Item>

                {/* Name of chart type must match with onChange in tabs */}
                <Form.Item name="chartType" label="Chart Type">
                    <Tabs
                        onChange={(key) => form.setFieldValue('chartType', key)}
                        items={chartTypeOptions.map(option => ({
                            label: option.label,
                            key: option.value,
                        }))}
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
                    <Flex vertical align='center' gap='small'>
                        <Typography.Text type="secondary" style={{ textAlign: 'center' }}>
                            Pressing the button below will overwrite existing Vega specification, except for data and signals.
                        </Typography.Text>
                        <Button block type="primary" htmlType="submit" disabled={!datasetName}>
                            Generate Visualization
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default WizardView;