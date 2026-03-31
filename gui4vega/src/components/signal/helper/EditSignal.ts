import type { VegaSignal } from './VegaSignal';

/**
 * Adds a new signal with the specified name and value to the Vega specification code.
 * @param code - The Vega specification code as a JSON string.
 * @param signalName - The name of the signal to add.
 * @param value - The value of the signal to add, which can be of any type.
 * @return The updated Vega specification code as a JSON string, or the original code if addition fails.
 */
export function addSignal(code: string, signalName: string, value: unknown): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.signals)) spec.signals = [];

        // Ensure unique name
        if (spec.signals.some((s: VegaSignal) => s.name === signalName)) return code;
        spec.signals.push({ name: signalName, value });

        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

/**
 * Deletes a signal with the specified name from the Vega specification code.
 * @param code - The Vega specification code as a JSON string.
 * @param signalName - The name of the signal to delete.
 * @returns The updated Vega specification code as a JSON string, or the original code if deletion fails.
 */
export function deleteSignal(code: string, signalName: string): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.signals)) return code;

        // Filter signal with the given name
        spec.signals = spec.signals.filter((s: VegaSignal) => s.name !== signalName);

        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

/**
 * Updates the value of a signal with the specified name in the Vega specification code.
 * @param code - The Vega specification code as a JSON string.
 * @param signalName - The name of the signal to update.
 * @param value - The new value of the signal, which can be of any type.
 * @returns The updated Vega specification code as a JSON string, or the original code if update fails.
 */
export function updateSignal(code: string, signalName: string, value: unknown): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.signals)) return code;

        // Update the signal based on its index in the array
        const index = spec.signals.findIndex((s: VegaSignal) => s.name === signalName);
        if (index !== -1) {
            spec.signals[index].value = value;
        }

        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}

/**
 * Updates the bind property of a signal with the specified name in the Vega specification code.
 * @param code - The Vega specification code as a JSON string.
 * @param signalName - The name of the signal to update.
 * @param bind - The new bind value, which can be an object or undefined if the bind is removed.
 * @returns The updated Vega specification code as a JSON string, or the original code if update fails.
 */
export function updateSignalBind(code: string, signalName: string, bind: Record<string, unknown> | undefined): string {
    try {
        const spec = JSON.parse(code);
        if (!Array.isArray(spec.signals)) return code;

        // Update the signal based on its index in the array
        const index = spec.signals.findIndex((s: VegaSignal) => s.name === signalName);
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

/**
 * Moves a signal with the specified name up or down in the order of the Vega specification's signals array.
 * @param code - The Vega specification code as a JSON string.
 * @param signalName - The name of the signal to move.
 * @param direction - The direction to move the signal, either 'up' or 'down'.
 * @returns The updated Vega specification code as a JSON string, or the original code if movement fails.
 */
export function moveSignal(code: string, signalName: string, direction: 'up' | 'down'): string {
    try {
        const spec = JSON.parse(code);
        const signals = spec?.signals;

        // No signals found, nothing to move
        if (!Array.isArray(signals)) return code;

        // Find the valid index of the dataset to move
        const currentIndex = signals.findIndex((s: VegaSignal) => s.name === signalName);
        if (currentIndex === -1) return code;

        // Move the signal up or down by swapping it with the adjacent signal
        if (direction === 'up' && currentIndex > 0) {
            const temp = signals[currentIndex - 1];
            signals[currentIndex - 1] = signals[currentIndex];
            spec.signals[currentIndex] = temp;
        } else if (direction === 'down' && currentIndex < signals.length - 1) {
            const temp = spec.signals[currentIndex + 1];
            signals[currentIndex + 1] = spec.signals[currentIndex];
            signals[currentIndex] = temp;
        }

        return JSON.stringify(spec, null, 2);
    } catch {
        return code;
    }
}