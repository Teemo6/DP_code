import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { SpiderAdapter } from "../../../../../../src/components/wizard/adapters/template/stacked/SpiderAdapter";
import type { WizardConfig } from "../../../../../../src/components/wizard/helper/wizardSpec";

describe('SpiderAdapter specifics', () => {
    const mockConfig: WizardConfig = {
        chartType: 'spider',
        datasetName: 'grouped',
        fields: {
            category: 'category',
            value: 'value',
            group: 'group'
        }
    };

    validateWizardAdapter(
        SpiderAdapter,
        'template',
        ['category', 'value', 'group'],
        mockConfig
    );
});