// error.ts
export type TErrorSources = {

  path: string | number;
  message: string;
}[];
export type TErrorCastSources = {
  path: string | number;
  message: string;
  errorMessage: string | number
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
  errorMessage?: string | number
};
export type TGenericCastErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorCastSources;
};
