import {  IAppUserResponseApi } from "../../../models";

export interface IDeleteAppUserResponse {
  data: IAppUserResponseApi[];
}

export interface IDeleteAppUserError {
  message: string;
  statusCode: number;
  error: string;
}
