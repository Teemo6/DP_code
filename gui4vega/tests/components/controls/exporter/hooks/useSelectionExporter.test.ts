import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSelectionExporter } from '../../../../../src/components/controls/exporter/hooks/useSelectionExporter';
import type { ExportedData } from '../../../../../src';

// Mock antd message
vi.mock('antd', async () => {
    const actual = await vi.importActual('antd');
    return {
        ...actual,
        message: {
            error: vi.fn(),
            success: vi.fn(),
        }
    };
});

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

describe('useSelectionExporter', () => {
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

    let mockOnExportSuccess: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockOnExportSuccess = vi.fn();
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('initialization', () => {
        it('should initialize with modal closed', () => {
            const { result } = renderHook(() => useSelectionExporter({ code: validSpec }));

            expect(result.current.isModalOpen).toBe(false);
        });

        it('should parse dataset names from code', () => {
            const { result } = renderHook(() => useSelectionExporter({ code: validSpec }));

            expect(result.current.datasetNames).toEqual(['table1', 'table2']);
        });

        it('should parse signal names from code', () => {
            const { result } = renderHook(() => useSelectionExporter({ code: validSpec }));

            expect(result.current.signalNames).toEqual(['signal1', 'signal2']);
        });

        it('should initialize with empty selections', () => {
            const { result } = renderHook(() => useSelectionExporter({ code: validSpec }));

            expect(result.current.datasetSelection).toEqual([]);
            expect(result.current.signalSelection).toEqual([]);
        });
    });

    describe('openExporter', () => {
        it('should open the modal', () => {
            const { result } = renderHook(() => useSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.openExporter();
            });

            expect(result.current.isModalOpen).toBe(true);
        });

        it('should pre-select all datasets when opening', () => {
            const { result } = renderHook(() => useSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.openExporter();
            });

            expect(result.current.datasetSelection).toEqual(['table1', 'table2']);
        });

        it('should pre-select all signals when opening', () => {
            const { result } = renderHook(() => useSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.openExporter();
            });

            expect(result.current.signalSelection).toEqual(['signal1', 'signal2']);
        });

        it('should handle opening with empty data and signals', () => {
            const emptySpec = JSON.stringify({ data: [], signals: [] });
            const { result } = renderHook(() => useSelectionExporter({ code: emptySpec }));

            act(() => {
                result.current.openExporter();
            });

            expect(result.current.isModalOpen).toBe(true);
            expect(result.current.datasetSelection).toEqual([]);
            expect(result.current.signalSelection).toEqual([]);
        });
    });

    describe('closeExporter', () => {
        it('should close the modal', () => {
            const { result } = renderHook(() => useSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.openExporter();
            });

            expect(result.current.isModalOpen).toBe(true);

            act(() => {
                result.current.closeExporter();
            });

            expect(result.current.isModalOpen).toBe(false);
        });

        it('should not clear selections when closing', () => {
            const { result } = renderHook(() => useSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.openExporter();
            });

            act(() => {
                result.current.setDatasetSelection(['table1']);
            });

            act(() => {
                result.current.closeExporter();
            });

            expect(result.current.datasetSelection).toEqual(['table1']);
        });
    });

    describe('selection management', () => {
        it('should update dataset selection', () => {
            const { result } = renderHook(() => useSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.setDatasetSelection(['table1']);
            });

            expect(result.current.datasetSelection).toEqual(['table1']);
        });

        it('should update signal selection', () => {
            const { result } = renderHook(() => useSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.setSignalSelection(['signal1']);
            });

            expect(result.current.signalSelection).toEqual(['signal1']);
        });
    });

    describe('confirmExport', () => {
        it('should call onExportSuccess with exported data', () => {
            const { result } = renderHook(() =>
                useSelectionExporter({ code: validSpec, onExportSuccess: mockOnExportSuccess })
            );

            act(() => {
                result.current.openExporter();
            });

            act(() => {
                result.current.setDatasetSelection(['table1']);
                result.current.setSignalSelection(['signal1']);
            });

            act(() => {
                result.current.confirmExport();
            });

            expect(mockOnExportSuccess).toHaveBeenCalledTimes(1);
            const exportedData = mockOnExportSuccess.mock.calls[0][0] as ExportedData;
            expect(exportedData.datasets).toHaveLength(1);
            expect(exportedData.signals).toHaveLength(1);
        });

        it('should close modal after successful export', () => {
            const { result } = renderHook(() =>
                useSelectionExporter({ code: validSpec, onExportSuccess: mockOnExportSuccess })
            );

            act(() => {
                result.current.openExporter();
            });

            expect(result.current.isModalOpen).toBe(true);

            act(() => {
                result.current.confirmExport();
            });

            expect(result.current.isModalOpen).toBe(false);
        });

        it('should work without onExportSuccess callback', () => {
            const { result } = renderHook(() => useSelectionExporter({ code: validSpec }));

            act(() => {
                result.current.openExporter();
            });

            expect(() => {
                act(() => {
                    result.current.confirmExport();
                });
            }).not.toThrow();

            expect(result.current.isModalOpen).toBe(false);
        });

        it('should handle export with no selections', () => {
            const { result } = renderHook(() =>
                useSelectionExporter({ code: validSpec, onExportSuccess: mockOnExportSuccess })
            );

            act(() => {
                result.current.openExporter();
            });

            act(() => {
                result.current.setDatasetSelection([]);
                result.current.setSignalSelection([]);
            });

            act(() => {
                result.current.confirmExport();
            });

            expect(mockOnExportSuccess).toHaveBeenCalledTimes(1);
            const exportedData = mockOnExportSuccess.mock.calls[0][0] as ExportedData;
            expect(exportedData.datasets).toEqual([]);
            expect(exportedData.signals).toEqual([]);
        });

        it('should handle invalid JSON and show error message', async () => {
            const { message } = await import('antd');
            const { result } = renderHook(() =>
                useSelectionExporter({ code: 'invalid json', onExportSuccess: mockOnExportSuccess })
            );

            act(() => {
                result.current.confirmExport();
            });

            expect(message.error).toHaveBeenCalled();
            expect(mockOnExportSuccess).not.toHaveBeenCalled();
            expect(result.current.isModalOpen).toBe(false);
        });
    });

    describe('code updates', () => {
        it('should update dataset names when code changes', () => {
            const { result, rerender } = renderHook(
                ({ code }) => useSelectionExporter({ code }),
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
                ({ code }) => useSelectionExporter({ code }),
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