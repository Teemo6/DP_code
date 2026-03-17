import { useMemo } from 'react';
import { Form } from 'antd';
import { parseDatasets } from '../../data/helper/datasetEdit.ts';
import { adapters, generateSpec } from '../helper/wizardSpec.ts';
import type { WizardConfig } from "../helper/wizardSpec.ts";
import type { VegaEditorState } from "../../useVegaEditor.ts";

interface useWizardViewProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

export const useWizardView = (props: useWizardViewProps) => {
    // Parse datasets from Vega code
    const datasets = useMemo(() => parseDatasets(props.editorState.code), [props.editorState.code]);

    // Initialize form
    const [form] = Form.useForm<WizardConfig>();

    // Watch for selected dataset name
    const datasetName = Form.useWatch('datasetName', form);

    // Get fields from the selected dataset
    const fields = useMemo(() => {
        if (!datasetName) return [];
        const selectedDataset = datasets.find(d => d.name === datasetName);
        if (selectedDataset && selectedDataset.values.length > 0) {
            return Object.keys(selectedDataset.values[0]);
        }
        return [];
    }, [datasetName, datasets]);

    // Watch for selected chart type
    const chartType = Form.useWatch('chartType', form);

    // Get adapter fields based on selected chart type
    const adapterFields = useMemo(() => {
        if (!chartType) return [];
        const adapter = adapters[chartType];
        return adapter ? adapter.getFields() : [];
    }, [chartType]);

    // Handle form submission to generate new Vega spec
    const handleFinish = (values: WizardConfig) => {
        const newCode = generateSpec(props.editorState.code, values);
        props.editorState.setCode(newCode);
    };

    return {
        form,
        datasets,
        datasetName,
        adapterFields,
        fields,
        handleFinish,
    };
};