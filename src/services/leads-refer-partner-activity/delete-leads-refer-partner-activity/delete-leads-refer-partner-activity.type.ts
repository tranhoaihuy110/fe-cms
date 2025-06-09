import { ILeadsReferPartnerActivityResponseApi } from "../../../models";

export interface IDeleteLeadsReferPartnerActivityResponse {
  data: ILeadsReferPartnerActivityResponseApi[];
}

export interface IDeleteLeadsReferPartnerActivityError {
  message: string;
  statusCode: number;
  error: string;
}
