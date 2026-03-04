import React from 'react';
import { Row, Col, Flex, Typography, Input } from 'antd';
import type { ExportedData } from 'gui4vega_react';

const { Text } = Typography;
const { TextArea } = Input;

interface ExportedContentProps {
    data: ExportedData;
}

const ExportedContent: React.FC<ExportedContentProps> = (props: ExportedContentProps) => (
    <Row gutter={[16, 16]}>
        <Col span={8}>
            <Flex vertical gap={8}>
                <Text strong>Exported Specification:</Text>
                <TextArea
                    readOnly
                    value={props.data.spec}
                    autoSize={{ minRows: 8, maxRows: 8 }}
                    style={{ overflow: 'auto' }}
                />
            </Flex>
        </Col>
        <Col span={8}>
            <Flex vertical gap={8}>
                <Text strong>Exported Datasets:</Text>
                <TextArea
                    readOnly
                    value={props.data.datasets}
                    autoSize={{ minRows: 8, maxRows: 8 }}
                    style={{ overflow: 'auto' }}
                />
            </Flex>
        </Col>
        <Col span={8}>
            <Flex vertical gap={8}>
                <Text strong>Exported Signals:</Text>
                <TextArea
                    readOnly
                    value={props.data.signals}
                    autoSize={{ minRows: 8, maxRows: 8 }}
                    style={{ overflow: 'auto' }}
                />
            </Flex>
        </Col>
    </Row>
);

export default ExportedContent;