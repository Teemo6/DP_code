export interface VegaMark {
    type: string;
    from?: { data: string };
    encode?: Record<string, Record<string, unknown>>;
    [key: string]: unknown;
}

export function parseMarks(code: string): VegaMark[] {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.marks)) return [];
        return spec.marks;
    } catch {
        return [];
    }
}

export function updateMarkProperty(
    code: string,
    markIndex: number,
    encodeSet: string,
    property: string,
    field: string,
    newValue: unknown
): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.marks) || !spec.marks[markIndex]) return code;
        const mark = spec.marks[markIndex];
        if (!mark.encode) mark.encode = {};
        if (!mark.encode[encodeSet]) mark.encode[encodeSet] = {};
        const entry = mark.encode[encodeSet][property];
        if (entry !== null && typeof entry === 'object' && !Array.isArray(entry)) {
            (entry as Record<string, unknown>)[field] = newValue;
        } else {
            mark.encode[encodeSet][property] = { [field]: newValue };
        }
        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}