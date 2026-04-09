export interface VegaAxis {
    orient?: string;
    scale?: string;
    title?: string;
    [key: string]: unknown;
}

export function parseAxes(code: string): VegaAxis[] {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.axes)) return [];
        return spec.axes;
    } catch {
        return [];
    }
}

export function updateAxisProperty(
    code: string,
    axisIndex: number,
    property: string,
    newValue: unknown
): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.axes) || !spec.axes[axisIndex]) return code;
        spec.axes[axisIndex][property] = newValue;
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

