import { ILeadsGetApi } from "../../../models";

export interface ISortLeadsResponse {
  data: ILeadsGetApi[];
}

export interface ISortLeadsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortLeadsParams {
  option: string;
  ascDesc: string;
  page?: number;
  size?: number;
}
