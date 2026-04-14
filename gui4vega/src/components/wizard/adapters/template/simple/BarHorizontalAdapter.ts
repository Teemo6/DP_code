import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../../WizardAdapter.ts";
import type { WizardConfig } from "../../../helper/wizardSpec.ts";

/**
 * Adapter for generating a horizontal bar chart Vega specification based on user input from the wizard form.
 */
export class BarHorizontalAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'template';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'category', type: 'field', label: 'Category (Y Axis)', required: true },
            { name: 'value', type: 'field', label: 'Value (X Axis)', required: true },
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

        return {
            "$schema": "https://vega.github.io/schema/vega/v6.json",
            "width": 500,
            "height": 300,

            "scales": [
                {
                    "name": "xscale",
                    "type": "linear",
                    "domain": {"data": datasetName, "field": value},
                    "range": "width",
                    "nice": true
                },
                {
                    "name": "yscale",
                    "type": "band",
                    "domain": {"data": datasetName, "field": category},
                    "range": "height",
                    "padding": 0.2
                }
            ],

            "axes": [
                { "orient": "bottom", "scale": "xscale", "title": value },
                { "orient": "left", "scale": "yscale", "title": category }
            ],

            "marks": [
                {
                    "type": "rect",
                    "from": { "data": datasetName },
                    "encode": {
                        "enter": {
                            "y": { "scale": "yscale", "field": category },
                            "height": { "scale": "yscale", "band": 1 },
                            "x": { "scale": "xscale", "field": value },
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