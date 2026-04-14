import type { AdapterMode, WizardAdapter, WizardField, WizardSpec } from "../../WizardAdapter.ts";
import type { WizardConfig } from "../../../helper/wizardSpec.ts";

export class SpiderAdapter implements WizardAdapter {
    // Select the mode for the adapter
    mode: AdapterMode = 'template';

    // Define the fields that will be displayed in the wizard form for this adapter
    getFields(): WizardField[] {
        return [
            { name: 'category', type: 'field', label: 'Category (Axis Count)', required: true },
            { name: 'value', type: 'field', label: 'Value (Point Distance)', required: true },
            { name: 'group', type: 'field', label: 'Group (Color)', required: true },
        ];
    }

    // Generate the Vega specification based on the second spec's structure
    getSpec(config: WizardConfig): WizardSpec {
        const { datasetName, fields } = config;

        const category = fields['category'];
        const value = fields['value'];
        const group = fields['group'];

        const suffix = Math.floor(Math.random() * 10000);
        const keysData = `spider_keys_${suffix}`;
        const radiusSignal = `spider_radius_${suffix}`;

        return {
            "$schema": "https://vega.github.io/schema/vega/v5.json",
            "width": 400,
            "height": 400,
            "padding": 30,
            "autosize": {"type": "none", "contains": "padding"},

            "data": [
                {
                    "name": keysData,
                    "source": datasetName,
                    "transform": [
                        {
                            "type": "aggregate",
                            "groupby": [category]
                        }
                    ]
                }
            ],

            "signals": [
                {"name": radiusSignal, "update": "width / 2"}
            ],

            "scales": [
                {
                    "name": "angular",
                    "type": "point",
                    "range": {"signal": "[-PI, PI]"},
                    "padding": 0.5,
                    "domain": {"data": datasetName, "field": category}
                },
                {
                    "name": "radial",
                    "type": "linear",
                    "range": {"signal": `[0, ${radiusSignal}]`},
                    "zero": true,
                    "domain": {"data": datasetName, "field": value}
                },
                {
                    "name": "color",
                    "type": "ordinal",
                    "range": {"scheme": "category10"},
                    "domain": {"data": datasetName, "field": group}
                }
            ],

            "marks": [
                {
                    "type": "group",
                    "encode": {
                        "enter": {
                            "x": {"signal": radiusSignal},
                            "y": {"signal": radiusSignal}
                        }
                    },
                    "marks": [
                        {
                            "name": "outer-line",
                            "type": "line",
                            "from": {"data": keysData},
                            "encode": {
                                "enter": {
                                    "interpolate": {"value": "linear-closed"},
                                    "x": {"signal": `${radiusSignal} * cos(scale('angular', datum['${category}']))`},
                                    "y": {"signal": `${radiusSignal} * sin(scale('angular', datum['${category}']))`},
                                    "stroke": {"value": "lightgray"},
                                    "strokeWidth": {"value": 1}
                                }
                            }
                        },
                        {
                            "name": "radial-grid",
                            "type": "rule",
                            "from": {"data": keysData},
                            "encode": {
                                "enter": {
                                    "x": {"value": 0},
                                    "y": {"value": 0},
                                    "x2": {"signal": `${radiusSignal} * cos(scale('angular', datum['${category}']))`},
                                    "y2": {"signal": `${radiusSignal} * sin(scale('angular', datum['${category}']))`},
                                    "stroke": {"value": "lightgray"}
                                }
                            }
                        },
                        {
                            "type": "group",
                            "from": {
                                "facet": {"data": datasetName, "name": "facet_data", "groupby": [group]}
                            },
                            "marks": [
                                {
                                    "type": "line",
                                    "from": {"data": "facet_data"},
                                    "encode": {
                                        "enter": {
                                            "interpolate": {"value": "linear-closed"},
                                            "x": {"signal": `scale('radial', datum['${value}']) * cos(scale('angular', datum['${category}']))`},
                                            "y": {"signal": `scale('radial', datum['${value}']) * sin(scale('angular', datum['${category}']))`},
                                            "stroke": {"scale": "color", "field": group},
                                            "fill": {"scale": "color", "field": group},
                                            "fillOpacity": {"value": 0.1}
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "type": "symbol",
                            "from": {"data": datasetName},
                            "encode": {
                                "enter": {
                                    "x": {"signal": `scale('radial', datum['${value}']) * cos(scale('angular', datum['${category}']))`},
                                    "y": {"signal": `scale('radial', datum['${value}']) * sin(scale('angular', datum['${category}']))`},
                                    "fill": {"scale": "color", "field": group},
                                    "tooltip": {"field": value}
                                },
                                "update": {
                                    "size": {"value": 75},
                                    "zindex": {"value": 1}
                                },
                                "hover": {
                                    "size": {"value": 150},
                                    "zindex": {"value": 2}
                                }
                            }
                        },
                        {
                            "name": "labels",
                            "type": "text",
                            "from": {"data": keysData},
                            "encode": {
                                "enter": {
                                    "x": {"signal": `(${radiusSignal} + 15) * cos(scale('angular', datum['${category}']))`},
                                    "y": {"signal": `(${radiusSignal} + 15) * sin(scale('angular', datum['${category}']))`},
                                    "text": {"field": category},
                                    "align": {"signal": `abs(scale('angular', datum['${category}'])) > PI/2 ? 'right' : 'left'`},
                                    "baseline": {"signal": `scale('angular', datum['${category}']) > 0 ? 'top' : (scale('angular', datum['${category}']) == 0 ? 'middle' : 'bottom')`},
                                    "fontWeight": {"value": "bold"},
                                    "fill": {"value": "black"}
                                }
                            }
                        }
                    ]
                }
            ]
        };
    }
}