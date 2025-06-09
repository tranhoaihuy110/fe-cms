import { ICommonMetadataFinalResponseApi } from "../../../models";

export interface IPostCommonMetadataFinalResponse {
  data: ICommonMetadataFinalResponseApi[];
}

export interface IPostCommonMetadataFinalError {
  message: string;
  statusCode: number;
  error: string;
}
