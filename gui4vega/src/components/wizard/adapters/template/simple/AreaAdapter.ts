import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../../WizardAdapter.ts";
import type { WizardConfig } from "../../../helper/wizardSpec.ts";

/**
 * Adapter for generating an area chart Vega specification based on user input from the wizard form.
 */
export class AreaAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'template';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'category', type: 'field', label: 'Category (X Axis)', required: true },
            { name: 'value', type: 'field', label: 'Value (Y Axis)', required: true },
            { name: 'color', type: 'color', label: 'Base Color', required: false, defaultValue: '#7bbe1f' },
            { name: 'interpolate', type: 'select', label: 'Interpolation', required: false, defaultValue: 'linear', options: ['linear', 'step', 'step-before', 'step-after', 'basis', 'cardinal', 'monotone'] },
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const category = fields['category'];
        const value = fields['value'];
        const color = fields['color'];
        const interpolate = fields['interpolate'];

        return {
            "$schema": "https://vega.github.io/schema/vega/v6.json",
            "width": 500,
            "height": 300,

            "scales": [
                {
                    "name": "x",
                    "type": "point",
                    "range": "width",
                    "domain": {"data": datasetName, "field": category}
                },
                {
                    "name": "y",
                    "type": "linear",
                    "range": "height",
                    "nice": true,
                    "zero": true,
                    "domain": {"data": datasetName, "field": value}
                }
            ],

            "axes": [
                {"orient": "bottom", "scale": "x", "zindex": 1},
                {"orient": "left", "scale": "y", "zindex": 1}
            ],

            "marks": [
                {
                    "type": "area",
                    "from": {"data": datasetName},
                    "encode": {
                        "enter": {
                            "interpolate": {"value": interpolate},
                            "x": {"scale": "x", "field": category},
                            "y": {"scale": "y", "field": value},
                            "y2": {"scale": "y", "value": 0},
                            "fill": {"value": color}
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
        };
    }
}