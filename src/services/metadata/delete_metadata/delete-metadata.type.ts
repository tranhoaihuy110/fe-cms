import { IMetaDataApi } from "../../../models";

export interface IDeleteMetaDataResponse {
  data: IMetaDataApi[];
}

export interface IDeleteMetaDataError {
  message: string;
  statusCode: number;
  error: string;
}
