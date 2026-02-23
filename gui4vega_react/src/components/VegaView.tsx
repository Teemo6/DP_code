import React, { useEffect, useRef, useState } from 'react';
import vegaEmbed from 'vega-embed';
import { Alert } from 'antd';

interface VegaViewProps {
    code: string;
}

const VegaView: React.FC<VegaViewProps> = ({ code }) => {
    const [error, setError] = useState<string | null>(null);
    const vegaContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const renderVega = async () => {
            if (!vegaContainerRef.current) return;
            try {
                const spec = JSON.parse(code);
                await vegaEmbed(vegaContainerRef.current, spec, { actions: true });
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            }
        };
        renderVega();
    }, [code]);

    return (
        <div style={{ padding: 16 }}>
            <div
                ref={vegaContainerRef}
            />
            {error && (
                <Alert
                    type="error"
                    showIcon
                    title="Invalid Vega Specification"
                    description={error}
                    style={{ marginBottom: 16 }}
                />
            )}
        </div>
    );
};

export default VegaView;
