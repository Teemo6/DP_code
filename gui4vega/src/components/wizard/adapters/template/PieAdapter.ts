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
            { name: 'value', type: 'field', label: 'Value Field', required: true },
            { name: 'sort', type: 'select', label: 'Sort by Value', options: ['none', 'ascending', 'descending'], required: false, defaultValue: 'none' },
            { name: 'hollow', type: 'boolean', label: 'Hollow Center', required: false, defaultValue: false },
            { name: 'roundedCorners', type: 'boolean', label: 'Rounded Corners', required: false, defaultValue: false },
        ];
    }

    // Generate the Vega specification based on the input from the wizard form
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const categoryField = fields['category'];
        const valueField = fields['value'];
        const isHollow = fields['hollow'];
        const sortOption = fields['sort'];
        const isRounded = fields['roundedCorners'];

        const transforms: unknown[] = [];
        if (sortOption === 'ascending' || sortOption === 'descending') {
            transforms.push({
                "type": "collect",
                "sort": { "field": `datum['${valueField}']`, "order": sortOption }
            });
            transforms.push({
                "type": "pie",
                "field": `datum['${valueField}']`,
                "sort": false
            });
        } else {
            transforms.push({
                "type": "pie",
                "field": `datum['${valueField}']`,
                "sort": false
            });
        }

        return {
            "$schema": "https://vega.github.io/schema/vega/v6.json",
            "width": 500,
            "height": 300,

            "scales": [
                {
                    "name": "color",
                    "type": "ordinal",
                    "domain": { "data": datasetName, "field": categoryField },
                    "range": { "scheme": "category20" }
                }
            ],

            "marks": [
                {
                    "type": "arc",
                    "from": { "data": datasetName },
                    "transform": transforms,
                    "encode": {
                        "enter": {
                            "fill": { "scale": "color", "field": categoryField },
                            "x": { "signal": "width / 2" },
                            "y": { "signal": "height / 2" },
                            "tooltip": { "signal": `{'${categoryField}': datum['${categoryField}'], '${valueField}': datum['${valueField}']}` }
                        },
                        "update": {
                            "startAngle": { "field": "startAngle" },
                            "endAngle": { "field": "endAngle" },
                            "innerRadius": isHollow ? { "signal": "min(width, height) / 4" } : { "value": 0 },
                            "outerRadius": { "signal": "min(width, height) / 2" },
                            "cornerRadius": isRounded ? { "value": 10 } : { "value": 0 },
                            "fillOpacity": { "value": 1 }
                        },
                        "hover": {
                            "fillOpacity": { "value": 0.8 }
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