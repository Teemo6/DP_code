import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { BarGroupedAdapter } from "../../../../../../src/components/wizard/adapters/template/stacked/BarGroupedAdapter";
import type { WizardConfig } from "../../../../../../src/components/wizard/helper/wizardSpec";

describe('BarGroupedAdapter specifics', () => {
    const mockConfig: WizardConfig = {
        chartType: 'barGrouped',
        datasetName: 'grouped',
        fields: {
            category: 'category',
            value: 'value',
            group: 'group'
        }
    };

    validateWizardAdapter(
        BarGroupedAdapter,
        'template',
        ['category', 'value', 'group'],
        mockConfig
    );
});