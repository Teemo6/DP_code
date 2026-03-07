import React from 'react';
import { Alert, Layout } from 'antd';
import { useVegaView } from './useVegaView.ts';
import './VegaView.css';

interface VegaViewProps {
    code: string;
    hideActions?: boolean;
}

const VegaView: React.FC<VegaViewProps> = (props) => {
    const { vegaContainerRef, error } = useVegaView(props.code, props.hideActions);

    return (
        // Position must be relative to for action button to be positioned correctly
        <Layout style={{ height: '100%', position: 'relative' }}>
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