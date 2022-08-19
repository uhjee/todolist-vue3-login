export enum ResponseStatus {
  OK = 'OK',
  SERVER_ERROR = 'SERVER_ERROR',
  BAD_PARAMETER = 'BAD_PARAMETER',
}

export type ResponseEntity<T> = {
  _data: T | null,
  _message: string
  _statusCode: ResponseStatus;
}
