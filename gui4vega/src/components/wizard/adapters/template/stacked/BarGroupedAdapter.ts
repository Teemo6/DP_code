import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../../WizardAdapter.ts";
import type { WizardConfig } from "../../../helper/wizardSpec.ts";

/**
 * Adapter for generating a grouped bar chart Vega specification based on user input from the wizard form.
 */
export class BarGroupedAdapter implements WizardAdapter {
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

            "scales": [
                {
                    "name": "xscale",
                    "type": "band",
                    "domain": {"data": datasetName, "field": category},
                    "range": "width",
                    "padding": 0.2
                },
                {
                    "name": "yscale",
                    "type": "linear",
                    "domain": {"data": datasetName, "field": value},
                    "nice": true,
                    "zero": true,
                    "range": "height",
                    "padding": 0
                },
                {
                    "name": "color",
                    "type": "ordinal",
                    "domain": {"data": datasetName, "field": group},
                    "range": "category"
                }
            ],

            "axes": [
                { "orient": "bottom", "scale": "xscale", "title": category },
                { "orient": "left", "scale": "yscale", "title": value }
            ],

            "marks": [
                {
                    "type": "group",
                    "from": {
                        "facet": {
                            "data": datasetName,
                            "name": "facet",
                            "groupby": category
                        }
                    },
                    "encode": {
                        "enter": {
                            "x": {"scale": "xscale", "field": category}
                        }
                    },
                    "signals": [
                        {"name": "width", "update": "bandwidth('xscale')"}
                    ],
                    "scales": [
                        {
                            "name": "pos",
                            "type": "band",
                            "range": "width",
                            "domain": {"data": "facet", "field": group},
                            "padding": 0.1
                        }
                    ],
                    "marks": [
                        {
                            "type": "rect",
                            "from": {"data": "facet"},
                            "encode": {
                                "enter": {
                                    "x": {"scale": "pos", "field": group},
                                    "width": {"scale": "pos", "band": 1},
                                    "y": {"scale": "yscale", "field": value},
                                    "y2": {"scale": "yscale", "value": 0},
                                    "fill": {"scale": "color", "field": group}
                                },
                                "update": {
                                    "fillOpacity": {"value": 1}
                                },
                                "hover": {
                                    "fillOpacity": {"value": 0.8}
                                }
                            }
                        }
                    ]
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