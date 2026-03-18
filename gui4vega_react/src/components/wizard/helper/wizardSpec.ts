import type { WizardAdapter } from "../adapters/WizardAdapter.ts";
import { BarVerticalAdapter } from "../adapters/template/BarVerticalAdapter.ts";
import { BarHorizontalAdapter } from "../adapters/template/BarHorizontalAdapter.ts";
import { PieAdapter } from "../adapters/template/PieAdapter.ts";
import { ScatterAdapter } from "../adapters/template/ScatterAdapter.ts";
import { RectAdapter } from "../adapters/append/RectAdapter.ts";

export type ChartType = 'barVertical' | 'barHorizontal' | 'pie' | 'scatter' | 'rect';

export interface WizardConfig {
    chartType: ChartType;
    datasetName: string;
    fields: Record<string, string>;
}

export const adapters: Record<ChartType, WizardAdapter> = {
    barVertical: new BarVerticalAdapter(),
    barHorizontal: new BarHorizontalAdapter(),
    pie: new PieAdapter(),
    scatter: new ScatterAdapter(),
    rect: new RectAdapter()
};

export function generateSpec(currentCode: string, config: WizardConfig): string {
    try {
        const currentSpec = JSON.parse(currentCode);
        const { chartType } = config;

        const adapter = adapters[chartType];
        if (!adapter) {
            return currentCode;
        }

        const newSpec = adapter.getSpec(config);

        if (adapter.mode === 'append') {
            // Append mode
            const merged = { ...currentSpec };

            if (newSpec.data) {
                merged.data = merged.data ? [...merged.data, ...newSpec.data] : [...newSpec.data];
            }
            if (newSpec.signals) {
                merged.signals = merged.signals ? [...merged.signals, ...newSpec.signals] : [...newSpec.signals];
            }
            if (newSpec.scales) {
                merged.scales = merged.scales ? [...merged.scales, ...newSpec.scales] : [...newSpec.scales];
            }
            if (newSpec.axes) {
                merged.axes = merged.axes ? [...merged.axes, ...newSpec.axes] : [...newSpec.axes];
            }
            if (newSpec.marks) {
                merged.marks = merged.marks ? [...merged.marks, ...newSpec.marks] : [...newSpec.marks];
            }
            if (newSpec.legends) {
                merged.legends = merged.legends ? [...merged.legends, ...newSpec.legends] : [...newSpec.legends];
            }

            return JSON.stringify(merged, null, 2);
        }

         // Prepend data
        if (currentSpec.data) {
             newSpec.data = newSpec.data ? [...currentSpec.data, ...newSpec.data] : [...currentSpec.data];
        }

        // Prepend signals
        if (currentSpec.signals) {
            newSpec.signals = newSpec.signals ? [...currentSpec.signals, ...newSpec.signals] : [...currentSpec.signals];
        }

        return JSON.stringify(newSpec, null, 2);

    } catch (e) {
        console.error("Error generating spec", e);
        return currentCode;
    }
}