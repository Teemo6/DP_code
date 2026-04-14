import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../../WizardAdapter.ts";
import type { WizardConfig } from "../../../helper/wizardSpec.ts";

/**
 * Adapter for generating a stacked bar chart Vega specification based on user input from the wizard form.
 */
export class BarStackedAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'template';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'category', type: 'field', label: 'Category (X Axis)', required: true },
            { name: 'value', type: 'field', label: 'Value (Y Axis)', required: true },
            { name: 'group', type: 'field', label: 'Group (Color)', required: true }
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const category = fields['category'];
        const value = fields['value'];
        const group = fields['group'];

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
                            "groupby": [category],
                            "sort": {"field": group},
                            "field": value
                        }
                    ]
                }
            ],

            "scales": [
                {
                    "name": "xscale",
                    "type": "band",
                    "domain": {"data": "stacked_data", "field": category},
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
                    "domain": {"data": "stacked_data", "field": group}
                }
            ],

            "axes": [
                { "orient": "bottom", "scale": "xscale", "title": category },
                { "orient": "left", "scale": "yscale", "title": value }
            ],

            "marks": [
                {
                    "type": "rect",
                    "from": { "data": "stacked_data" },
                    "encode": {
                        "enter": {
                            "x": { "scale": "xscale", "field": category },
                            "width": { "scale": "xscale", "band": 1 },
                            "y": { "scale": "yscale", "field": "y0" },
                            "y2": { "scale": "yscale", "field": "y1" },
                            "fill": { "scale": "color", "field": group }
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
                    "title": group,
                    "orient": "right"
                }
            ]
        };
    }
}