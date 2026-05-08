import { describe } from 'vitest';
import { validateWizardAdapter } from "../AdapterUtil";
import { SymbolAdapter } from "../../../../../src/components/wizard/adapters/append/SymbolAdapter";
import type { WizardConfig } from "../../../../../src/components/wizard/helper/wizardSpec";

describe('SymbolAdapter specifics', () => {
    const mockConfig: WizardConfig = {
        chartType: 'symbol',
        datasetName: 'simple',
        fields: {
            category: 'category',
            value: 'value'
        }
    };

    validateWizardAdapter(
        SymbolAdapter,
        'append',
        ['category', 'value', 'symbolShape', 'symbolSize', 'colorBase', 'colorHover', 'strokeWidth', 'strokeColor'],
        mockConfig
    );
});