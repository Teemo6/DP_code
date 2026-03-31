import type { VegaSignal } from './VegaSignal';

export function addSignal(code: string, name: string, value: unknown): string {
    try {
        const spec = JSON.parse(code);
        if (!spec.signals) spec.signals = [];
        spec.signals.push({ name, value });
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

export function updateSignal(code: string, name: string, value: unknown): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.signals)) return code;
        const index = spec.signals.findIndex((s: VegaSignal) => s.name === name);
        if (index !== -1) {
            spec.signals[index].value = value;
        }
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

export function updateSignalBind(code: string, name: string, bind: Record<string, unknown> | undefined): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.signals)) return code;
        const index = spec.signals.findIndex((s: VegaSignal) => s.name === name);
        if (index !== -1) {
            if (bind === undefined) {
                delete spec.signals[index].bind;
            } else {
                spec.signals[index].bind = bind;
            }
        }
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

export function deleteSignal(code: string, name: string): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.signals)) return code;
        spec.signals = spec.signals.filter((s: VegaSignal) => s.name !== name);
        if (spec.signals.length === 0) delete spec.signals;
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

export function moveSignal(code: string, name: string, direction: 'up' | 'down'): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.signals)) return code;
        const index = spec.signals.findIndex((s: VegaSignal) => s.name === name);
        if (index === -1) return code;
        if (direction === 'up' && index > 0) {
            const temp = spec.signals[index - 1];
            spec.signals[index - 1] = spec.signals[index];
            spec.signals[index] = temp;
        } else if (direction === 'down' && index < spec.signals.length - 1) {
            const temp = spec.signals[index + 1];
            spec.signals[index + 1] = spec.signals[index];
            spec.signals[index] = temp;
        }
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}