import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../WizardAdapter.ts";
import type { WizardConfig } from "../../helper/wizardSpec.ts";

export class BarHorizontalAdapter implements WizardAdapter {
    mode: AdapterMode = 'template';

    getFields(): WizardField[] {
        return [
            { name: 'yCategory', type: 'string', label: 'Y Axis / Category', required: true },
            { name: 'xValue', type: 'string', label: 'X Axis / Value', required: true },
            { name: 'colorBar', type: 'color',  label: 'Color of the bars', required: false, defaultValue: '#7bbe1f' },
            { name: 'colorHover', type: 'color', label: 'Color when hovered', required: false, defaultValue: '#ff5722' }
        ];
    }

    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const yCategory = fields['yCategory'];
        const xValue = fields['xValue'];
        const colorBar = fields['colorBar'];
        const colorHover = fields['colorHover'];

        return {
            "$schema": "https://vega.github.io/schema/vega/v6.json",
            "width": 500,
            "height": 300,

            "scales": [
                {
                    "name": "xscale",
                    "type": "linear",
                    "domain": {"data": datasetName, "field": xValue},
                    "range": "width",
                    "nice": true
                },
                {
                    "name": "yscale",
                    "type": "band",
                    "domain": {"data": datasetName, "field": yCategory},
                    "range": "height",
                    "padding": 0.2
                }
            ],

            "axes": [
                { "orient": "bottom", "scale": "xscale", "title": xValue },
                { "orient": "left", "scale": "yscale", "title": yCategory }
            ],

            "marks": [
                {
                    "type": "rect",
                    "from": { "data": datasetName },
                    "encode": {
                        "enter": {
                            "y": { "scale": "yscale", "field": yCategory },
                            "height": { "scale": "yscale", "band": 1 },
                            "x": { "scale": "xscale", "field": xValue },
                            "x2": { "scale": "xscale", "value": 0 },
                            "fill": { "value": colorBar }
                        },
                        "hover": {
                            "fill": { "value": colorHover }
                        },
                        "update": {
                            "fill": { "value": colorBar }
                        }
                    }
                }
            ]
        };
    }
}