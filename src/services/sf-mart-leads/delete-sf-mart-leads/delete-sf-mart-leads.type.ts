import { ISfMartLeadsResponseApi } from "../../../models";

export interface IDeleteSfMartLeadsResponse {
  data: ISfMartLeadsResponseApi[];
}

export interface IDeleteSfMartLeadsError {
  message: string;
  statusCode: number;
  error: string;
}
