import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../WizardAdapter.ts";
import type { WizardConfig } from "../../helper/wizardSpec.ts";

/**
 * Adapter for generating a grouped bar chart Vega specification based on user input from the wizard form.
 */
export class BarGroupedAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'template';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'xCategory', type: 'field', label: 'X Axis / Category', required: true },
            { name: 'yValue', type: 'field', label: 'Y Axis / Value', required: true },
            { name: 'groupCategory', type: 'field', label: 'Group Category', required: true }
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const xCategory = fields['xCategory'];
        const yValue = fields['yValue'];
        const groupCategory = fields['groupCategory'];

        return {
            "$schema": "https://vega.github.io/schema/vega/v6.json",
            "width": 500,
            "height": 300,

            "scales": [
                {
                    "name": "xscale",
                    "type": "band",
                    "domain": {"data": datasetName, "field": xCategory},
                    "range": "width",
                    "padding": 0.2
                },
                {
                    "name": "yscale",
                    "type": "linear",
                    "domain": {"data": datasetName, "field": yValue},
                    "nice": true,
                    "zero": true,
                    "range": "height",
                    "padding": 0
                },
                {
                    "name": "color",
                    "type": "ordinal",
                    "domain": {"data": datasetName, "field": groupCategory},
                    "range": "category"
                }
            ],

            "axes": [
                { "orient": "bottom", "scale": "xscale", "title": xCategory },
                { "orient": "left", "scale": "yscale", "title": yValue }
            ],

            "marks": [
                {
                    "type": "group",
                    "from": {
                        "facet": {
                            "data": datasetName,
                            "name": "facet",
                            "groupby": xCategory
                        }
                    },
                    "encode": {
                        "enter": {
                            "x": {"scale": "xscale", "field": xCategory}
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
                            "domain": {"data": "facet", "field": groupCategory},
                            "padding": 0.1
                        }
                    ],
                    "marks": [
                        {
                            "type": "rect",
                            "from": {"data": "facet"},
                            "encode": {
                                "enter": {
                                    "x": {"scale": "pos", "field": groupCategory},
                                    "width": {"scale": "pos", "band": 1},
                                    "y": {"scale": "yscale", "field": yValue},
                                    "y2": {"scale": "yscale", "value": 0},
                                    "fill": {"scale": "color", "field": groupCategory}
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
                    "title": groupCategory,
                    "orient": "right"
                }
            ]
        };
    }
}