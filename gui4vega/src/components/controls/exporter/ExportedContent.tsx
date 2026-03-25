import React from 'react';
import { Row, Col, Flex, Typography, Input } from 'antd';
import type { ExportedData } from './helper/exportSelectedData';

const { Text } = Typography;
const { TextArea } = Input;

/**
 * Props for {@link ExportedContent}.
 */
export interface ExportedContentProps {
    /**
     * The exported data containing the Vega specification, datasets, and signals that are selected for export.
     */
    data: ExportedData;
}

/**
 * Component responsible for displaying the exported Vega specification, datasets, and signals in a structured layout.
 * @param props - {@link ExportedContentProps}
 */
const ExportedContent: React.FC<ExportedContentProps> = (props: ExportedContentProps) => (
    <Row gutter={[16, 16]}>
        <Col span={8}>
            <Flex vertical gap={8}>
                <Text strong>Exported Specification:</Text>
                <TextArea
                    readOnly
                    value={props.data.spec}
                    autoSize={{ minRows: 10, maxRows: 10 }}
                />
            </Flex>
        </Col>
        <Col span={8}>
            <Flex vertical gap={8}>
                <Text strong>Exported Datasets:</Text>
                <TextArea
                    readOnly
                    value={props.data.datasets}
                    autoSize={{ minRows: 10, maxRows: 10 }}
                />
            </Flex>
        </Col>
        <Col span={8}>
            <Flex vertical gap={8}>
                <Text strong>Exported Signals:</Text>
                <TextArea
                    readOnly
                    value={props.data.signals}
                    autoSize={{ minRows: 10, maxRows: 10 }}
                />
            </Flex>
        </Col>
    </Row>
);

export default ExportedContent;