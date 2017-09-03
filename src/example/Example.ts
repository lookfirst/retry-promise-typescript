import {RetryPromise} from '../';
import * as got from 'got';

new RetryPromise({retries: 10, log: true}).retry(got('https://www.google.com/')).then((result) => {
	console.log(result);
}, (error) => {
	console.log(error);
});
