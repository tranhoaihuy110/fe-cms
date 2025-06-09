import { ISfMartLeadsPatchApi } from "../../../models";

export interface IPatchSfMartLeadsResponse {
  data: ISfMartLeadsPatchApi[];
}

export interface IPatchSfMartLeadsError {
  message: string;
  statusCode: number;
  error: string;
}
