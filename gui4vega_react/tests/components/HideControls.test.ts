import { describe, it, expect } from 'vitest';
import { normalizeHideControls } from '../../src/components/HideControls';
import type { HideControls } from '../../src';

describe('normalizeHideControls', () => {
    describe('passing boolean', () => {
        it('returns all true when passed true', () => {
            expect(normalizeHideControls(true)).toEqual({ import: true, export: true, view: true });
        });

        it('returns all false when passed false', () => {
            expect(normalizeHideControls(false)).toEqual({ import: false, export: false, view: false });
        });

        it('returns all false when passed undefined', () => {
            expect(normalizeHideControls(undefined)).toEqual({ import: false, export: false, view: false });
        });
    });

    describe('passing object', () => {
        it('returns the same object when passed a full HideControls object', () => {
            const obj: HideControls = { import: true, export: false, view: true };
            expect(normalizeHideControls(obj)).toBe(obj);
        });

        it('returns the same object when passed a partial HideControls object', () => {
            const obj: HideControls = { import: true };
            expect(normalizeHideControls(obj)).toBe(obj);
        });
    });
});