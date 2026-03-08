import { describe, it, expect } from 'vitest';
import { exportSelectedData } from '../../../../../src/components/controls/exporter/helper/exportSelectedData';
import defaultSpec from '../../../../assets/default.json';

describe('exportSelectedData', () => {
    const validSpec = JSON.stringify(defaultSpec);

    describe('with valid specification', () => {
        it('should export empty arrays when no datasets or signals are selected', () => {
            const result = exportSelectedData(validSpec, [], []);

            expect(result.datasets).toEqual([]);
            expect(result.signals).toEqual([]);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toHaveLength(1);
            expect(parsedSpec.signals).toHaveLength(3);
        });

        it('should export selected datasets and remove them from spec', () => {
            const result = exportSelectedData(validSpec, ['table'], []);

            expect(result.datasets).toHaveLength(1);
            const exportedDataset = JSON.parse(result.datasets[0]);
            expect(exportedDataset.name).toBe('table');
            expect(exportedDataset.values).toHaveLength(6);
            expect(result.signals).toEqual([]);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toHaveLength(0);
            expect(parsedSpec.signals).toHaveLength(3);
        });

        it('should export selected signals and remove them from spec', () => {
            const result = exportSelectedData(validSpec, [], ['TLS1']);

            expect(result.datasets).toEqual([]);
            expect(result.signals).toHaveLength(1);
            expect(result.signals[0]).toBe(JSON.stringify({ name: 'TLS1', value: 9 }));

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toHaveLength(1);
            expect(parsedSpec.signals).toHaveLength(2);
            expect(parsedSpec.signals.find((s: any) => s.name === 'TLS2')).toBeDefined();
            expect(parsedSpec.signals.find((s: any) => s.name === 'threshold')).toBeDefined();
        });

        it('should export multiple selected signals', () => {
            const result = exportSelectedData(validSpec, [], ['TLS1', 'TLS2']);

            expect(result.signals).toHaveLength(2);
            expect(result.datasets).toEqual([]);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.signals).toHaveLength(1);
            expect(parsedSpec.signals[0].name).toBe('threshold');
        });

        it('should export both datasets and signals', () => {
            const result = exportSelectedData(validSpec, ['table'], ['TLS1']);

            expect(result.datasets).toHaveLength(1);
            expect(result.signals).toHaveLength(1);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toHaveLength(0);
            expect(parsedSpec.signals).toHaveLength(2);
            expect(parsedSpec.signals.find((s: any) => s.name === 'TLS2')).toBeDefined();
            expect(parsedSpec.signals.find((s: any) => s.name === 'threshold')).toBeDefined();
        });

        it('should handle non-existent dataset names gracefully', () => {
            const result = exportSelectedData(validSpec, ['nonexistent'], []);

            expect(result.datasets).toEqual([]);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toHaveLength(1);
        });

        it('should handle non-existent signal names gracefully', () => {
            const result = exportSelectedData(validSpec, [], ['nonexistent']);

            expect(result.signals).toEqual([]);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.signals).toHaveLength(3);
        });

        it('should format spec with proper indentation', () => {
            const result = exportSelectedData(validSpec, [], []);

            expect(result.spec).toContain('\n  ');
            expect(result.spec).not.toBe(validSpec);
        });
    });

    describe('with spec without data', () => {
        const specWithoutData = JSON.stringify({
            $schema: 'https://vega.github.io/schema/vega/v5.json',
            width: 400,
            height: 200,
            marks: []
        });

        it('should handle spec without data array', () => {
            const result = exportSelectedData(specWithoutData, ['table'], []);

            expect(result.datasets).toEqual([]);
            expect(result.signals).toEqual([]);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.data).toBeUndefined();
        });
    });

    describe('with spec without signals', () => {
        const specWithoutSignals = JSON.stringify({
            $schema: 'https://vega.github.io/schema/vega/v5.json',
            width: 400,
            height: 200,
            data: [
                {
                    name: 'table',
                    values: [{ category: 'A', amount: 28 }]
                }
            ],
            marks: []
        });

        it('should handle spec without signals array', () => {
            const result = exportSelectedData(specWithoutSignals, [], ['signal1']);

            expect(result.datasets).toEqual([]);
            expect(result.signals).toEqual([]);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.signals).toBeUndefined();
        });
    });

    describe('with invalid JSON', () => {
        it('should throw error for invalid JSON', () => {
            const invalidSpec = 'not valid json {';

            expect(() => {
                exportSelectedData(invalidSpec, [], []);
            }).toThrow('Invalid JSON specification');
        });

        it('should throw error for empty string', () => {
            expect(() => {
                exportSelectedData('', [], []);
            }).toThrow('Invalid JSON specification');
        });
    });

    describe('edge cases', () => {
        it('should handle spec with empty data array', () => {
            const emptyDataSpec = JSON.stringify({
                data: [],
                signals: []
            });

            const result = exportSelectedData(emptyDataSpec, ['table'], ['signal1']);

            expect(result.datasets).toEqual([]);
            expect(result.signals).toEqual([]);
        });

        it('should handle datasets with null or undefined entries', () => {
            const specWithNulls = JSON.stringify({
                data: [
                    null,
                    { name: 'table', values: [{ x: 1 }] },
                    undefined
                ],
                signals: [
                    null,
                    { name: 'signal1', value: 100 }
                ]
            });

            const result = exportSelectedData(specWithNulls, ['table'], ['signal1']);

            expect(result.datasets).toHaveLength(1);
            expect(result.signals).toHaveLength(1);
        });

        it('should preserve other spec properties', () => {
            const result = exportSelectedData(validSpec, [], []);

            const parsedSpec = JSON.parse(result.spec);
            expect(parsedSpec.$schema).toBe('https://vega.github.io/schema/vega/v6.json');
            expect(parsedSpec.width).toBe(500);
            expect(parsedSpec.height).toBe(300);
            expect(parsedSpec.marks).toBeDefined();
        });
    });
});