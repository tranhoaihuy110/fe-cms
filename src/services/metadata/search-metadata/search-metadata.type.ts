import { IMetaDataApi } from "../../../models";

export interface ISearchMetaDataResponse {
  data: IMetaDataApi[];
}

export interface ISearchMetaDataError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchMetaDataParams {
  from?: string;
  to?: string;

  size?: number;
  data_type: string;
  id?: string;
  name?: string;
  category_name?: string;
  category_id?: string;
  service_name?: string;
}
