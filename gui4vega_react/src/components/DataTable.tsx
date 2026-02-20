import React from 'react';
import { Table, Typography } from 'antd';
import type { VegaDataset } from '../types/vega';
import { buildColumns } from './DataTableColumns';

interface DataTableProps {
    dataset: VegaDataset;
    onCellChange: (rowIndex: number, col: string, newValue: unknown) => void;
}

const DataTable: React.FC<DataTableProps> = ({ dataset, onCellChange }) => {
    const columns = buildColumns(dataset.values[0] ?? {}, onCellChange);
    const dataSource = dataset.values.map((row, i) => ({ ...row, _rowKey: i }));

    return (
        <div style={{ marginBottom: 24 }}>
            <Typography.Title level={5} style={{ marginBottom: 8 }}>
                {dataset.name}
                <Typography.Text type="secondary" style={{ fontWeight: 400, marginLeft: 8, fontSize: 13 }}>
                    ({dataset.values.length} rows)
                </Typography.Text>
            </Typography.Title>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey="_rowKey"
                size="small"
                pagination={false}
                scroll={{ x: 'max-content' }}
            />
        </div>
    );
};

export default DataTable;