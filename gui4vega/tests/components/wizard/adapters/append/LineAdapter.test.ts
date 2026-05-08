import { describe } from 'vitest';
import { validateWizardAdapter } from "../AdapterUtil";
import { LineAdapter } from "../../../../../src/components/wizard/adapters/append/LineAdapter";
import type { WizardConfig } from "../../../../../src/components/wizard/helper/wizardSpec";

describe('LineAdapter specifics', () => {
    const mockConfig: WizardConfig = {
        chartType: 'line',
        datasetName: 'simple',
        fields: {
            category: 'category',
            value: 'value'
        }
    };

    validateWizardAdapter(
        LineAdapter,
        'append',
        ['category', 'value', 'colorLine', 'strokeWidth'],
        mockConfig
    );
});