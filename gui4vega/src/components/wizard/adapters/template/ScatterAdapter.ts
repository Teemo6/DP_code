import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../WizardAdapter.ts";
import type { WizardConfig } from "../../helper/wizardSpec.ts";

/**
 * Adapter for generating a scatter plot Vega specification based on user input from the wizard form.
 */
export class ScatterAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'template';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'xField', type: 'string', label: 'X Axis Field', required: true },
            { name: 'yField', type: 'string', label: 'Y Axis Field', required: true },
            { name: 'color', type: 'color', label: 'Point Color', required: false, defaultValue: '#7bbe1f' }
            // TODO: size, tick count, grid
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const xField = fields['xField'];
        const yField = fields['yField'];
        const color = fields['color'];
        const size = fields['size'];

        return {
            "$schema": "https://vega.github.io/schema/vega/v6.json",
            "width": 500,
            "height": 300,

            "scales": [
                {
                    "name": "xscale",
                    "type": "linear",
                    "round": true,
                    "nice": true,
                    "zero": false,
                    "domain": { "data": datasetName, "field": xField },
                    "range": "width"
                },
                {
                    "name": "yscale",
                    "type": "linear",
                    "round": true,
                    "nice": true,
                    "zero": false,
                    "domain": { "data": datasetName, "field": yField },
                    "range": "height"
                }
            ],

            "axes": [
                {
                    "scale": "xscale",
                    "grid": true,
                    "domain": false,
                    "orient": "bottom",
                    "title": xField
                },
                {
                    "scale": "yscale",
                    "grid": true,
                    "domain": false,
                    "orient": "left",
                    "title": yField
                }
            ],

            "marks": [
                {
                    "name": "marks",
                    "type": "symbol",
                    "from": { "data": datasetName },
                    "encode": {
                        "update": {
                            "x": { "scale": "xscale", "field": xField },
                            "y": { "scale": "yscale", "field": yField },
                            "size": { "value": 50 },
                            "shape": { "value": "circle" },
                            "fill": { "value": color }
                        },
                        "hover": {
                            "fillOpacity": { "value": 1 },
                            "size": { "value": Number(size) * 1.5 }
                        }
                    }
                }
            ]
        };
    }
}