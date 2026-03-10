/**
 * Options for hiding specific controls in the editor.
 */
export interface HideControls {
    /**
     * Hides the import control when `true`.
     */
    import?: boolean;
    /**
     * Hides the export control when `true`.
     */
    export?: boolean;
    /**
     * Hides the view actions (e.g. Vega actions menu) when `true`.
     */
    view?: boolean;
}

/**
 * Normalizes the `hideControls` prop to ensure it is always an object with boolean values for each control.
 * @param hideControls - The `hideControls` prop which can be a boolean or an object specifying which controls to hide.
 * @returns A `HideControls` object with explicit boolean values for each control.
 */
export function normalizeHideControls(hideControls?: boolean | HideControls): HideControls {
    if (typeof hideControls === 'object' && hideControls !== null) {
        return hideControls;
    }
    return { import: !!hideControls, export: !!hideControls, view: !!hideControls };
}