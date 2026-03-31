/**
 * Represents a signal in a Vega specification, containing its name and value.
 */
export interface VegaSignal {
    /**
     * The unique name of the signal to reference it within the Vega specification.
     */
    name: string;
    /**
     * The value of the signal, which can be of any type.
     */
    value: unknown;
    /**
     * HTML bind property.
     */
    bind?: unknown;
}

/**
 * Parses the given Vega specification code and extracts the signals defined in it.
 * @param code - The Vega specification code as a JSON string.
 * @returns An array of signals according to {@link VegaSignal} structure.
 * If the code is invalid or contains no signals, an empty array is returned.
 */
export function parseSignals(code: string): VegaSignal[] {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.signals)) return [];
        return spec.signals
            // Filter signals that do not follow VegaSignal structure
            .filter((s: VegaSignal) => s)
            .map((s: VegaSignal) => ({name: s.name, value: s.value, bind: s.bind}));
    } catch {
        return [];
    }
}