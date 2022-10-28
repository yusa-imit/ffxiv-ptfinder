export class SWRFetchError extends Error {
  info?: any;
  status?: any;
  constructor(message?: string | undefined, options?: ErrorOptions | undefined) {
    super(message, options);
    this.info = undefined;
    this.status = undefined;
    this.name = 'SWRFetchError';
  }
}
