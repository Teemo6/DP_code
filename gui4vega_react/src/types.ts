export type VegaSchemaType = Record<string, unknown>;

export interface VegaEditorProps {
    initialSchema?: VegaSchemaType;
    data?: Record<string, unknown>[];
    onSave?: (schema: VegaSchemaType) => void;
    height: string;
    width?: string;
}