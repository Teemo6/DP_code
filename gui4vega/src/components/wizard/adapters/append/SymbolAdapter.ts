import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../WizardAdapter.ts";
import type { WizardConfig } from "../../helper/wizardSpec.ts";

/**
 * Adapter for generating a symbol (scatter) Vega specification based on user input from the wizard form.
 */
export class SymbolAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'append';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'xField', type: 'field', label: 'X Axis', required: true },
            { name: 'yField', type: 'field', label: 'Y Axis', required: true },
            { name: 'colorSymbol', type: 'color',  label: 'Color of the symbols', required: false, defaultValue: '#7bbe1f' },
            { name: 'colorHover', type: 'color', label: 'Color when hovered', required: false, defaultValue: '#ff5722' },
            { name: 'sizeSymbol', type: 'number', label: 'Size of symbol', required: false, defaultValue: 300 },
            { name: 'strokeWidth', type: 'number', label: 'Width of the stroke', required: false, defaultValue: 2 },
            { name: 'strokeColor', type: 'color', label: 'Color of the stroke', required: false, defaultValue: '#000000' }
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const xField = fields['xField'];
        const yField = fields['yField'];
        const colorSymbol = fields['colorSymbol'];
        const colorHover = fields['colorHover'];
        const sizeSymbol = fields['sizeSymbol'];

        const suffix = Math.floor(Math.random() * 10000);
        const xScale = `symbol_xscale_${suffix}`;
        const yScale = `symbol_yscale_${suffix}`;

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
                    "type": "symbol",
                    "from": { "data": datasetName },
                    "encode": {
                        "enter": {
                            "x": { "scale": xScale, "field": xField, "band": 0.5 },
                            "y": { "scale": yScale, "field": yField },
                            "size": { "value": sizeSymbol },
                            "fill": { "value": colorSymbol },
                            "stroke": { "value": "rgb(0, 0, 0)" },
                            "strokeWidth": { "value": 1.5 }
                        },
                        "update": {
                            "fill": { "value": colorSymbol }
                        },
                        "hover": {
                            "fill": { "value": colorHover }
                        }
                    }
                }
            ]
        };
    }
}