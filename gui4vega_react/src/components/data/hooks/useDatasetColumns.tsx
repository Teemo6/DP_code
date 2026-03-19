import {useMemo} from 'react';
import {Space} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import type {VegaDataset} from '../helper/datasetEdit';
import EditableCell from '../EditableCell';
import DataDeleteButton from '../button/DataDeleteButton';

interface DatasetColumnsProps {
    dataset: VegaDataset;
    confirmDelete: boolean;
    onColumnRename: (oldCol: string, newCol: string) => void;
    onColumnDelete: (col: string) => void;
    onCellChange: (rowIndex: number, col: string, newValue: unknown) => void;
    onDeleteRow: (rowIndex: number) => void;
}

export const useDatasetColumns = (props: DatasetColumnsProps) => {

    return useMemo(() => {
        const firstRow = props.dataset.values[0] || {};
        const cols: ColumnsType<Record<string, unknown>> = Object.keys(firstRow).map((col, colIndex) => ({
            title: (
                <Space align="center" size="small">
                    <EditableCell
                        value={col}
                        onSave={newCol => typeof newCol === 'string' && props.onColumnRename(col, newCol)}
                    />
                    <DataDeleteButton
                        index={colIndex}
                        type="column"
                        confirmDelete={props.confirmDelete}
                        onDelete={() => props.onColumnDelete(col)}
                    />
                </Space>
            ),
            dataIndex: col,
            key: col,
            render: (val: unknown, _row: Record<string, unknown>, rowIndex: number) => (
                <EditableCell
                    value={val}
                    onSave={newValue => props.onCellChange(rowIndex, col, newValue)}
                />
            ),
        }));

        // Add Delete Row Column
        cols.push({
            title: '',
            key: 'delete',
            render: (_: unknown, _row: Record<string, unknown>, rowIndex: number) => (
                <DataDeleteButton
                    index={rowIndex}
                    type='record'
                    confirmDelete={props.confirmDelete}
                    onDelete={props.onDeleteRow}
                />
            ),
        });

        return cols;
    }, [props]);
};