import { IPropertiesResponseApi } from "../../../models";

export interface IDeletePropertiesResponse {
  data: IPropertiesResponseApi[];
}

export interface IDeletePropertiesError {
  message: string;
  statusCode: number;
  error: string;
}
