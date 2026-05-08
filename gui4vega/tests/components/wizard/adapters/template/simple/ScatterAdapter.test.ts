import { describe } from 'vitest';
import { validateWizardAdapter } from "../../AdapterUtil";
import { ScatterAdapter } from "../../../../../../src/components/wizard/adapters/template/simple/ScatterAdapter";
import type { WizardConfig } from "../../../../../../src/components/wizard/helper/wizardSpec";

describe('ScatterAdapter specifics', () => {
    const mockConfig: WizardConfig = {
        chartType: 'scatter',
        datasetName: 'scatter',
        fields: {
            xField: 'x',
            yField: 'y'
        }
    };

    validateWizardAdapter(
        ScatterAdapter,
        'template',
        ['xField', 'yField', 'color', 'shape', 'size', 'stroke', 'strokeWidth'],
        mockConfig
    );
});