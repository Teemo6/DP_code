import { describe } from 'vitest';
import { validateWizardAdapter } from "../AdapterUtil";
import { RectAdapter } from "../../../../../src/components/wizard/adapters/append/RectAdapter";
import type { WizardConfig } from "../../../../../src/components/wizard/helper/wizardSpec";

describe('RectAdapter specifics', () => {
    const mockConfig: WizardConfig = {
        chartType: 'rect',
        datasetName: 'simple',
        fields: {
            category: 'category',
            value: 'value'
        }
    };

    validateWizardAdapter(
        RectAdapter,
        'append',
        ['category', 'value', 'colorBar', 'colorHover'],
        mockConfig
    );
});