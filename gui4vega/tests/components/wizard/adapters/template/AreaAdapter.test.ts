import { describe, it, expect } from 'vitest';
import { AreaAdapter } from "../../../../../src/components/wizard/adapters/template/simple/AreaAdapter";

describe('AreaAdapter', () => {
    const adapter = new AreaAdapter();

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

