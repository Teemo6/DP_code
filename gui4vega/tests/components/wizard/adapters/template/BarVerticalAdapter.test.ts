import { describe, it, expect } from 'vitest';
import { BarVerticalAdapter } from "../../../../../src/components/wizard/adapters/template/simple/BarVerticalAdapter";

describe('BarVerticalAdapter', () => {
    const adapter = new BarVerticalAdapter();

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