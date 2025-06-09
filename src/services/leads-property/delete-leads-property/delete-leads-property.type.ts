import { ILeadsPropertyResponseApi } from "../../../models";

export interface IDeleteLeadsPropertyResponse {
  data: ILeadsPropertyResponseApi[];
}

export interface IDeleteLeadsPropertyError {
  message: string;
  statusCode: number;
  error: string;
}
