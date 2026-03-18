import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../WizardAdapter.ts";
import type { WizardConfig } from "../../helper/wizardSpec.ts";

export class BarAdapter implements WizardAdapter {
    mode: AdapterMode = 'template';

    getFields(): WizardField[] {
        return [
            { name: 'xField', type: 'string', label: 'X Axis / Category', required: true },
            { name: 'yField', type: 'string', label: 'Y Axis / Value', required: true },
            { name: 'colorBar', type: 'color',  label: 'Color of the bars', required: false, defaultValue: '#7bbe1f' },
            { name: 'colorHover', type: 'color', label: 'Color when hovered', required: false, defaultValue: '#ff5722' }
        ];
    }

    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const xField = fields['xField'];
        const yField = fields['yField'];
        const colorBar = fields['colorBar'];
        const colorHover = fields['colorHover'];

        return {
            "$schema": "https://vega.github.io/schema/vega/v6.json",
            "width": 500,
            "height": 300,

            "scales": [
                {
                    "name": "xscale",
                    "type": "band",
                    "domain": {"data": datasetName, "field": xField},
                    "range": "width",
                    "padding": 0.2
                },
                {
                    "name": "yscale",
                    "type": "linear",
                    "domain": {"data": datasetName, "field": yField},
                    "nice": true,
                    "range": "height"
                }
            ],

            "axes": [
                { "orient": "bottom", "scale": "xscale", "title": xField },
                { "orient": "left", "scale": "yscale", "title": yField }
            ],

            "marks": [
                {
                    "type": "rect",
                    "from": { "data": datasetName },
                    "encode": {
                        "enter": {
                            "x": { "scale": "xscale", "field": xField },
                            "width": { "scale": "xscale", "band": 1 },
                            "y": { "scale": "yscale", "field": yField },
                            "y2": { "scale": "yscale", "value": 0 },
                            "fill": { "value": colorBar }
                        },
                        "hover": {
                            "fill": { "value": colorHover }
                        },
                        "update": {
                            "fill": { "value": colorBar }
                        }
                    }
                },
                {
                    "type": "line",
                    "from": { "data": datasetName },
                    "encode": {
                        "enter": {
                            "x": { "scale": "xscale", "field": xField, "band": 0.5 },
                            "y": { "scale": "yscale", "field": yField },
                            "stroke": { "value": "rgb(0, 140, 150)" },
                            "strokeWidth": { "value": 3 }
                        }
                    }
                },
                {
                    "type": "symbol",
                    "from": { "data": datasetName },
                    "encode": {
                        "enter": {
                            "x": { "scale": "xscale", "field": xField, "band": 0.5 },
                            "y": { "scale": "yscale", "field": yField },
                            "size": { "value": 140 },
                            "fill": { "value": "rgb(255, 193, 7)" },
                            "stroke": { "value": "rgb(0, 0, 0)" },
                            "strokeWidth": { "value": 1.5 }
                        }
                    }
                },
                {
                    "type": "text",
                    "from": { "data": datasetName },
                    "encode": {
                        "enter": {
                            "x": { "scale": "xscale", "field": xField, "band": 0.5 },
                            "y": { "scale": "yscale", "field": yField },
                            "dy": { "value": -14 },
                            "text": { "field": yField },
                            "align": { "value": "center" },
                            "fill": { "value": "rgb(33, 33, 33)" },
                            "fontSize": { "value": 12 }
                        }
                    }
                }
            ]
        };
    }
}