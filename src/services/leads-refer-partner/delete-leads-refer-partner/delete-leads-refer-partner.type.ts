import { ILeadsReferPartnerResponseApi } from "../../../models";

export interface IDeleteLeadsReferPartnerResponse {
  data: ILeadsReferPartnerResponseApi[];
}

export interface IDeleteLeadsReferPartnerError {
  message: string;
  statusCode: number;
  error: string;
}
