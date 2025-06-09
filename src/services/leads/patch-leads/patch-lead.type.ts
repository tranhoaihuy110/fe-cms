import { ILeadsPatchApi } from "../../../models";

export interface IPatchLeadsResponse {
  data: ILeadsPatchApi[];
}

export interface IPatchLeadsError {
  message: string;
  statusCode: number;
  error: string;
}
