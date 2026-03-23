import { describe, it, expect } from 'vitest';
import { normalizeHideControls, isControlsTabShown } from '../../src/components/HideControls';
import type { HideControls } from '../../src';

describe('normalizeHideControls', () => {
    describe('passing boolean', () => {
        it('returns all true when passed true', () => {
            expect(normalizeHideControls(true)).toEqual({ newSpec: true, import: true, export: true, view: true });
        });

        it('returns all false when passed false', () => {
            expect(normalizeHideControls(false)).toEqual({ newSpec: false, import: false, export: false, view: false });
        });

        it('returns all false when passed undefined', () => {
            expect(normalizeHideControls(undefined)).toEqual({ newSpec: false, import: false, export: false, view: false });
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

describe('isControlsTabShown', () => {
    it.each([
        ['all are hidden', { newSpec: true, import: true, export: true }, false],
        ['newSpec is hidden', { newSpec: true, import: false, export: false }, true],
        ['import is hidden', { newSpec: false, import: true, export: false }, true],
        ['export is hidden', { newSpec: false, import: false, export: true }, true],
        ['all are visible', { newSpec: false, import: false, export: false }, true],
    ])('returns %s', (_, hideControls, expected) => {
        expect(isControlsTabShown(hideControls)).toBe(expected);
    });

    it('returns true when missing flag', () => {
        expect(isControlsTabShown({})).toBe(true);
        expect(isControlsTabShown({ newSpec: true })).toBe(true);
        expect(isControlsTabShown({ import: true })).toBe(true);
        expect(isControlsTabShown({ export: true })).toBe(true);
    });

    it('returns boolean when passing normalized object', () => {
        expect(isControlsTabShown(normalizeHideControls(true))).toBe(false);
        expect(isControlsTabShown(normalizeHideControls(false))).toBe(true);
        expect(isControlsTabShown(normalizeHideControls(undefined))).toBe(true);
    });
});