import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { AreaStackedAdapter } from "../../../../../../src/components/wizard/adapters/template/stacked/AreaStackedAdapter";
import type { WizardConfig } from "../../../../../../src/components/wizard/helper/wizardSpec";

describe('AreaStackedAdapter specifics', () => {
    const mockConfig: WizardConfig = {
        chartType: 'stackedArea',
        datasetName: 'grouped',
        fields: {
            category: 'category',
            value: 'value',
            group: 'group'
        }
    };

    validateWizardAdapter(
        AreaStackedAdapter,
        'template',
        ['category', 'value', 'group', 'interpolate'],
        mockConfig
    );
});