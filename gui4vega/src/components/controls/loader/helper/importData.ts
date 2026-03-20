import type { VegaDataset } from "../../../data/helper/VegaDataset.ts";
import type { VegaSignal } from "../../../signal/helper/VegaSignal.ts";

/**
 * Imported Vega content used to merge external JSON into the current specification.
 */
export interface ImportedData {
    /**
     * Required base Vega specification object.
     */
    schema: Record<string, unknown>;

    /**
     * Optional datasets to prepend to `schema.data` in Vega specification.
     *
     * @remarks
     * - Datasets with the same `name` in the existing spec will be overwritten by imported ones.
     */
    datasets?: VegaDataset[];

    /**
     * Optional signals to prepend to `schema.signals` in Vega specification.
     *
     * @remarks
     * - Signals with the same `name` in the existing spec will be overwritten by imported ones.
     */
    signals?: VegaSignal[];
}

/**
 * Prepend imported named items and drop duplicates by `name`.
 *
 * @typeParam T - Item type with a unique `name` key.
 * @param existing - Existing schema property value.
 * @param imported - Imported items to prioritize; `undefined` or empty arrays keep existing order.
 * @returns A new ordered array, imported items first, then existing items that were not overwritten.
 *
 * @remarks
 * - Imported item order is preserved.
 * - Existing items that conflict with imported names are removed.
 */
function prependImported<T extends { name: string }>(existing: unknown, imported: T[] | undefined): T[] {
    // Type casting array
    const oldItems: T[] = Array.isArray(existing) ? (existing as T[]) : [];
    const newItems: T[] = Array.isArray(imported) ? imported : [];

    // If there is nothing to import, return existing
    if (!Array.isArray(newItems) || newItems.length === 0) {
        return oldItems;
    }

    // Filter duplicates
    const importedNames = new Set(newItems.map(item => item.name));
    const uniqueOld = oldItems.filter(item => !importedNames.has(item.name));

    // Imported items are first
    return [...newItems, ...uniqueOld];
}

/**
 * Returns a new schema with `datasets` prepended to the `data` array.
 *
 * @param baseSpec - Source Vega schema.
 * @param datasets - Imported datasets to prepend.
 * @returns A schema with merged `data` from `baseSpec` and `datasets`. Imported datasets are placed before existing.
 *
 * @remarks
 * - If `datasets` is `undefined` or empty, existing `data` is kept as-is.
 * - Existing datasets with matching `name` are replaced by imported datasets.
 */
export function prependDatasetsToSchema(baseSpec: Record<string, unknown>, datasets?: VegaDataset[]): Record<string, unknown> {
    return {
        ...baseSpec,
        data: prependImported(baseSpec.data, datasets)
    };
}

/**
 * Returns a new schema with `signals` prepended to the `signals` array.
 *
 * @param baseSpec - Source Vega schema.
 * @param signals - Imported signals to prepend.
 * @returns A schema with merged `signals` from `baseSpec` and `signals`. Imported signals are placed before existing.
 *
 * @remarks
 * - If `signals` is `undefined` or empty, existing `signals` is kept as-is.
 * - Existing signals with matching `name` are replaced by imported signals.
 */
export function prependSignalsToSchema(baseSpec: Record<string, unknown>, signals?: VegaSignal[]): Record<string, unknown> {
    return {
        ...baseSpec,
        signals: prependImported(baseSpec.signals, signals)
    };
}