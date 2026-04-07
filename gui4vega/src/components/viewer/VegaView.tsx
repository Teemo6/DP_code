import React from 'react';
import { Alert, Layout } from 'antd';
import { useVegaView } from './useVegaView.ts';
import './VegaView.css';
import type { VegaEditorState } from "../useVegaEditor.ts";

/**
 * Props for {@link VegaView}.
 */
interface VegaViewProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
    /**
     * When `true`, hides the action buttons in the Vega view.
     */
    hideActions: boolean;
}

/**
 * Component responsible for rendering the Vega visualization based on the provided specification code.
 */
const VegaView: React.FC<VegaViewProps> = (props: VegaViewProps) => {
    // Call useVegaView hook
    const { vegaContainerRef, error } = useVegaView(props);

    return (
        // Position must be relative to for action button to be positioned correctly
        <Layout style={{ height: '100%', position: 'relative' }}>
            <Layout
                ref={vegaContainerRef}
                style={{ overflow: 'auto' }}
                onSubmitCapture={(e) => e.preventDefault()}
            />
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