import { IPropertyFloorsGetApi } from "../../../models";

export interface ISearchPropertyFloorsResponse {
  data: IPropertyFloorsGetApi[];
}

export interface ISearchPropertyFloorsError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchPropertyFloorsParams {
  to?: string;
  from?: string;
  size?: number;
  id?:string;
  property_id?: string;
  floor_type?: string;
  floor_name?: string;
}
