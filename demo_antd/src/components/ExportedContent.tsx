import React from 'react';
import { Row, Col, Flex, Typography, Input } from 'antd';

const { Text } = Typography;
const { TextArea } = Input;

interface ExportedContentProps {
    spec: string;
    datasets: string[];
    signals: string[];
}

const ExportedContent: React.FC<ExportedContentProps> = (props) => (
    <Row gutter={[16, 16]}>
        <Col span={8}>
            <Flex vertical gap={8}>
                <Text strong>Exported Specification:</Text>
                <TextArea
                    readOnly
                    value={props.spec}
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
                    value={props.datasets}
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
                    value={props.signals}
                    autoSize={{ minRows: 8, maxRows: 8 }}
                    style={{ overflow: 'auto' }}
                />
            </Flex>
        </Col>
    </Row>
);

export default ExportedContent;