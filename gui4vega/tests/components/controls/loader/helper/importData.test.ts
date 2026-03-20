import { describe, it, expect } from 'vitest';
import { prependDatasetsToSchema, prependSignalsToSchema } from '../../../../../src/components/controls/loader/helper/importData';
import type { VegaDataset } from '../../../../../src';
import type { VegaSignal } from '../../../../../src';

import defaultSpecification from '../../../../assets/default.json';
import minimalSpecification from '../../../../assets/minimal.json';

import importDatasets from '../../../../assets/import/import_datasets.json';
import importDatasetsDuplicate from '../../../../assets/import/import_datasets_duplicate.json';

import importSignals from '../../../../assets/import/import_signals.json';
import importSignalsDuplicate from '../../../../assets/import/import_signals_duplicate.json';

describe('importData', () => {
    describe('prependDatasetsToSchema', () => {
        it('should prepend datasets to schema', () => {
            const result = prependDatasetsToSchema(defaultSpecification, importDatasets);

            expect(result.data).toBeDefined();
            expect(Array.isArray(result.data)).toBe(true);

            const dataArray = result.data as VegaDataset[];

            // Should have total 4 datasets, 3 imported + 1 original
            expect(dataArray).toHaveLength(4);

            // Imported datasets should come first
            expect(dataArray[0]).toEqual(importDatasets[0]);
            expect(dataArray[1]).toEqual(importDatasets[1]);
            expect(dataArray[2]).toEqual(importDatasets[2]);

            // Original dataset should be last
            expect(dataArray[3]).toEqual(defaultSpecification.data[0]);
        });

        it.each([
            { title: 'should handle undefined datasets', value: undefined },
            { title: 'should handle empty datasets array', value: [] },
        ])('$title', (testCase) => {
            const result = prependDatasetsToSchema(defaultSpecification, testCase.value);

            expect(result.data).toBeDefined();
            expect(Array.isArray(result.data)).toBe(true);

            const dataArray = result.data as VegaDataset[];

            // Should only have the original dataset
            expect(dataArray).toHaveLength(1);
            expect(dataArray[0]).toEqual(defaultSpecification.data[0]);
        });

        it('should replace existing dataset names', () => {
            const result = prependDatasetsToSchema(defaultSpecification, importDatasetsDuplicate);

            expect(result.data).toBeDefined();
            expect(Array.isArray(result.data)).toBe(true);

            const dataArray = result.data as VegaDataset[];

            // Original dataset should be overwritten and placed at beginning
            expect(dataArray).toHaveLength(2);
            expect(dataArray[0].name).toBe("table");
            expect(dataArray[0].values).toHaveLength(1);
            expect(dataArray[0].values[0]).toEqual({"category": "X", "value": 100});
            expect(dataArray[1].name).toBe("testDataset1");
        });

        it('should handle schema without data property', () => {
            const result = prependDatasetsToSchema(minimalSpecification, importDatasets);

            expect(result.data).toBeDefined();
            expect(Array.isArray(result.data)).toBe(true);

            const dataArray = result.data as VegaDataset[];

            // Should only have the 3 imported datasets
            expect(dataArray).toHaveLength(3);
            expect(dataArray[0].name).toBe("testDataset1");
            expect(dataArray[1].name).toBe("testDataset2");
            expect(dataArray[2].name).toBe("testDataset3");
        });

        it('should preserve other schema properties', () => {
            const result = prependDatasetsToSchema(defaultSpecification, importDatasets);

            expect(result.$schema).toBe(defaultSpecification.$schema);
            expect(result.width).toBe(defaultSpecification.width);
            expect(result.height).toBe(defaultSpecification.height);
            expect(result.signals).toBeDefined();
            expect(result.scales).toBeDefined();
            expect(result.marks).toBeDefined();
        });
    });

    describe('prependSignalsToSchema', () => {
        it('should prepend signals to schema', () => {
            const result = prependSignalsToSchema(defaultSpecification, importSignals);

            expect(result.signals).toBeDefined();
            expect(Array.isArray(result.signals)).toBe(true);

            const signalsArray = result.signals as VegaSignal[];

            // Should have total 6 signals, 3 imported + 3 original
            expect(signalsArray).toHaveLength(6);

            // Imported signals should come first
            expect(signalsArray[0]).toEqual(importSignals[0]);
            expect(signalsArray[1]).toEqual(importSignals[1]);
            expect(signalsArray[2]).toEqual(importSignals[2]);

            // Original signals should be last
            expect(signalsArray[3]).toEqual(defaultSpecification.signals[0]);
            expect(signalsArray[4]).toEqual(defaultSpecification.signals[1]);
            expect(signalsArray[5]).toEqual(defaultSpecification.signals[2]);
        });

        it.each([
            { title: 'should handle undefined signals', value: undefined },
            { title: 'should handle empty signals array', value: [] },
        ])('$title', (testCase) => {
            const result = prependSignalsToSchema(defaultSpecification, testCase.value);

            expect(result.signals).toBeDefined();
            expect(Array.isArray(result.signals)).toBe(true);

            const signalsArray = result.signals as VegaSignal[];

            // Should only have the original signals
            expect(signalsArray).toHaveLength(3);
            expect(signalsArray[0]).toEqual(defaultSpecification.signals[0]);
            expect(signalsArray[1]).toEqual(defaultSpecification.signals[1]);
            expect(signalsArray[2]).toEqual(defaultSpecification.signals[2]);
        });

        it('should filter out duplicate signal names', () => {
            const result = prependSignalsToSchema(defaultSpecification, importSignalsDuplicate);

            expect(result.signals).toBeDefined();
            expect(Array.isArray(result.signals)).toBe(true);

            const signalsArray = result.signals as VegaSignal[];

            // Original signal should be overwritten and placed at beginning
            expect(signalsArray).toHaveLength(4);
            expect(signalsArray[0].name).toBe("TLS1");
            expect(signalsArray[0].value).toBe(999);
            expect(signalsArray[1].name).toBe("testSignal1");
            expect(signalsArray[2].name).toBe("TLS2");
            expect(signalsArray[3].name).toBe("threshold");
        });

        it('should handle schema without signals property', () => {
            const result = prependSignalsToSchema(minimalSpecification, importSignals);

            expect(result.signals).toBeDefined();
            expect(Array.isArray(result.signals)).toBe(true);

            const signalsArray = result.signals as VegaSignal[];

            // Should only have the 3 imported signals
            expect(signalsArray).toHaveLength(3);
            expect(signalsArray[0].name).toBe("testSignal1");
            expect(signalsArray[1].name).toBe("testSignal2");
            expect(signalsArray[2].name).toBe("testSignal3");
        });

        it('should preserve other schema properties', () => {
            const result = prependSignalsToSchema(defaultSpecification, importSignals);

            expect(result.$schema).toBe(defaultSpecification.$schema);
            expect(result.width).toBe(defaultSpecification.width);
            expect(result.height).toBe(defaultSpecification.height);
            expect(result.data).toBeDefined();
            expect(result.scales).toBeDefined();
            expect(result.marks).toBeDefined();
        });
    });

    describe('combined usage', () => {
        it('should work when both functions are applied sequentially', () => {
            const withDatasets = prependDatasetsToSchema(defaultSpecification, importDatasets);
            const withBoth = prependSignalsToSchema(withDatasets, importSignals);

            const dataArray = withBoth.data as VegaDataset[];
            const signalsArray = withBoth.signals as VegaSignal[];

            // Check datasets
            expect(dataArray).toHaveLength(4);
            expect(dataArray[0].name).toBe("testDataset1");
            expect(dataArray[3].name).toBe("table");

            // Check signals
            expect(signalsArray).toHaveLength(6);
            expect(signalsArray[0].name).toBe("testSignal1");
            expect(signalsArray[5].name).toBe("threshold");

            // Check other properties are preserved
            expect(withBoth.$schema).toBe(defaultSpecification.$schema);
            expect(withBoth.width).toBe(defaultSpecification.width);
        });

        it('should work in reverse order (signals first, then datasets)', () => {
            const withSignals = prependSignalsToSchema(defaultSpecification, importSignals);
            const withBoth = prependDatasetsToSchema(withSignals, importDatasets);

            const dataArray = withBoth.data as VegaDataset[];
            const signalsArray = withBoth.signals as VegaSignal[];

            // Check datasets
            expect(dataArray).toHaveLength(4);
            expect(dataArray[0].name).toBe("testDataset1");

            // Check signals
            expect(signalsArray).toHaveLength(6);
            expect(signalsArray[0].name).toBe("testSignal1");
        });
    });
});