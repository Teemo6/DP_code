import { useCallback } from 'react';
import type { VegaDataset } from '../helper/datasetEdit';
import {
    updateDatasetValue,
    addDatasetRow,
    deleteDatasetRow
} from '../helper/datasetEdit';
import { renameColumn, deleteColumn, addColumn } from '../helper/dataEdit';
import type { VegaEditorState } from "../../useVegaEditor";
import { gui4VegaLogger } from "../../../logger";

export const useDatasetActions = (editorState: VegaEditorState, dataset: VegaDataset) => {
    const updateSpec = useCallback((newCode: string) => {
        editorState.setCode(newCode);
    }, [editorState]);

    const updateDatasetRows = useCallback((updatedRows: Record<string, unknown>[]) => {
        try {
            const spec = JSON.parse(editorState.code);
            const ds = spec.data.find((d: VegaDataset) => d.name === dataset.name);
            if (ds) {
                ds.values = updatedRows;
            }
            updateSpec(JSON.stringify(spec, null, 2));
        } catch {
            gui4VegaLogger.error('Failed to update dataset rows: Invalid JSON in editor code.');
        }
    }, [editorState.code, dataset.name, updateSpec]);

    const handleColumnRename = useCallback((oldCol: string, newCol: string) => {
        const updatedRows = renameColumn(dataset.values, oldCol, newCol);
        updateDatasetRows(updatedRows);
    }, [dataset.values, updateDatasetRows]);

    const handleColumnDelete = useCallback((col: string) => {
        const updatedRows = deleteColumn(dataset.values, col);
        updateDatasetRows(updatedRows);
    }, [dataset.values, updateDatasetRows]);

    const handleColumnAdd = useCallback(() => {
        const existingCols = Object.keys(dataset.values[0] ?? {});
        const baseName = 'NewColumn';
        let col = baseName;
        let i = 1;
        while (existingCols.includes(col)) {
            col = `${baseName}${i}`;
            i++;
        }
        const updatedRows = addColumn(dataset.values, col);
        updateDatasetRows(updatedRows);
    }, [dataset.values, updateDatasetRows]);

    const handleAddRow = useCallback(() => {
        const keys = Object.keys(dataset.values[0] ?? {});
        const newRow = keys.reduce((acc, key) => ({ ...acc, [key]: '' }), {} as Record<string, unknown>);
        updateSpec(addDatasetRow(editorState.code, dataset.name, newRow));
    }, [dataset.values, dataset.name, editorState.code, updateSpec]);

    const handleDeleteRow = useCallback((rowIndex: number) => {
        updateSpec(deleteDatasetRow(editorState.code, dataset.name, rowIndex));
    }, [dataset.name, editorState.code, updateSpec]);

    const handleCellChange = useCallback((rowIndex: number, col: string, newValue: unknown) => {
        updateSpec(updateDatasetValue(editorState.code, dataset.name, rowIndex, col, newValue));
    }, [dataset.name, editorState.code, updateSpec]);

    return {
        handleColumnRename,
        handleColumnDelete,
        handleColumnAdd,
        handleAddRow,
        handleDeleteRow,
        handleCellChange
    };
};