import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../WizardAdapter.ts";
import type { WizardConfig } from "../../helper/wizardSpec.ts";

/**
 * Adapter for generating a stacked area chart Vega specification based on user input from the wizard form.
 */
export class StackedAreaAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'template';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'x', type: 'field', label: 'X Field', required: true },
            { name: 'y', type: 'field', label: 'Y Field', required: true },
            { name: 'c', type: 'field', label: 'Category Field', required: true },
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const xField = fields['x'];
        const yField = fields['y'];
        const cField = fields['c'];

        const suffix = Math.floor(Math.random() * 10000);
        const transformedDataName = `stacked_area_data_${suffix}`;

        return {
            "$schema": "https://vega.github.io/schema/vega/v6.json",
            "width": 500,
            "height": 200,

            "data": [
                {
                    "name": transformedDataName,
                    "source": datasetName,
                    "transform": [
                        {
                            "type": "stack",
                            "groupby": [xField],
                            "sort": {"field": cField},
                            "field": yField
                        }
                    ]
                }
            ],

            "scales": [
                {
                    "name": "x",
                    "type": "point",
                    "range": "width",
                    "domain": {"data": transformedDataName, "field": xField}
                },
                {
                    "name": "y",
                    "type": "linear",
                    "range": "height",
                    "nice": true,
                    "zero": true,
                    "domain": {"data": transformedDataName, "field": "y1"}
                },
                {
                    "name": "color",
                    "type": "ordinal",
                    "range": "category",
                    "domain": {"data": transformedDataName, "field": cField}
                }
            ],

            "axes": [
                {"orient": "bottom", "scale": "x", "zindex": 1},
                {"orient": "left", "scale": "y", "zindex": 1}
            ],

            "marks": [
                {
                    "type": "group",
                    "from": {
                        "facet": {
                            "name": "facet_data",
                            "data": transformedDataName,
                            "groupby": cField
                        }
                    },
                    "marks": [
                        {
                            "type": "area",
                            "from": {"data": "facet_data"},
                            "encode": {
                                "enter": {
                                    "interpolate": {"value": "monotone"},
                                    "x": {"scale": "x", "field": xField},
                                    "y": {"scale": "y", "field": "y0"},
                                    "y2": {"scale": "y", "field": "y1"},
                                    "fill": {"scale": "color", "field": cField}
                                },
                                "update": {
                                    "fillOpacity": {"value": 1}
                                },
                                "hover": {
                                    "fillOpacity": {"value": 0.5}
                                }
                            }
                        }
                    ]
                }
            ]
        };
    }
}