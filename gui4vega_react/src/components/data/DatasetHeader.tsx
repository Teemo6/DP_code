import React from 'react';
import { Typography, Flex, Space, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import DatasetDeleteButton from './button/DatasetDeleteButton';

const { Text } = Typography;

interface DatasetHeaderProps {
    datasetName: string;
    rowCount: number;
    tableVisible: boolean;
    onToggleTable: () => void;
    onDeleteDataset: (datasetName: string) => void;
}

const DatasetHeader: React.FC<DatasetHeaderProps> = (props: DatasetHeaderProps) => {
    return (
        <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
            <Space>
                <Text strong style={{ fontSize: 16 }}>
                    {props.datasetName}
                </Text>
                <Button
                    icon={props.tableVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    onClick={props.onToggleTable}
                    size="small"
                    type="text"
                />
                <Text type="secondary" style={{ fontSize: 12 }}>
                    {props.rowCount} rows
                </Text>
            </Space>
            <DatasetDeleteButton datasetName={props.datasetName} onDelete={props.onDeleteDataset} />
        </Flex>
    );
};

export default DatasetHeader;