import Papa from 'papaparse';

/**
 * Parses a CSV file and returns the data as an array of objects.
 * @param file - The CSV file to parse.
 * @returns A promise that resolves to the parsed data.
 */
export const importCSV = (file: File): Promise<Record<string, unknown>[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    reject(new Error(results.errors[0].message));
                    return;
                }
                const data = results.data as Record<string, unknown>[];
                resolve(data);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
};

/**
 * Parses a JSON file and returns the data.
 * @param file - The JSON file to parse.
 * @returns A promise that resolves to the parsed data.
 */
export const importJSON = (file: File): Promise<Record<string, unknown>[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const json = JSON.parse(text);
                if (Array.isArray(json)) {
                    resolve(json);
                } else {
                    reject(new Error("JSON file must contain an array of objects."));
                }
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
};