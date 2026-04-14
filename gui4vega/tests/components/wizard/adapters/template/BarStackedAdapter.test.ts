import { describe, it, expect } from 'vitest';
import { BarStackedAdapter } from "../../../../../src/components/wizard/adapters/template/stacked/BarStackedAdapter";

describe('BarStackedAdapter', () => {
    const adapter = new BarStackedAdapter();

    it('should have correct mode', () => {
        expect(adapter.mode).toBe('template');
    });

    describe('getFields', () => {
        it('should return required fields', () => {
             const fields = adapter.getFields();
             expect(fields).toHaveLength(3);
        });
    });
});

