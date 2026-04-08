import { describe, it, expect } from 'vitest';
import { SymbolAdapter } from "../../../../../src/components/wizard/adapters/append/SymbolAdapter";

describe('SymbolAdapter', () => {
    const adapter = new SymbolAdapter();

    it('should have correct mode', () => {
        expect(adapter.mode).toBe('append');
    });

    describe('getFields', () => {
        it('should return required fields', () => {
             const fields = adapter.getFields();
             expect(fields).toHaveLength(8);
        });
    });
});

