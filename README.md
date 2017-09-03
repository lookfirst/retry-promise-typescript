# Retry Promise for TypeScript

## About

I couldn't find a simple implementation of a retrying Promise library for TypeScript, so here you go.

## Usage

```
yarn add retry-promise-typescript
```

```
import {RetryPromise} from 'retry-promise-typescript';
import * as got from 'got';

new RetryPromise({retries: 10, log: true}).retry(got('https://www.google.com/')).then((result) => {
	console.log(result);
}, (error) => {
	console.log(error);
});
```

Donate BTC: 18zrUSJzvtxDmaGaThAZuR1GPMe2jwjmxW
