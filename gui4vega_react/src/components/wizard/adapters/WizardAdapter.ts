import type { WizardConfig } from "../helper/wizardSpec.ts";

export interface WizardField {
    name: string;
    label: string;
    type: 'string' | 'number' | 'boolean' | 'color';
    required?: boolean;
    defaultValue?: string | number | boolean;
}

export interface WizardSpec {
    $schema?: string;
    description?: string;
    width?: number;
    height?: number;
    padding?: number;
    autosize?: string;
    data?: Record<string, unknown>[];
    signals?: Record<string, unknown>[];
    scales?: Record<string, unknown>[];
    axes?: Record<string, unknown>[];
    marks?: Record<string, unknown>[];
    legends?: Record<string, unknown>[];
    [key: string]: unknown;
}

export type AdapterMode = 'template' | 'append';

export interface WizardAdapter {
    mode: AdapterMode;
    getFields(): WizardField[];
    getSpec(config: WizardConfig): WizardSpec;
}