const LOG_PREFIX = 'GUI4Vega -';

const withPrefix = (args: unknown[]): [string, ...unknown[]] => [LOG_PREFIX, ...args];

export const gui4VegaLogger = {
    log: (...args: unknown[]) => console.log(...withPrefix(args)),
    info: (...args: unknown[]) => console.info(...withPrefix(args)),
    warn: (...args: unknown[]) => console.warn(...withPrefix(args)),
    error: (...args: unknown[]) => console.error(...withPrefix(args)),
};