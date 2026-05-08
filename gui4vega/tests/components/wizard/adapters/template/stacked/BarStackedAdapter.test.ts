import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { BarStackedAdapter } from "../../../../../../src/components/wizard/adapters/template/stacked/BarStackedAdapter";
import type { WizardConfig } from "../../../../../../src/components/wizard/helper/wizardSpec";

describe('BarStackedAdapter specifics', () => {
    const mockConfig: WizardConfig = {
        chartType: 'barStacked',
        datasetName: 'grouped',
        fields: {
            category: 'category',
            value: 'value',
            group: 'group'
        }
    };

    validateWizardAdapter(
        BarStackedAdapter,
        'template',
        ['category', 'value', 'group'],
        mockConfig
    );
});