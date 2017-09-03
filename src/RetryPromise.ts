export class RetryOptions {
	retries?: number = 10;
	factor?: number = 2;
	minTimeout?: number = 1000;
	maxTimeout?: number = Infinity;
	randomize?: boolean = false;
	log?: boolean = false;
}

export class RetryPromise {
	private attempts: number = 0;
	private options: RetryOptions;
	private lastError: any;

	constructor(options?: RetryOptions) {
		if (options) {
			this.options = Object.assign(new RetryOptions(), options);
		}
	}

	public retry<T>(executor: Promise<T>): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			if (this.attempts < this.options.retries) {
				setTimeout(() => {
					this.attempts++;
					executor
						.then((response) => resolve(response))
						.catch((error) => {
							this.lastError = error;
							this.log(`Retry: ${this.attempts} : ${JSON.stringify(error)}`);
							return this.retry(executor).then(resolve).catch(reject);
						});
				}, this.createTimeout(this.attempts, this.options));
			} else {
				reject(this.lastError);
			}
		});
	}

	private log(message: string): void {
		if (this.options.log && console && console.log) {
			console.log(message);
		}
	}

	private createTimeout (attempt: number, opts: RetryOptions): number {
		const random = opts.randomize ? Math.random() + 1 : 1;
		return Math.min(Math.round(random * opts.minTimeout * Math.pow(opts.factor, attempt)), opts.maxTimeout);
	}
}
