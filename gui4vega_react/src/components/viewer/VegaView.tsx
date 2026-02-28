import React from 'react';
import { Alert, Layout } from 'antd';
import { useVegaView } from './useVegaView.ts'; // Import your new hook

interface VegaViewProps {
    code: string;
}

const VegaView: React.FC<VegaViewProps> = (props) => {
    const { vegaContainerRef, error } = useVegaView(props.code);

    return (
        <Layout style={{ height: '100%' }}>
            {/* Vega view should always have white background */}
            <Layout ref={vegaContainerRef} style={{ overflow: 'auto', background: '#fff' }} />
            {error && (
                <Alert
                    type="error"
                    showIcon
                    title="Invalid Vega Specification"
                    description={error}
                />
            )}
        </Layout>
    );
};

export default VegaView;