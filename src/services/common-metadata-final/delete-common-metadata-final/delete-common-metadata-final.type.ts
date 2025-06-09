import { ICommonMetadataFinalResponseApi } from "../../../models";

export interface IDeleteCommonMetadataFinalResponse {
  data: ICommonMetadataFinalResponseApi[];
}

export interface IDeleteCommonMetadataFinalError {
  message: string;
  statusCode: number;
  error: string;
}
