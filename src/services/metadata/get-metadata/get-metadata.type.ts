import { IMetaDataApi } from "../../../models";

export interface IGetMetaDataResponse {
  data: IMetaDataApi[];
}

export interface IGetMetaDataError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetMetaDataParams {
  page: number;
  size: number;
  data_type: string;
  id?: string;
}
