import { describe, it, expect } from 'vitest';
import { ScatterAdapter } from "../../../../../src/components/wizard/adapters/template/simple/ScatterAdapter";

describe('ScatterAdapter', () => {
    const adapter = new ScatterAdapter();

    it('should have correct mode', () => {
        expect(adapter.mode).toBe('template');
    });

    describe('getFields', () => {
        it('should return required fields', () => {
             const fields = adapter.getFields();
             expect(fields).toHaveLength(7);
        });
    });
});