import React from 'react';
import { Typography, Button, Checkbox, Space } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

interface EditableDatasetHeaderProps {
    datasetName: string;
    rowCount: number;
    confirmDelete: boolean;
    onAddRow: () => void;
    onAddColumn: () => void;
    onConfirmDeleteChange: (checked: boolean) => void;
    tableVisible: boolean;
    onToggleTable: () => void;
}

const EditableDatasetHeader: React.FC<EditableDatasetHeaderProps> = (props) => (
    <Space align="center" style={{ width: '100%' }}>
        <Button
            icon={props.tableVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={props.onToggleTable}
            size="small"
            title={props.tableVisible ? 'Hide Table' : 'Show Table'}
        />
        <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            {props.rowCount} rows
        </Typography.Text>
        {props.tableVisible && (
            <>
                <Button size="small" type="primary" onClick={props.onAddRow}>
                    Add Record
                </Button>
                <Button size="small" onClick={props.onAddColumn}>
                    Add Column
                </Button>
                <Checkbox
                    checked={props.confirmDelete}
                    onChange={e => props.onConfirmDeleteChange(e.target.checked)}
                >
                    Confirm Delete
                </Checkbox>
            </>
        )}
    </Space>
);

export default EditableDatasetHeader;