import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../../WizardAdapter.ts";
import type { WizardConfig } from "../../../helper/wizardSpec.ts";

/**
 * Adapter for generating a stacked area chart Vega specification based on user input from the wizard form.
 */
export class AreaStackedAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'template';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'category', type: 'field', label: 'Category (X Axis)', required: true },
            { name: 'value', type: 'field', label: 'Value (Y Axis)', required: true },
            { name: 'group', type: 'field', label: 'Group (Color)', required: true },
            { name: 'interpolate', type: 'select', label: 'Interpolation', required: false, options: ['linear', 'step', 'step-before', 'step-after', 'basis', 'cardinal', 'monotone'], defaultValue: 'linear' },
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const category = fields['category'];
        const value = fields['value'];
        const group = fields['group'];
        const interpolate = fields['interpolate'];

        const suffix = Math.floor(Math.random() * 10000);
        const transformedDataName = `stacked_area_data_${suffix}`;

        return {
            "$schema": "https://vega.github.io/schema/vega/v6.json",
            "width": 500,
            "height": 300,

            "data": [
                {
                    "name": transformedDataName,
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
                    "name": "x",
                    "type": "point",
                    "range": "width",
                    "domain": {"data": transformedDataName, "field": category}
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
                    "domain": {"data": transformedDataName, "field": group}
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
                            "groupby": group
                        }
                    },
                    "marks": [
                        {
                            "type": "area",
                            "from": {"data": "facet_data"},
                            "encode": {
                                "enter": {
                                    "interpolate": {"value": interpolate},
                                    "x": {"scale": "x", "field": category},
                                    "y": {"scale": "y", "field": "y0"},
                                    "y2": {"scale": "y", "field": "y1"},
                                    "fill": {"scale": "color", "field": group}
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