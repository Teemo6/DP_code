import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { AreaAdapter } from "../../../../../../src/components/wizard/adapters/template/simple/AreaAdapter";
import type { WizardConfig } from "../../../../../../src/components/wizard/helper/wizardSpec";

describe('AreaAdapter specifics', () => {
    const mockConfig: WizardConfig = {
        chartType: 'area',
        datasetName: 'simple',
        fields: {
            category: 'category',
            value: 'value'
        }
    };

    validateWizardAdapter(
        AreaAdapter,
        'template',
        ['category', 'value', 'color', 'interpolate'],
        mockConfig
    );
});