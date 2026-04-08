import { describe, it, expect } from 'vitest';
import { LineAdapter } from "../../../../../src/components/wizard/adapters/append/LineAdapter";

describe('LineAdapter', () => {
    const adapter = new LineAdapter();

    it('should have correct mode', () => {
        expect(adapter.mode).toBe('append');
    });

    describe('getFields', () => {
        it('should return required fields', () => {
             const fields = adapter.getFields();
             expect(fields).toHaveLength(4);
        });
    });
});

