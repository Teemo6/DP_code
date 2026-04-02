import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../WizardAdapter.ts";
import type { WizardConfig } from "../../helper/wizardSpec.ts";

/**
 * Adapter for generating a stacked bar chart Vega specification based on user input from the wizard form.
 */
export class BarStackedAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'template';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'xCategory', type: 'field', label: 'X Axis / Category', required: true },
            { name: 'yValue', type: 'field', label: 'Y Axis / Value', required: true },
            { name: 'colorCategory', type: 'field', label: 'Color / Stack Category', required: true }
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const xCategory = fields['xCategory'];
        const yValue = fields['yValue'];
        const colorCategory = fields['colorCategory'];

        return {
            "$schema": "https://vega.github.io/schema/vega/v6.json",
            "width": 500,
            "height": 300,

            "data": [
                {
                    "name": "stacked_data",
                    "source": datasetName,
                    "transform": [
                        {
                            "type": "stack",
                            "groupby": [xCategory],
                            "sort": {"field": colorCategory},
                            "field": yValue
                        }
                    ]
                }
            ],

            "scales": [
                {
                    "name": "xscale",
                    "type": "band",
                    "domain": {"data": "stacked_data", "field": xCategory},
                    "range": "width",
                    "padding": 0.2
                },
                {
                    "name": "yscale",
                    "type": "linear",
                    "domain": {"data": "stacked_data", "field": "y1"},
                    "nice": true,
                    "zero": true,
                    "range": "height"
                },
                {
                    "name": "color",
                    "type": "ordinal",
                    "range": "category",
                    "domain": {"data": "stacked_data", "field": colorCategory}
                }
            ],

            "axes": [
                { "orient": "bottom", "scale": "xscale", "title": xCategory },
                { "orient": "left", "scale": "yscale", "title": yValue }
            ],

            "marks": [
                {
                    "type": "rect",
                    "from": { "data": "stacked_data" },
                    "encode": {
                        "enter": {
                            "x": { "scale": "xscale", "field": xCategory },
                            "width": { "scale": "xscale", "band": 1 },
                            "y": { "scale": "yscale", "field": "y0" },
                            "y2": { "scale": "yscale", "field": "y1" },
                            "fill": { "scale": "color", "field": colorCategory }
                        },
                        "update": {
                            "fillOpacity": { "value": 1 }
                        },
                        "hover": {
                            "fillOpacity": { "value": 0.8 }
                        }
                    }
                }
            ],

            "legends": [
                {
                    "fill": "color",
                    "title": colorCategory,
                    "orient": "right"
                }
            ]
        };
    }
}