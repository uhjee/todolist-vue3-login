export enum ResponseStatus {
  OK = 'OK',
  SERVER_ERROR = 'SERVER_ERROR',
  BAD_PARAMETER = 'BAD_PARAMETER',
}

export type ResponseEntity = {
  _data: any[] | null,
  _message: string
  _statusCode: ResponseStatus;
}
