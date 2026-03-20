/**
 * Prefix used for all log messages from the GUI4Vega library.
 */
const LOG_PREFIX = 'GUI4Vega -';

/**
 * Helper function to prefix log messages with an identifier for easier debugging and log filtering.
 * @param args - The log message arguments to be prefixed.
 * @returns An array of log message arguments with the prefix added at the beginning.
 */
const withPrefix = (args: unknown[]): [string, ...unknown[]] => [LOG_PREFIX, ...args];

/**
 * Logger object for GUI4Vega that prefixes all log messages with a consistent identifier.
 */
export const gui4VegaLogger = {
    log: (...args: unknown[]) => console.log(...withPrefix(args)),
    info: (...args: unknown[]) => console.info(...withPrefix(args)),
    warn: (...args: unknown[]) => console.warn(...withPrefix(args)),
    error: (...args: unknown[]) => console.error(...withPrefix(args)),
};