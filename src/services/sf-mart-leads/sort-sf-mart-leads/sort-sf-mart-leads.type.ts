import { ISfMartLeadsGetApi } from "../../../models";

export interface ISortSfMartLeadsResponse {
  data: ISfMartLeadsGetApi[];
}

export interface ISortSfMartLeadsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortSfMartLeadsParams {
  option: string;
  ascDesc: string;
  page?: number;
  size?: number;
}
