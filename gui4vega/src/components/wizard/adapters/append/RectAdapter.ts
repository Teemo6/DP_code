import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../WizardAdapter.ts";
import type { WizardConfig } from "../../helper/wizardSpec.ts";

/**
 * Adapter for generating a vertical bar chart Vega specification based on user input from the wizard form.
 */
export class RectAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'append';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'category', type: 'field', label: 'Category (X Axis)', required: true },
            { name: 'value', type: 'field', label: 'Value (Y Axis)', required: true },
            { name: 'colorBar', type: 'color',  label: 'Base Color', required: false, defaultValue: '#7bbe1f' },
            { name: 'colorHover', type: 'color', label: 'Hover Color', required: false, defaultValue: '#ff5722' }
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const category = fields['category'];
        const value = fields['value'];
        const colorBar = fields['colorBar'];
        const colorHover = fields['colorHover'];

        const suffix = Math.floor(Math.random() * 10000);
        const xScale = `xscale_${suffix}`;
        const yScale = `yscale_${suffix}`;

        return {
            "scales": [
                {
                    "name": xScale,
                    "type": "band",
                    "domain": { "data": datasetName, "field": category },
                    "range": "width",
                    "padding": 0.2,
                },
                {
                    "name": yScale,
                    "type": "linear",
                    "domain": { "data": datasetName, "field": value },
                    "nice": true,
                    "range": "height"
                }
            ],

            "axes": [
                { "orient": "bottom", "scale": xScale, "title": category },
                { "orient": "left", "scale": yScale, "title": value }
            ],

            "marks": [
                {
                    "type": "rect",
                    "from": { "data": datasetName },
                    "encode": {
                        "enter": {
                            "x": { "scale": xScale, "field": category },
                            "width": { "scale": xScale, "band": 1 },
                            "y": { "scale": yScale, "field": value },
                            "y2": { "scale": yScale, "value": 0 },
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