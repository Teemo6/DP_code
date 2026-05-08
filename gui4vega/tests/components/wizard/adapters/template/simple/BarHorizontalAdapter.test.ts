import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { BarHorizontalAdapter } from "../../../../../../src/components/wizard/adapters/template/simple/BarHorizontalAdapter";
import type { WizardConfig } from "../../../../../../src/components/wizard/helper/wizardSpec";

describe('BarHorizontalAdapter specifics', () => {
    const mockConfig: WizardConfig = {
        chartType: 'barHorizontal',
        datasetName: 'simple',
        fields: {
            category: 'category',
            value: 'value'
        }
    };

    validateWizardAdapter(
        BarHorizontalAdapter,
        'template',
        ['category', 'value', 'colorBar', 'colorHover'],
        mockConfig
    );
});