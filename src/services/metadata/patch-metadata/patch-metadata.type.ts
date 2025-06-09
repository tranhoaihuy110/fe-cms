import { IMetaDataApi } from "../../../models";

export interface IPatchMetaDataResponse {
  data: IMetaDataApi[];
}

export interface IPatchMetaDataError {
  message: string;
  statusCode: number;
  error: string;
}
