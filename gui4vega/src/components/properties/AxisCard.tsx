import React from 'react';
import { Card, Tag, Typography, Table, Flex } from 'antd';
import type { VegaAxis } from './helper/axisEdit.ts';

/**
 * Props for {@link AxisCard}.
 */
interface AxisCardProps {
    /**
     * The Vega axis object.
     */
    axis: VegaAxis;
    /**
     * The index of the axis in the Vega specification.
     */
    axisIndex: number;
    /**
     * Callback function that is called when the user changes the title of the axis.
     * @param axisIndex - The index of the axis being updated.
     * @param newTitle - The new title value entered by the user for the axis.
     */
    onPropertyChange: (axisIndex: number, property: string, newValue: string) => void;
}

/**
 * Component responsible for editing of properties of a Vega axis.
 * @param props - {@link AxisCardProps}
 */
const AxisCard: React.FC<AxisCardProps> = (props) => {
    // Transform axis properties into a data source for the table
    const dataSource = Object.entries(props.axis).map(([prop, val]) => ({
        key: prop,
        property: prop,
        value: val
    }));

    // Define columns for the properties table
    const columns = [
        { title: 'Property', dataIndex: 'property', width: 120 },
        {
            title: 'Value',
            dataIndex: 'value',
            render: (val: unknown, row: { property: string }) => (
                <Typography.Text editable={{ onChange: v => props.onPropertyChange(props.axisIndex, row.property, v) }}>
                    {val !== null && typeof val === 'object' ? JSON.stringify(val) : String(val ?? '') || 'Click to edit...'}
                </Typography.Text>
            )
        }
    ];

    return (
        <Card
            size="small"
            title={
                <Flex align="center" gap={8}>
                    <Tag color="cyan">axis</Tag>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                        {props.axis.orient || props.axis.scale || `Axis ${props.axisIndex + 1}`}
                    </Typography.Text>
                </Flex>
            }
        >
            <Table columns={columns} dataSource={dataSource} size="small" pagination={false} />
        </Card>
    );
};

export default AxisCard;