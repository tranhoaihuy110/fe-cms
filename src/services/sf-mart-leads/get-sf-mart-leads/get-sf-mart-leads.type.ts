import { ISfMartLeadsGetApi } from "../../../models";

export interface IGetSfMartLeadsResponse {
  data: ISfMartLeadsGetApi[];
}

export interface IGetSfMartLeadsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetSfMartLeadsParams {
  page: number;
  size: number;
  id?: string;
}
