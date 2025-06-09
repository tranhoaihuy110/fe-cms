import { ILeadsReferPartnerActivityPostApi } from "../../../models";

export interface IPostLeadsReferPartnerActivityResponse {
  data: ILeadsReferPartnerActivityPostApi[];
}

export interface IPostLeadsReferPartnerActivityError {
  message: string;
  statusCode: number;
  error: string;
}
