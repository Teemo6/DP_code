import { describe, it, expect } from 'vitest';
import { BarGroupedAdapter } from "../../../../../src/components/wizard/adapters/template/BarGroupedAdapter";

describe('BarGroupedAdapter', () => {
    const adapter = new BarGroupedAdapter();

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

