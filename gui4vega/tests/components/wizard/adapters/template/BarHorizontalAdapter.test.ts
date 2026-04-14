import { describe, it, expect } from 'vitest';
import { BarHorizontalAdapter } from "../../../../../src/components/wizard/adapters/template/simple/BarHorizontalAdapter";

describe('BarHorizontalAdapter', () => {
    const adapter = new BarHorizontalAdapter();

    it('should have correct mode', () => {
        expect(adapter.mode).toBe('template');
    });

    describe('getFields', () => {
        it('should return required fields', () => {
             const fields = adapter.getFields();
             expect(fields).toHaveLength(4);
        });
    });
});