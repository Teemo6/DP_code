import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { BarVerticalAdapter } from "../../../../../../src/components/wizard/adapters/template/simple/BarVerticalAdapter";
import type { WizardConfig } from "../../../../../../src/components/wizard/helper/wizardSpec";

describe('BarVerticalAdapter specifics', () => {
    const mockConfig: WizardConfig = {
        chartType: 'barVertical',
        datasetName: 'simple',
        fields: {
            category: 'category',
            value: 'value'
        }
    };

    validateWizardAdapter(
        BarVerticalAdapter,
        'template',
        ['category', 'value', 'colorBar', 'colorHover'],
        mockConfig
    );
});