import { ILeadActivityResponseApi } from "../../../models";

export interface IDeleteLeadActivityResponse {
  data: ILeadActivityResponseApi[];
}

export interface IDeleteLeadActivityError {
  message: string;
  statusCode: number;
  error: string;
}
