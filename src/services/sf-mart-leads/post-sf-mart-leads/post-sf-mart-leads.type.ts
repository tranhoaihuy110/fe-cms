import { ISfMartLeadsPostApi } from "../../../models";

export interface IPostSfMartLeadsResponse {
  data: ISfMartLeadsPostApi[];
}

export interface IPostSfMartLeadsError {
  message: string;
  statusCode: number;
  error: string;
}
