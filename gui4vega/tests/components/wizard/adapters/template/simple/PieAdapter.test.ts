import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { PieAdapter } from "../../../../../../src/components/wizard/adapters/template/simple/PieAdapter";
import type { WizardConfig } from "../../../../../../src/components/wizard/helper/wizardSpec";

describe('PieAdapter specifics', () => {
    const mockConfig: WizardConfig = {
        chartType: 'pie',
        datasetName: 'simple',
        fields: {
            category: 'category',
            value: 'value'
        }
    };

    validateWizardAdapter(
        PieAdapter,
        'template',
        ['category', 'value', 'sort', 'hollow', 'roundedCorners'],
        mockConfig
    );
});