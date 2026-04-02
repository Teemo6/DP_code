import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../WizardAdapter.ts";
import type { WizardConfig } from "../../helper/wizardSpec.ts";

/**
 * Adapter for generating a pie chart Vega specification based on user input from the wizard form.
 */
export class PieAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'template';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'category', type: 'field', label: 'Category Field', required: true },
            { name: 'value', type: 'field', label: 'Value Field', required: true }
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const categoryField = fields['category'];
        const valueField = fields['value'];

        return {
            "$schema": "https://vega.github.io/schema/vega/v6.json",
            "width": 500,
            "height": 300,

            "data": [
                {
                    "name": "pie_data",
                    "source": datasetName,
                    "transform": [
                        {
                            "type": "pie",
                            "field": valueField
                        }
                    ]
                }
            ],

            "scales": [
                {
                    "name": "color",
                    "type": "ordinal",
                    "domain": { "data": "pie_data", "field": categoryField },
                    "range": { "scheme": "category20" }
                }
            ],

            "marks": [
                {
                    "type": "arc",
                    "from": { "data": "pie_data" },
                    "encode": {
                        "enter": {
                            "fill": { "scale": "color", "field": categoryField },
                            "x": { "signal": "width / 2" },
                            "y": { "signal": "height / 2" }
                        },
                        "update": {
                            "startAngle": { "field": "startAngle" },
                            "endAngle": { "field": "endAngle" },
                            "innerRadius": { "value": 0 },
                            "outerRadius": { "signal": "min(width, height) / 2" }
                        }
                    }
                }
            ],

            "legends": [
                { "fill": "color", "title": categoryField }
            ]
        };
    }
}