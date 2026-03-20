import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useExternalSelectionExporter } from '../../../../../src/components/controls/exporter/hooks/useExternalSelectionExporter';

// Mock the helper modules
vi.mock('../../../../../src/components/data/helper/datasetEdit', () => ({
    parseDatasets: vi.fn((code: string) => {
        try {
            const spec = JSON.parse(code);
            if (!Array.isArray(spec.data)) return [];
            return spec.data
                .filter((d: { name: string; values: unknown[] }) => Array.isArray(d.values) && d.values.length > 0)
                .map((d: { name: string; values: unknown[] }) => ({ name: d.name, values: d.values }));
        } catch {
            return [];
        }
    })
}));

vi.mock('../../../../../src/components/signal/helper/signalEdit', () => ({
    parseSignals: vi.fn((code: string) => {
        try {
            const spec = JSON.parse(code);
            if (!Array.isArray(spec.signals)) return [];
            return spec.signals
                .filter((s: { name: string; value: unknown }) => s)
                .map((s: { name: string; value: unknown }) => ({ name: s.name, value: s.value }));
        } catch {
            return [];
        }
    })
}));

describe('useExternalSelectionExporter', () => {
    const validSpec = JSON.stringify({
        data: [
            {
                name: 'table1',
                values: [
                    { category: 'A', amount: 28 },
                    { category: 'B', amount: 55 }
                ]
            },
            {
                name: 'table2',
                values: [
                    { x: 1, y: 10 },
                    { x: 2, y: 20 }
                ]
            }
        ],
        signals: [
            { name: 'signal1', value: 100 },
            { name: 'signal2', value: 'test' }
        ]
    });

    describe('initialization', () => {
        it('should parse dataset names from code', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: validSpec }));

            expect(result.current.datasetNames).toEqual(['table1', 'table2']);
        });

        it('should parse signal names from code', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: validSpec }));

            expect(result.current.signalNames).toEqual(['signal1', 'signal2']);
        });

        it('should initialize with empty selections', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: validSpec }));

            expect(result.current.datasetSelection).toEqual([]);
            expect(result.current.signalSelection).toEqual([]);
        });

        it('should handle empty data and signals', () => {
            const emptySpec = JSON.stringify({ data: [], signals: [] });
            const { result } = renderHook(() => useExternalSelectionExporter({ code: emptySpec }));

            expect(result.current.datasetNames).toEqual([]);
            expect(result.current.signalNames).toEqual([]);
        });

        it('should handle invalid JSON gracefully', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: 'invalid json' }));

            expect(result.current.datasetNames).toEqual([]);
            expect(result.current.signalNames).toEqual([]);
        });
    });

    describe('dataset selection', () => {
        it('should update dataset selection', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.setDatasetSelection(['table1']);
            });

            expect(result.current.datasetSelection).toEqual(['table1']);
        });

        it('should allow selecting multiple datasets', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.setDatasetSelection(['table1', 'table2']);
            });

            expect(result.current.datasetSelection).toEqual(['table1', 'table2']);
        });

        it('should allow clearing dataset selection', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.setDatasetSelection(['table1']);
            });

            act(() => {
                result.current.setDatasetSelection([]);
            });

            expect(result.current.datasetSelection).toEqual([]);
        });
    });

    describe('signal selection', () => {
        it('should update signal selection', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.setSignalSelection(['signal1']);
            });

            expect(result.current.signalSelection).toEqual(['signal1']);
        });

        it('should allow selecting multiple signals', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.setSignalSelection(['signal1', 'signal2']);
            });

            expect(result.current.signalSelection).toEqual(['signal1', 'signal2']);
        });

        it('should allow clearing signal selection', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.setSignalSelection(['signal1']);
            });

            act(() => {
                result.current.setSignalSelection([]);
            });

            expect(result.current.signalSelection).toEqual([]);
        });
    });

    describe('getExportedData', () => {
        it('should export selected datasets', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.setDatasetSelection(['table1']);
            });

            const exportedData = result.current.getExportedData();

            expect(exportedData.datasets).toHaveLength(1);
            expect(exportedData.signals).toEqual([]);

            const parsedSpec = JSON.parse(exportedData.spec);
            expect(parsedSpec.data).toHaveLength(1);
            expect(parsedSpec.data[0].name).toBe('table2');
        });

        it('should export selected signals', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.setSignalSelection(['signal1']);
            });

            const exportedData = result.current.getExportedData();

            expect(exportedData.datasets).toEqual([]);
            expect(exportedData.signals).toHaveLength(1);

            const parsedSpec = JSON.parse(exportedData.spec);
            expect(parsedSpec.signals).toHaveLength(1);
            expect(parsedSpec.signals[0].name).toBe('signal2');
        });

        it('should export both datasets and signals', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.setDatasetSelection(['table1']);
                result.current.setSignalSelection(['signal1']);
            });

            const exportedData = result.current.getExportedData();

            expect(exportedData.datasets).toHaveLength(1);
            expect(exportedData.signals).toHaveLength(1);
        });

        it('should export nothing when no selections are made', () => {
            const { result } = renderHook(() => useExternalSelectionExporter({ code: validSpec }));

            const exportedData = result.current.getExportedData();

            expect(exportedData.datasets).toEqual([]);
            expect(exportedData.signals).toEqual([]);

            const parsedSpec = JSON.parse(exportedData.spec);
            expect(parsedSpec.data).toHaveLength(2);
            expect(parsedSpec.signals).toHaveLength(2);
        });
    });

    describe('code updates', () => {
        it('should update dataset names when code changes', () => {
            const { result, rerender } = renderHook(
                ({ code }) => useExternalSelectionExporter({ code }),
                { initialProps: { code: validSpec } }
            );

            expect(result.current.datasetNames).toEqual(['table1', 'table2']);

            const newSpec = JSON.stringify({
                data: [{ name: 'newTable', values: [{ x: 1 }] }],
                signals: []
            });

            rerender({ code: newSpec });

            expect(result.current.datasetNames).toEqual(['newTable']);
        });

        it('should update signal names when code changes', () => {
            const { result, rerender } = renderHook(
                ({ code }) => useExternalSelectionExporter({ code }),
                { initialProps: { code: validSpec } }
            );

            expect(result.current.signalNames).toEqual(['signal1', 'signal2']);

            const newSpec = JSON.stringify({
                data: [],
                signals: [{ name: 'newSignal', value: 123 }]
            });

            rerender({ code: newSpec });

            expect(result.current.signalNames).toEqual(['newSignal']);
        });
    });
});

