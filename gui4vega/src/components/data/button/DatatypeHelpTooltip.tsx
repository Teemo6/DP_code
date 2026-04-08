import React from 'react';
import { Typography, Tooltip, theme } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * Component responsible for rendering a help tooltip that explains the available datatypes in Vega datasets or signals.
 */
const DatatypeHelpTooltip: React.FC = () => {
    // Access Ant Design theme token
    const { token: antdToken } = theme.useToken();

    // Explain available datatypes in Vega datasets or signals
    const tooltipContent = (
        <div style={{ padding: '4px 0' }}>
            <Text strong style={{ color: 'inherit' }}>Available datatypes:</Text>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
                <li><strong>String:</strong> text (if not any options below)</li>
                <li><strong>Number:</strong> 123, 12.3 (use dot for decimals)</li>
                <li><strong>Boolean:</strong> true, false</li>
                <li><strong>Others:</strong> null</li>
            </ul>
        </div>
    );

    return (
        <Tooltip title={tooltipContent}>
            <QuestionCircleOutlined
                style={{
                    color: antdToken.colorTextDescription,
                    fontSize: antdToken.fontSizeSM,
                    cursor: 'help'
                }}
            />
        </Tooltip>
    );
};

export default DatatypeHelpTooltip;