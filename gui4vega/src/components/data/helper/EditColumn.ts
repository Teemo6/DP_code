/**
 * Renames a key (column) in each row of a dataset
 * @param rows - The dataset rows to modify
 * @param oldCol - The column name to rename
 * @param newCol - The new column name
 * @returns A new array of rows with the column renamed
 */
export function renameColumn(rows: Record<string, unknown>[], oldCol: string, newCol: string): Record<string, unknown>[] {
    // Same value, do nothing
    if (oldCol === newCol) return rows;

    // Add renamed column and remove old one
    return rows.map(row => {
        const { [oldCol]: value, ...rest } = row;
        return { ...rest, [newCol]: value };
    });
}

/**
 * Deletes a key from each row of a dataset
 * @param rows - The dataset rows to modify
 * @param col - The column name to delete
 * @returns A new array of rows with the column deleted
 */
export function deleteColumn(rows: Record<string, unknown>[], col: string): Record<string, unknown>[] {
    return rows.map(({ [col]: _, ...rest }) => rest);
}

/**
 * Adds a new column to each row of a dataset
 * @param rows - The dataset rows to modify
 * @param col - The column name to add
 * @param defaultValue - The default value for the new column
 * @returns A new array of rows with the new column added
 */
export function addColumn(rows: Record<string, unknown>[], col: string, defaultValue: unknown = ''): Record<string, unknown>[] {
    return rows.map(row => ({ ...row, [col]: defaultValue }));
}