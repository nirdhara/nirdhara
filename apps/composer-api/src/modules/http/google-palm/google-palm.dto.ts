export interface GooglePalmErrorResponse {
  error: Error;
}

interface Error {
  code: number; // 400
  message: string; // API key not valid. Please pass a valid API key.
  status: string; // INVALID_ARGUMENT
  details?: Detail[];
}

interface Detail {
  '@type': string; // type.googleapis.com/google.rpc.BadRequest // type.googleapis.com/google.rpc.ErrorInfo
  reason?: string; // API_KEY_INVALID
  domain?: string; // googleapis.com
  metadata?: Metadata;
  fieldViolations?: FieldViolation[];
}

interface Metadata {
  service: string; // generativelanguage.googleapis.com
}

interface FieldViolation {
  field: string; // prompt
  description: string; // Invalid JSON payload received. Unknown name \"textd\" at 'prompt': Cannot find field
}
