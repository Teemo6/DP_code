import React from 'react';
import { Typography, Flex, Space, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import DatasetDeleteButton from './button/DatasetDeleteButton';

const { Text } = Typography;

/**
 * Props for {@link DatasetHeader}.
 */
interface DatasetHeaderProps {
    /**
     * The name of the dataset to be displayed in the header.
     */
    datasetName: string;
    /**
     * The number of rows in the dataset, displayed in the header for user reference.
     */
    rowCount: number;
    /**
     * Boolean indicating whether the dataset table editor is currently visible.
     */
    tableVisible: boolean;
    /**
     * Callback function invoked when the user clicks the toggle button to show or hide the dataset table editor.
     */
    onToggleTable: () => void;
    /**
     * Callback function invoked when the user clicks the delete button to remove the dataset from the Vega specification.
     * @param datasetName - The name of the dataset to be deleted.
     */
    onDeleteDataset: (datasetName: string) => void;
    /**
     * Callback function invoked when the user clicks the move up or move down buttons to reorder the dataset in the list.
     * @param datasetName - The name of the dataset to be moved.
     * @param direction - The direction to move the dataset, either 'up' or 'down'.
     */
    onMoveDataset: (datasetName: string, direction: 'up' | 'down') => void;
}

/**
 * Component responsible for rendering the header section of a dataset editor.
 * @param props - {@link DatasetHeaderProps}
 */
const DatasetHeader: React.FC<DatasetHeaderProps> = (props: DatasetHeaderProps) => {
    return (
        <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
            <Space>
                <Flex vertical align="center">
                    <Button
                        icon={<UpOutlined />}
                        onClick={() => props.onMoveDataset(props.datasetName, 'up')}
                        size="small"
                        type="text"
                        title="Move up"
                    />
                    <Button
                        icon={<DownOutlined />}
                        onClick={() => props.onMoveDataset(props.datasetName, 'down')}
                        size="small"
                        type="text"
                        title="Move down"
                    />
                </Flex>
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