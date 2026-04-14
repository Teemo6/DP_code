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
            { name: 'category', type: 'field', label: 'Category (X Axis)', required: true },
            { name: 'value', type: 'field', label: 'Value (Y Axis)', required: true },
            { name: 'symbolShape', type: 'select', label: 'Symbol Shape', required: false, defaultValue: 'circle', options: ['circle', 'square', 'cross', 'diamond', 'triangle-up', 'triangle-down', 'triangle-right', 'triangle-left', 'arrow', 'wedge', 'triangle'] },
            { name: 'symbolSize', type: 'number', label: 'Symbol Size', required: false, defaultValue: 300 },
            { name: 'colorBase', type: 'color',  label: 'Base Color', required: false, defaultValue: '#7bbe1f' },
            { name: 'colorHover', type: 'color', label: 'Hover Color', required: false, defaultValue: '#ff5722' },
            { name: 'strokeWidth', type: 'number', label: 'Stroke Width', required: false, defaultValue: 2 },
            { name: 'strokeColor', type: 'color', label: 'Stroke Color', required: false, defaultValue: '#000000' }
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const category = fields['category'];
        const value = fields['value'];
        const symbolShape = fields['symbolShape'];
        const symbolSize = fields['symbolSize'];
        const colorBase = fields['colorBase'];
        const colorHover = fields['colorHover'];
        const strokeWidth = fields['strokeWidth'];
        const strokeColor = fields['strokeColor'];

        const suffix = Math.floor(Math.random() * 10000);
        const xScale = `symbol_xscale_${suffix}`;
        const yScale = `symbol_yscale_${suffix}`;

        return {
            "scales": [
                {
                    "name": xScale,
                    "type": "band",
                    "domain": { "data": datasetName, "field": category },
                    "range": "width",
                    "padding": 0.2,
                },
                {
                    "name": yScale,
                    "type": "linear",
                    "domain": { "data": datasetName, "field": value },
                    "nice": true,
                    "range": "height"
                }
            ],

            "axes": [
                { "orient": "bottom", "scale": xScale, "title": category },
                { "orient": "left", "scale": yScale, "title": value }
            ],

            "marks": [
                {
                    "type": "symbol",
                    "from": { "data": datasetName },
                    "encode": {
                        "enter": {
                            "x": { "scale": xScale, "field": category, "band": 0.5 },
                            "y": { "scale": yScale, "field": value },
                            "size": { "value": symbolSize },
                            "shape": { "value": symbolShape },
                            "fill": { "value": colorBase },
                            "stroke": { "value": strokeColor },
                            "strokeWidth": { "value": strokeWidth }
                        },
                        "update": {
                            "fill": { "value": colorBase }
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