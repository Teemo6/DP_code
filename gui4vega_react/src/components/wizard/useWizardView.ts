import { useMemo } from 'react';
import { Form } from 'antd';
import { parseDatasets } from '../data/helper/datasetEdit';
import {adapters, generateSpec} from './helper/wizardSpec';
import type { ChartType } from "./helper/wizardSpec.ts";
import type { VegaEditorState } from "../useVegaEditor.ts";

interface useWizardViewProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
}

export interface WizardFormValues {
    chartType: ChartType;
    dataset: string;
    fields: Record<string, string>;
}

export const useWizardView = (props: useWizardViewProps) => {
    const [form] = Form.useForm<WizardFormValues>();

    const datasets = useMemo(() => parseDatasets(props.editorState.code), [props.editorState.code]);

    const datasetName = Form.useWatch('dataset', form);
    const chartType = Form.useWatch('chartType', form);

    const fields = useMemo(() => {
        if (!datasetName) return [];
        const selectedDataset = datasets.find(d => d.name === datasetName);
        if (selectedDataset && selectedDataset.values.length > 0) {
            return Object.keys(selectedDataset.values[0]);
        }
        return [];
    }, [datasetName, datasets]);

    const adapterFields = useMemo(() => {
        if (!chartType) return [];
        const adapter = adapters[chartType];
        return adapter ? adapter.getFields() : [];
    }, [chartType]);

    const handleFinish = (values: WizardFormValues) => {
        const { chartType, dataset, fields } = values;

        const newCode = generateSpec(props.editorState.code, {
            chartType,
            datasetName: dataset,
            fields
        });

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