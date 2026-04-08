import { useMemo } from 'react';
import { Flex } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import EditableCell from '../EditableCell';
import DataDeleteButton from '../button/DataDeleteButton';
import type { VegaDataset } from "../helper/VegaDataset.ts";

/**
 * Props for {@link useDatasetColumns}.
 */
interface DatasetColumnsProps {
    /**
     * The Vega dataset for which to generate table columns.
     */
    dataset: VegaDataset;
    /**
     * If `true`, deleting a column or row will require user confirmation.
     */
    confirmDelete: boolean;
    /**
     * Callback invoked when a column is renamed.
     * Provides the old and new column names.
     * @param oldCol - The original column to be renamed.
     * @param newCol - The new column name after renaming.
     */
    onColumnRename: (oldCol: string, newCol: string) => void;
    /**
     * Callback invoked when a column is deleted.
     * @param col - The name of the column to be deleted.
     */
    onColumnDelete: (col: string) => void;
    /**
     * Callback invoked when a cell value is changed.
     * @param rowIndex - The index of the row containing the changed cell.
     * @param col - The column name of the changed cell.
     * @param newValue - The new value to set in the specified cell.
     */
    onCellChange: (rowIndex: number, col: string, newValue: unknown) => void;
    /**
     * Callback invoked when a row is deleted.
     * @param rowIndex - The index of the row to be deleted.
     */
    onDeleteRow: (rowIndex: number) => void;
}

/**
 * Custom hook to generate columns configuration for a Vega dataset.
 * @param props - {@link DatasetColumnsProps}
 * @returns An array of column definitions including editable cells and delete buttons.
 */
export const useDatasetColumns = (props: DatasetColumnsProps) => {
    return useMemo(() => {
        const firstRow = props.dataset?.values?.[0] || {};

        const cols: ColumnsType<Record<string, unknown>> = Object.keys(firstRow).map((col, colIndex) => ({
            // Editable cell column
            title: (
                <Flex align="center" justify="space-between" gap="small">
                    <EditableCell
                        value={col}
                        onSave={(newCol) => props.onColumnRename(col, String(newCol))}
                    />
                    <DataDeleteButton
                        index={colIndex}
                        type="column"
                        confirmDelete={props.confirmDelete}
                        onDelete={() => props.onColumnDelete(col)}
                    />
                </Flex>
            ),
            dataIndex: col,
            key: col,
            minWidth: 150,
            render: (val, _, rowIndex) => (
                <EditableCell
                    value={val}
                    onSave={(newValue) => props.onCellChange(rowIndex, col, newValue)}
                />
            ),
        }));

        // Delete button column
        cols.push({
            title: '',
            key: 'delete',
            width: 40,
            fixed: 'right',
            align: 'center',
            render: (_, __, rowIndex) => (
                <DataDeleteButton
                    index={rowIndex}
                    type='record'
                    confirmDelete={props.confirmDelete}
                    onDelete={() => props.onDeleteRow(rowIndex)}
                />
            ),
        });

        return cols;
    }, [props]);
};