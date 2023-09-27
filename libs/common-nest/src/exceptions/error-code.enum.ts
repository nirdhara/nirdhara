/**
 * Enum representing error codes for exceptions.
 */
export enum ErrorCode {
  /** Error code for a generic code error. */
  CodeError = 'code_error',
  /** Error code for an invalid request. */
  InvalidRequest = 'invalid_request',
  /** Error code for a service that is unavailable. */
  ServiceUnavailable = 'service_unavailable',
  /** Error code for an unauthorized request. */
  Unauthorized = 'unauthorized',
  /** Error code for an unclassified error. */
  Unclassified = 'unclassified',
}
