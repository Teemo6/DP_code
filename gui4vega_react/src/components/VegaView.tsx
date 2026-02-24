import React, { useEffect, useRef, useState } from 'react';
import vegaEmbed from 'vega-embed';
import { Alert } from 'antd';

interface VegaViewProps {
    code: string;
}

const VegaView: React.FC<VegaViewProps> = ({ code }) => {
    const [error, setError] = useState<string | null>(null);
    const vegaContainerRef = useRef<HTMLDivElement>(null);
    const vegaViewRef = useRef<{ view?: { finalize?: () => void } } | null>(null);

    useEffect(() => {
        const renderVega = async () => {
            if (!vegaContainerRef.current) return;
            try {
                // cleanup previous view if present
                if (vegaViewRef.current && typeof vegaViewRef.current.view?.finalize === 'function') {
                    try {
                        vegaViewRef.current.view!.finalize();
                    } catch {
                        // ignore cleanup errors
                    }
                    vegaViewRef.current = null;
                }

                const spec = JSON.parse(code);
                vegaViewRef.current = await vegaEmbed(vegaContainerRef.current, spec, { actions: true }) as unknown as { view?: { finalize?: () => void } };
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            }
        };
        renderVega();
    }, [code]);

    return (
        <div style={{ height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, minHeight: 0, overflow: 'auto', width: '100%' }}>
                <div ref={vegaContainerRef} />
            </div>

            {error && (
                <div style={{ flex: 'none' }}>
                    <Alert
                        type="error"
                        showIcon
                        title="Invalid Vega Specification"
                        description={error}
                    />
                </div>
            )}
        </div>
    );
};

export default VegaView;
