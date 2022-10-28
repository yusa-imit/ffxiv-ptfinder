import { SWRFetchError } from './error/SWRFetchError';

export const swrFetcher = (...args: [input: RequestInfo | URL, init?: RequestInit]) =>
  fetch(...args).then(async (res) => {
    if (!res.ok) {
      const err = new SWRFetchError('Error occured while fetching data under swr.');
      err.info = await res.json();
      err.status = res.status;
      throw err;
    }
    return res.json();
  });
