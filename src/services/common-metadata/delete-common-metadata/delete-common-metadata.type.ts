import { ICommonMetadataResponseApi } from "../../../models";

export interface IDeleteCommonMetadataResponse {
  data: ICommonMetadataResponseApi[];
}

export interface IDeleteCommonMetadataError {
  message: string;
  statusCode: number;
  error: string;
}
