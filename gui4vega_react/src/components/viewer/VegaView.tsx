import React from 'react';
import { Alert, Layout } from 'antd';
import { useVegaView } from './useVegaView.ts';
import './VegaView.css';

/**
 * Props for {@link VegaView}.
 */
interface VegaViewProps {
    /**
     * The Vega specification code to render the visualization.
     */
    code: string;
    /**
     * When `true`, hides the action buttons in the Vega view.
     */
    hideActions?: boolean;
}

/**
 * Component responsible for rendering the Vega visualization based on the provided specification code.
 */
const VegaView: React.FC<VegaViewProps> = (props: VegaViewProps) => {
    // Call useVegaView hook
    const { vegaContainerRef, error } = useVegaView(props.code, props.hideActions);

    return (
        // Position must be relative to for action button to be positioned correctly
        <Layout style={{ height: '100%', position: 'relative' }}>
            <Layout ref={vegaContainerRef} style={{ overflow: 'auto' }} />
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