import { IPropertiesGetApi } from "../../../models";

export interface ISortPropertiesResponse {
  data: IPropertiesGetApi[];
}

export interface ISortPropertiesError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortPropertiesParams {
  option: string;
  ascDesc: string;
  page?: number;
  size?: number;
}
