export type VegaSchemaType = Record<string, any>;

export interface VegaEditorProps {
    initialSchema?: VegaSchemaType;
    data?: Record<string, any>[];
    onSave?: (schema: VegaSchemaType) => void;
    height?: string;
}