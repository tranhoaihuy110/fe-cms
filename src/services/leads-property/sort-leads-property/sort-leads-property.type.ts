import { ILeadsPropertyGetApi } from "../../../models";

export interface ISortLeadsPropertyResponse {
  data: ILeadsPropertyGetApi[];
}

export interface ISortLeadsPropertyError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortLeadsPropertyParams {
  option: string;
  ascDesc: string; 
  page?: number; 
  size?: number; 
}