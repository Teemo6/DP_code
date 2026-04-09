import React from 'react';
import { Card, Tag, Typography, Table, Flex } from 'antd';
import type { VegaLegend } from './helper/VegaLegend.ts';

/**
 * Props for {@link LegendCard}.
 */
interface LegendCardProps {
    /**
     * The Vega legend object.
     */
    legend: VegaLegend;
    /**
     * The index of the legend in the Vega specification.
     */
    legendIndex: number;
    /**
     * Callback function that is called when the user changes a property of the legend.
     */
    onPropertyChange: (legendIndex: number, property: string, newValue: string) => void;
}

/**
 * Component responsible for editing of properties of a Vega legend.
 * @param props - {@link LegendCardProps}
 */
const LegendCard: React.FC<LegendCardProps> = (props) => {
    // Transform legend properties into a data source for the table
    const dataSource = Object.entries(props.legend).map(([prop, val]) => ({
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
                <Typography.Text editable={{ onChange: v => props.onPropertyChange(props.legendIndex, row.property, v) }}>
                    {val !== null && typeof val === 'object' ? JSON.stringify(val) : String(val ?? '') || 'Click to edit...'}
                </Typography.Text>
            )
        }
    ];

    return (
        <Card
            size="small"
            style={{ marginBottom: 16 }}
            title={
                <Flex align="center" gap={8}>
                    <Tag color="purple">legend</Tag>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                        {props.legend.title || props.legend.fill || `Legend ${props.legendIndex + 1}`}
                    </Typography.Text>
                </Flex>
            }
        >
            <Table columns={columns} dataSource={dataSource} size="small" pagination={false} />
        </Card>
    );
};

export default LegendCard;