import { ILeadsPostApi } from "../../../models";

export interface IPostLeadsResponse {
  data: ILeadsPostApi[];
}

export interface IPostLeadsError {
  message: string;
  statusCode: number;
  error: string;
}
