import { describe, it, expect } from 'vitest';
import { exportSelectedData } from '../../../../../src/components/controls/exporter/helper/exportSelectedData';

import defaultSpecification from '../../../../assets/default.json';
import minimalSpecification from '../../../../assets/minimal.json';

interface TestCase {
    title: string;
    args: [string, string[]?, string[]?];
    expectedDatasets?: { name: string; length: number }[];
    expectedSignals?: { name: string; value: unknown }[];
}

describe('exportSelectedData', () => {
    const defaultSpec = JSON.stringify(defaultSpecification, null, 2);
    const minimalSpec = JSON.stringify(minimalSpecification, null, 2);

    const DEFAULT_TOTAL_DATASETS = 4;
    const DEFAULT_TOTAL_SIGNALS = 6;

    describe('with valid specification', () => {
        it.each<TestCase>([
            {
                title: 'should export empty arrays when calling without dataset and signal names',
                args: [defaultSpec],
            },
            {
                title: 'should export empty arrays when no datasets or signals are selected',
                args: [defaultSpec, [], []],
            },
            {
                title: 'should handle non-existent dataset names gracefully',
                args: [defaultSpec, ['does_not_exist'], []],
            },
            {
                title: 'should handle non-existent signal names gracefully',
                args: [defaultSpec, [], ['does_not_exist']],
            },
        ])('$title', (testCase: TestCase) => {
            const result = exportSelectedData(...testCase.args);

            expect(result.spec).toEqual(defaultSpec);
            expect(result.datasets).toEqual([]);
            expect(result.signals).toEqual([]);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.$schema).toBe('https://vega.github.io/schema/vega/v6.json');
            expect(parsedSpec.data).toHaveLength(4);
            expect(parsedSpec.signals).toHaveLength(6);
            expect(parsedSpec.width).toBe(500);
            expect(parsedSpec.height).toBe(300);
            expect(parsedSpec.marks).toBeDefined();
        });

        it.each<TestCase>([
            {
                title: 'should export selected dataset and remove it from spec',
                args: [defaultSpec, ['testDataset1'], []],
                expectedDatasets: [{ name: 'testDataset1', length: 2 }],
                expectedSignals: []
            },
            {
                title: 'should export multiple selected datasets in correct order',
                args: [defaultSpec, ['testDataset2', 'testDataset1'], []],
                expectedDatasets: [
                    { name: 'testDataset1', length: 2 },
                    { name: 'testDataset2', length: 3 }
                ],
                expectedSignals: []
            },
            {
                title: 'should export selected signal and remove it from spec',
                args: [defaultSpec, [], ['testSignal1']],
                expectedDatasets: [],
                expectedSignals: [{ name: 'testSignal1', value: 1 }]
            },
            {
                title: 'should export multiple selected signals in correct order',
                args: [defaultSpec, [], ['testSignal2', 'testSignal1']],
                expectedDatasets: [],
                expectedSignals: [
                    { name: 'testSignal1', value: 1 },
                    { name: 'testSignal2', value: 2 }
                ]
            },
            {
                title: 'should export both datasets and signals',
                args: [defaultSpec, ['testDataset3'], ['testSignal3']],
                expectedDatasets: [{ name: 'testDataset3', length: 4 }],
                expectedSignals: [{ name: 'testSignal3', value: 3 }]
            },
            {
                title: 'should export multiple datasets and signals in correct order',
                args: [defaultSpec, ['testDataset3', 'testDataset1'], ['testSignal3', 'testSignal1']],
                expectedDatasets: [
                    { name: 'testDataset1', length: 2 },
                    { name: 'testDataset3', length: 4 }
                ],
                expectedSignals: [
                    { name: 'testSignal1', value: 1 },
                    { name: 'testSignal3', value: 3 }
                ]
            }
        ])('$title', (testCase: TestCase) => {
            const result = exportSelectedData(...testCase.args);

            expect(result.spec).not.toEqual(defaultSpec);

            // Check exported datasets
            expect(result.datasets).toHaveLength(testCase.expectedDatasets.length);
            result.datasets.forEach((datasetStr, index) => {
                const resultDataset = JSON.parse(datasetStr);
                expect(resultDataset.name).toBe(testCase.expectedDatasets[index].name);
                expect(resultDataset.values).toHaveLength(testCase.expectedDatasets[index].length);
            });

            // Check exported signals
            expect(result.signals).toHaveLength(testCase.expectedSignals.length);
            result.signals.forEach((signalStr, index) => {
                expect(JSON.parse(signalStr)).toEqual(testCase.expectedSignals[index]);
            });

            // Check spec leftovers
            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toHaveLength(DEFAULT_TOTAL_DATASETS - testCase.expectedDatasets.length);
            expect(parsedSpec.signals).toHaveLength(DEFAULT_TOTAL_SIGNALS - testCase.expectedSignals.length);

            testCase.args[1].forEach(name => {
                expect(parsedSpec.data.find((d: { name: string }) => d.name === name)).toBeUndefined();
            });

            testCase.args[2].forEach(name => {
                expect(parsedSpec.signals.find((s: { name: string }) => s.name === name)).toBeUndefined();
            });

            expect(parsedSpec.data.find((d: { name: string }) => d.name === 'table')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS1')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'TLS2')).toBeDefined();
            expect(parsedSpec.signals.find((s: { name: string }) => s.name === 'threshold')).toBeDefined();
        });
    });

    describe('with minimal spec', () => {
        it.each<TestCase>([
            {
                title: 'should handle spec without data array',
                args: [minimalSpec, ['testDataset1'], []],
            },
            {
                title: 'should handle spec without signal array',
                args: [minimalSpec, [], ['testSignal1']],
            },
        ])('$title', (testCase: TestCase) => {
            const result = exportSelectedData(...testCase.args);

            expect(result.spec).toEqual(minimalSpec);
            expect(result.datasets).toEqual([]);
            expect(result.signals).toEqual([]);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toBeUndefined();
        });
    });

    describe('with invalid JSON', () => {
        it.each<TestCase>([
            {
                title: 'should throw error for invalid JSON',
                args: ['not a valid JSON {'],
            },
            {
                title: 'should throw error for empty string',
                args: [''],
            }
        ])('$title', (testCase: TestCase) => {
            expect(() => {
                exportSelectedData(...testCase.args);
            }).toThrow('Invalid JSON specification');
        });
    });
});