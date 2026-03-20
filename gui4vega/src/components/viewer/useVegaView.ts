import { useEffect, useRef, useState } from 'react';
import vegaEmbed from 'vega-embed';
import { gui4VegaLogger } from '../../logger';
import type { VegaEditorState } from "../useVegaEditor.ts";

interface useVegaViewProps {
    /**
     * Vega editor state with code specification.
     */
    editorState: VegaEditorState;
    hideActions: boolean;
}

export const useVegaView = (props: useVegaViewProps) => {
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
                    } catch (err) {
                        gui4VegaLogger.error('Error finalizing previous Vega view: ', err);
                    }
                    vegaViewRef.current = null;
                }
                const spec = JSON.parse(props.editorState.code);

                // 'false' will hide actions completely
                // 'editor: false' will only hide redirect button to Vega Editor
                const actions = props.hideActions ? false : { editor: false };

                vegaViewRef.current = await vegaEmbed(vegaContainerRef.current, spec, { actions }) as unknown as { view?: { finalize?: () => void } };
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            }
        };
        renderVega();
    }, [props.editorState.code, props.hideActions]);

    return { vegaContainerRef, error };
};