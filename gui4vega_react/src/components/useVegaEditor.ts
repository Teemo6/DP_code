import { useState } from 'react';
import defaultSpec from '../assets/default.json';
import { prependDatasetsToSchema, prependSignalsToSchema } from "./loader/helper/importData.ts";
import type { ImportedData } from "./loader/helper/importData.ts";

interface useVegaEditorProps {
    initialSchema?: ImportedData;
}

export const useVegaEditor = (props: useVegaEditorProps) => {
    // State to hold the current Vega specification code
    const [code, setCode] = useState<string>(() => {
        // Start with the provided initial schema or fall back to the default spec
        let baseSpec = props.initialSchema?.schema ?? defaultSpec;

        // Prepend datasets and signals from the initial schema to the base spec if they exist
        baseSpec = prependDatasetsToSchema(baseSpec, props.initialSchema);
        baseSpec = prependSignalsToSchema(baseSpec, props.initialSchema);

        return JSON.stringify(baseSpec, null, 2);
    });

    // Handler for when a new spec is loaded from the SpecLoader component
    const handleSpecLoad = (spec: unknown) => {
        setCode(JSON.stringify(spec, null, 2));
    };

    return { code, setCode, handleSpecLoad };
};