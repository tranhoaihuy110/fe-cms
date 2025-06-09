import { IMetaDataApi } from "../../../models";

export interface IPostMetaDataResponse {
  data: IMetaDataApi[];
}

export interface IPostMetaDataError {
  message: string;
  statusCode: number;
  error: string;
}
