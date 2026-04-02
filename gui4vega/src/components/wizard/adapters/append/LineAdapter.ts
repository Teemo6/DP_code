import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../WizardAdapter.ts";
import type { WizardConfig } from "../../helper/wizardSpec.ts";

/**
 * Adapter for generating a line chart Vega specification based on user input from the wizard form.
 */
export class LineAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'append';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'xField', type: 'field', label: 'X Axis', required: true },
            { name: 'yField', type: 'field', label: 'Y Axis', required: true },
            { name: 'colorLine', type: 'color',  label: 'Color of the line', required: false, defaultValue: '#000000' },
            { name: 'strokeWidth', type: 'number', label: 'Line width', required: false, defaultValue: 3 }
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const xField = fields['xField'];
        const yField = fields['yField'];
        const colorLine = fields['colorLine'];
        const strokeWidth = fields['strokeWidth'];

        const suffix = Math.floor(Math.random() * 10000);
        const xScale = `line_xscale_${suffix}`;
        const yScale = `line_yscale_${suffix}`;

        return {
            "scales": [
                {
                    "name": xScale,
                    "type": "band",
                    "domain": { "data": datasetName, "field": xField },
                    "range": "width",
                    "padding": 0.2,
                },
                {
                    "name": yScale,
                    "type": "linear",
                    "domain": { "data": datasetName, "field": yField },
                    "nice": true,
                    "range": "height"
                }
            ],

            "axes": [
                { "orient": "bottom", "scale": xScale, "title": xField },
                { "orient": "left", "scale": yScale, "title": yField }
            ],

            "marks": [
                {
                    "type": "line",
                    "from": { "data": datasetName },
                    "encode": {
                        "enter": {
                            "x": { "scale": xScale, "field": xField, "band": 0.5 },
                            "y": { "scale": yScale, "field": yField },
                            "stroke": { "value": colorLine },
                            "strokeWidth": { "value": strokeWidth }
                        }
                    }
                }
            ]
        };
    }
}