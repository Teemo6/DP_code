import React from 'react';
import { Card, Tag, Typography, Table, Empty } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { VegaMark } from './helper/markEdit.ts';

interface MarkCardProps {
    mark: VegaMark;
    markIndex: number;
    onPropertyChange: (markIndex: number, encodeSet: string, property: string, field: string, newValue: unknown) => void;
}

const ENCODE_SETS = ['enter', 'update', 'hover', 'exit'];

interface PropertyRow {
    key: string;
    property: string;
    field: string;
    value: unknown;
    encodeSet: string;
}

const columns = (
    markIndex: number,
    onPropertyChange: MarkCardProps['onPropertyChange']
): ColumnsType<PropertyRow> => [
    {
        title: 'Set',
        dataIndex: 'encodeSet',
        key: 'encodeSet',
        width: 80,
        render: (val: string) => <Tag>{val}</Tag>,
    },
    {
        title: 'Property',
        dataIndex: 'property',
        key: 'property',
        width: 120,
    },
    {
        title: 'Field',
        dataIndex: 'field',
        key: 'field',
        width: 100,
        render: (val: string) => <Typography.Text type="secondary">{val}</Typography.Text>,
    },
    {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        render: (val: unknown, row: PropertyRow) => {
            const display = val !== null && typeof val === 'object' ? JSON.stringify(val) : String(val ?? '');
            return (
                <Typography.Text
                    editable={{
                        onChange: newVal => {
                            const coerced = newVal.trim() !== '' && !isNaN(Number(newVal)) ? Number(newVal) : newVal;
                            onPropertyChange(markIndex, row.encodeSet, row.property, row.field, coerced);
                        },
                    }}
                >
                    {display}
                </Typography.Text>
            );
        },
    },
];

const MarkCard: React.FC<MarkCardProps> = ({ mark, markIndex, onPropertyChange }) => {
    const rows: PropertyRow[] = [];

    ENCODE_SETS.forEach(encodeSet => {
        const setObj = mark.encode?.[encodeSet];
        if (!setObj) return;
        Object.entries(setObj as Record<string, unknown>).forEach(([property, entry]) => {
            if (entry !== null && typeof entry === 'object' && !Array.isArray(entry)) {
                Object.entries(entry as Record<string, unknown>).forEach(([field, value]) => {
                    rows.push({ key: `${encodeSet}-${property}-${field}`, property, field, value, encodeSet });
                });
            }
        });
    });

    return (
        <Card
            size="small"
            style={{ marginBottom: 16 }}
            title={
                <Typography.Text>
                    <Tag color="blue">{mark.type}</Tag>
                    {mark.from?.data && (
                        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                            from: {mark.from.data}
                        </Typography.Text>
                    )}
                </Typography.Text>
            }
        >
            {rows.length === 0 ? (
                <Empty description="No encode properties" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
                <Table
                    columns={columns(markIndex, onPropertyChange)}
                    dataSource={rows}
                    size="small"
                    pagination={false}
                />
            )}
        </Card>
    );
};

export default MarkCard;