import { describe, it, expect } from 'vitest';
import { PieAdapter } from "../../../../../src/components/wizard/adapters/template/simple/PieAdapter";

describe('PieAdapter', () => {
    const adapter = new PieAdapter();

    it('should have correct mode', () => {
        expect(adapter.mode).toBe('template');
    });

    describe('getFields', () => {
        it('should return required fields', () => {
             const fields = adapter.getFields();
             expect(fields).toHaveLength(5);
        });
    });
});