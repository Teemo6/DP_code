export interface VegaSignal {
    name: string;
    value: unknown;
}

export function parseSignals(code: string): VegaSignal[] {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.signals)) return [];
        return spec.signals
            // Filter signals without name or value
            .filter((s: VegaSignal) => s)
            .map((s: VegaSignal) => ({name: s.name, value: s.value}));
    } catch {
        return [];
    }
}