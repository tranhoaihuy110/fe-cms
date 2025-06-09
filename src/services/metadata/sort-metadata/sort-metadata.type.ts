import { IMetaDataApi } from "../../../models";

export interface ISortMetaDataResponse {
  data: IMetaDataApi[];
}

export interface ISortMetaDataError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortMetaDataParams {
  data_type: string;
  option: string;
  ascDesc: string;
  page?: number;
  size?: number;
}
