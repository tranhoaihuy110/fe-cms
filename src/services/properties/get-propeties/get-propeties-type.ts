import { IPropertiesGetApi } from "../../../models";

export interface IGetPropertiesResponse {
  data: IPropertiesGetApi[];
}

export interface IGetPropertiesError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetPropertiesParams {
  page: number;
  size: number;
  property_id?: string;
}
