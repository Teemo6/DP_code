import { useCallback } from 'react';
import { renameColumn, deleteColumn, addColumn } from '../helper/EditColumn.ts';
import { transformSpec, addDatasetRow, deleteDatasetRow, updateDatasetValue } from "../helper/EditRow.ts";
import type { VegaEditorState } from "../../useVegaEditor";
import type { VegaDataset } from "../helper/VegaDataset.ts";

/**
 * Custom hook to manage dataset actions in a Vega spec editor.
 * @param editorState - The current state of the Vega editor
 * @param dataset - The dataset being edited
 * @returns An object containing handlers for further processing
 */
export const useDatasetActions = (editorState: VegaEditorState, dataset: VegaDataset) => {
    // Apply dataset transformation in Vega spec
    const applyUpdate = useCallback((transform: (ds: VegaDataset) => void) => {
        const newCode = transformSpec(editorState.code, dataset.name, transform);
        if (newCode !== editorState.code) editorState.setCode(newCode);
    }, [editorState, dataset.name]);

    // Add column
    const handleColumnAdd = useCallback((defaultValue: unknown = '') => {
        applyUpdate((ds) => {
            const existing = Object.keys(ds.values[0] ?? {});
            let col = 'NewColumn', i = 1;
            while (existing.includes(col)) col = `NewColumn${i++}`;
            ds.values = addColumn(ds.values, col, defaultValue);
        });
    }, [applyUpdate]);

    // Delete column
    const handleColumnDelete = useCallback((col: string) => {
        applyUpdate((ds) => { ds.values = deleteColumn(ds.values, col); });
    }, [applyUpdate]);

    // Rename column
    const handleColumnRename = useCallback((oldCol: string, newCol: string) => {
        applyUpdate((ds) => { ds.values = renameColumn(ds.values, oldCol, newCol); });
    }, [applyUpdate]);

    // Add row
    const handleAddRow = useCallback(() => {
        const keys = Object.keys(dataset.values[0] ?? {});
        const newRow = keys.reduce((acc, key) => ({ ...acc, [key]: '' }), {});
        applyUpdate((ds) => addDatasetRow(ds, newRow));
    }, [dataset.values, applyUpdate]);

    // Delete row
    const handleDeleteRow = useCallback((index: number) => {
        applyUpdate((ds) => deleteDatasetRow(ds, index));
    }, [applyUpdate]);

    // Update cell value
    const handleCellChange = useCallback((index: number, col: string, val: unknown) => {
        applyUpdate((ds) => updateDatasetValue(ds, index, col, val));
    }, [applyUpdate]);

    return {
        handleColumnRename,
        handleColumnDelete,
        handleColumnAdd,
        handleAddRow,
        handleDeleteRow,
        handleCellChange
    };
};