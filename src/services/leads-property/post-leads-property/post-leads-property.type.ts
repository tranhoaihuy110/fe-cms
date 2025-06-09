import { ILeadsPropertyPostApi } from "../../../models";

export interface IPostLeadsPropertyResponse {
  data: ILeadsPropertyPostApi[];
}

export interface IPostLeadsPropertyError {
  message: string;
  statusCode: number;
  error: string;
}
