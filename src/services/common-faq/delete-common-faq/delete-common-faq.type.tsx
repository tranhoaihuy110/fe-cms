import { ICommonFaqResponseApi } from "../../../models";

export interface IDeleteCommonFaqResponse {
  data: ICommonFaqResponseApi[];
}

export interface IDeleteCommonFaqError {
  message: string;
  statusCode: number;
  error: string;
}
