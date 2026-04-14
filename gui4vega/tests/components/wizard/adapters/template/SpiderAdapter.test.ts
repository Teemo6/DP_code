import { describe, it, expect } from 'vitest';
import { SpiderAdapter } from "../../../../../src/components/wizard/adapters/template/stacked/SpiderAdapter";

describe('SpiderAdapter', () => {
    const adapter = new SpiderAdapter();

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

