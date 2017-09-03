export declare class RetryOptions {
    retries?: number;
    factor?: number;
    minTimeout?: number;
    maxTimeout?: number;
    randomize?: boolean;
    log?: boolean;
}
export declare class RetryPromise {
    private attempts;
    private options;
    private lastError;
    constructor(options?: RetryOptions);
    retry<T>(executor: Promise<T>): Promise<T>;
    private log(message);
    private createTimeout(attempt, opts);
}
