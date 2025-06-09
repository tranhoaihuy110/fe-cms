import { ICommonFaqResponseApi } from "../../../models";

export interface IPostCommonFaqResponse {
  data: ICommonFaqResponseApi[];
}

export interface IPostCommonFaqError {
  message: string;
  statusCode: number;
  error: string;
}
