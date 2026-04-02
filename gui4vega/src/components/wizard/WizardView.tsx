import React, { useState } from 'react';
import { Form, Select, Button, Card, Typography, Flex, Modal, Checkbox, Space } from 'antd';
import {
    BarChartOutlined,
    MenuOutlined,
    AppstoreOutlined,
    BuildOutlined,
    PieChartOutlined,
    DotChartOutlined,
    BorderOutlined,
    LineChartOutlined,
    StarOutlined,
    RadarChartOutlined
} from '@ant-design/icons';
import { useWizardView } from './hooks/useWizardView.ts';
import { WizardDynamicField } from './WizardDynamicField';
import type { VegaEditorState } from "../useVegaEditor.ts";
import type { WizardConfig } from "./helper/wizardSpec.ts";

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

    // Chart types grouped by adapter mode
    const chartTypeOptions = [
        {
            label: 'Template',
            options: [
                { label: <Space><BarChartOutlined /> Column Chart</Space>, value: 'barVertical' },
                { label: <Space><MenuOutlined /> Bar Chart</Space>, value: 'barHorizontal' },
                { label: <Space><AppstoreOutlined /> Stacked Bar Chart</Space>, value: 'barStacked' },
                { label: <Space><BuildOutlined /> Grouped Bar Chart</Space>, value: 'barGrouped' },
                { label: <Space><PieChartOutlined /> Pie Chart</Space>, value: 'pie' },
                { label: <Space><DotChartOutlined /> Scatter Plot</Space>, value: 'scatter' },
                { label: <Space><RadarChartOutlined /> Spider Chart</Space>, value: 'spider' }
            ]
        },
        {
            label: 'Append',
            options: [
                { label: <Space><BorderOutlined /> Add Rect</Space>, value: 'rect' },
                { label: <Space><LineChartOutlined /> Add Line</Space>, value: 'line' },
                { label: <Space><StarOutlined /> Add Symbol</Space>, value: 'symbol' }
            ]
        }
    ];

    // Default chart the first one in the options list
    const defaultChartType = chartTypeOptions[0].options[0].value;

    // Default dataset the first one in the list
    const defaultDatasetName = datasets?.[0]?.name;

    // State to track whether the user has chosen to skip the confirmation warning
    const [dontAskWarning, setDontAskWarning] = useState(false);

    // Confirmation modal before generating new visualization to prevent accidental overwrites
    const onFinish = (values: WizardConfig) => {
        // User has chosen to skip the warning
        if (dontAskWarning) {
            handleFinish(values);
            return;
        }

        // Track state if the checkbox inside modal
        let isChecked = false;

        // Show confirmation modal
        Modal.confirm({
            title: 'Are you sure?',
            content: (
                <Space orientation="vertical" style={{ marginTop: 12 }}>
                    <Typography.Text>
                        Generating a new visualization will overwrite the existing Vega specification
                        (except for data and signals).
                    </Typography.Text>
                    <Typography.Text strong>Make sure to save your work!</Typography.Text>
                    <Checkbox onChange={(e) => { isChecked = e.target.checked; }}>
                        Don't ask again
                    </Checkbox>
                </Space>
            ),
            okText: 'Overwrite',
            okButtonProps: { danger: true },
            cancelText: 'Cancel',
            onOk() {
                if (isChecked) {
                    setDontAskWarning(true);
                }
                handleFinish(values);
            },
        });
    };

    return (
        <Card variant={'borderless'} style={{ height: '100%', overflowY: 'auto' }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    chartType: defaultChartType,
                    datasetName: defaultDatasetName
                }}
            >
                {/* Name of chart type must match with onChange in tabs */}
                <Form.Item name="chartType" label="Chart Type">
                    <Select
                        placeholder="Select a chart type"
                        options={chartTypeOptions}
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