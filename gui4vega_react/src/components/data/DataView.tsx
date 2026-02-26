import React, { useMemo, useState } from 'react';
import { Typography } from 'antd';
import { parseDatasets, updateDatasetValue, addDatasetRow, deleteDatasetRow } from '../../types/vega';
import DataTable from './DataTable';

interface DataViewProps {
    code: string;
    onCodeChange: (code: string) => void;
}

const DataViewPanel: React.FC<DataViewProps> = ({ code, onCodeChange }) => {
    const datasets = useMemo(() => parseDatasets(code), [code]);
    // Lock state per dataset
    const [deleteLock, setDeleteLock] = useState<Record<string, boolean>>({});

    const handleLockChange = (datasetName: string, locked: boolean) => {
        setDeleteLock(prev => ({ ...prev, [datasetName]: locked }));
    };

    return (
        <div style={{ padding: 16, overflow: 'auto', height: '100%' }}>
            {datasets.length === 0 ? (
                <Typography.Text type="secondary">No inline data found in spec.</Typography.Text>
            ) : (
                datasets.map(ds => (
                    <DataTable
                        key={ds.name}
                        dataset={ds}
                        onCellChange={(rowIndex, col, newValue) =>
                            onCodeChange(updateDatasetValue(code, ds.name, rowIndex, col, newValue))
                        }
                        onAddRow={() => {
                            // Create a new row with same keys as first row, empty values
                            const keys = Object.keys(ds.values[0] ?? {});
                            const newRow = keys.reduce((acc, key) => ({ ...acc, [key]: '' }), {});
                            onCodeChange(addDatasetRow(code, ds.name, newRow));
                        }}
                        onDeleteRow={rowIndex =>
                            onCodeChange(deleteDatasetRow(code, ds.name, rowIndex))
                        }
                        deleteLock={deleteLock[ds.name]}
                        onLockChange={locked => handleLockChange(ds.name, locked)}
                        onColumnRename={(oldCol, newCol, updatedRows) => {
                            // Update the dataset in the spec
                            try {
                                const spec = JSON.parse(code);
                                const dataset = spec.data.find((d: any) => d.name === ds.name);
                                if (dataset) {
                                    dataset.values = updatedRows;
                                }
                                onCodeChange(JSON.stringify(spec, null, 2));
                            } catch {}
                        }}
                        onColumnDelete={(col, updatedRows) => {
                            try {
                                const spec = JSON.parse(code);
                                const dataset = spec.data.find((d: any) => d.name === ds.name);
                                if (dataset) {
                                    dataset.values = updatedRows;
                                }
                                onCodeChange(JSON.stringify(spec, null, 2));
                            } catch {}
                        }}
                        onColumnAdd={(col, updatedRows) => {
                            try {
                                const spec = JSON.parse(code);
                                const dataset = spec.data.find((d: any) => d.name === ds.name);
                                if (dataset) {
                                    dataset.values = updatedRows;
                                }
                                onCodeChange(JSON.stringify(spec, null, 2));
                            } catch {}
                        }}
                    />
                ))
            )}
        </div>
    );
};

export default DataViewPanel;