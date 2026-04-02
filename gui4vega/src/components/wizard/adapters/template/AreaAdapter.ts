import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../WizardAdapter.ts";
import type { WizardConfig } from "../../helper/wizardSpec.ts";

/**
 * Adapter for generating an area chart Vega specification based on user input from the wizard form.
 */
export class AreaAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'template';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'x', type: 'field', label: 'X Field', required: true },
            { name: 'y', type: 'field', label: 'Y Field', required: true },
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const xField = fields['x'];
        const yField = fields['y'];

        return {
            "$schema": "https://vega.github.io/schema/vega/v6.json",
            "width": 500,
            "height": 200,

            "scales": [
                {
                    "name": "x",
                    "type": "point",
                    "range": "width",
                    "domain": {"data": datasetName, "field": xField}
                },
                {
                    "name": "y",
                    "type": "linear",
                    "range": "height",
                    "nice": true,
                    "zero": true,
                    "domain": {"data": datasetName, "field": yField}
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
                            "interpolate": {"value": "monotone"},
                            "x": {"scale": "x", "field": xField},
                            "y": {"scale": "y", "field": yField},
                            "y2": {"scale": "y", "value": 0},
                            "fill": {"value": "steelblue"}
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