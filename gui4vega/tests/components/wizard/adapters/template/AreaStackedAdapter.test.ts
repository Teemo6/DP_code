import { describe, it, expect } from 'vitest';
import { AreaStackedAdapter } from "../../../../../src/components/wizard/adapters/template/stacked/AreaStackedAdapter";

describe('AreaStackedAdapter', () => {
    const adapter = new AreaStackedAdapter();

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

