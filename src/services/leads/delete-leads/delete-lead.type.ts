import { ILeadsResponseApi } from "../../../models";

export interface IDeleteLeadsResponse {
  data: ILeadsResponseApi[];
}

export interface IDeleteLeadsError {
  message: string;
  statusCode: number;
  error: string;
}
