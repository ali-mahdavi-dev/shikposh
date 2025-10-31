export interface Problem {
  title: string;
  status: number;
  detail?: string;
  errors?: Record<string, string[]>;
}

export interface BadRequestError extends Problem {}
export interface UnauthorizedError extends Problem {}
export interface ValidationError extends Problem {}
export interface NotFoundError extends Problem {}
export interface UnhandledException extends Problem {}
export interface NetworkError extends Problem {}

export type ApiError =
  | BadRequestError
  | NetworkError
  | NotFoundError
  | UnhandledException
  | UnauthorizedError
  | ValidationError;

