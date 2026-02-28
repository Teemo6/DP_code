import { useEffect, useRef, useState } from 'react';
import vegaEmbed from 'vega-embed';

export const useVegaView = (code: string) => {
    // Error state of the Vega spec parsing/rendering
    const [error, setError] = useState<string | null>(null);

    // Ref to the container div where Vega will render the visualization
    const vegaContainerRef = useRef<HTMLDivElement>(null);

    // Ref to hold the Vega view instance for cleanup purposes
    const vegaViewRef = useRef<{ view?: { finalize?: () => void } } | null>(null);

    // Effect to render the Vega visualization whenever the code prop changes
    useEffect(() => {
        const renderVega = async () => {
            if (!vegaContainerRef.current) return;
            try {
                // Cleanup previous view if present
                if (vegaViewRef.current && typeof vegaViewRef.current.view?.finalize === 'function') {
                    try {
                        vegaViewRef.current.view!.finalize();
                    } catch {
                        // Ignore cleanup errors
                    }
                    vegaViewRef.current = null;
                }
                const spec = JSON.parse(code);
                vegaViewRef.current = await vegaEmbed(vegaContainerRef.current, spec, { actions: false }) as unknown as { view?: { finalize?: () => void } };
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            }
        };
        renderVega();
    }, [code]);

    return { vegaContainerRef, error };
};