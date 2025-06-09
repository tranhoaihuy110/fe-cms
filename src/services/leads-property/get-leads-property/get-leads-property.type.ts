import { ILeadsPropertyGetApi } from "../../../models";

export interface IGetLeadsPropertyResponse {
  data: ILeadsPropertyGetApi[];
}

export interface IGetLeadsPropertyError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetLeadsPropertyParams {
  page: number;
  size: number;
  lead_property_id?: string;
}