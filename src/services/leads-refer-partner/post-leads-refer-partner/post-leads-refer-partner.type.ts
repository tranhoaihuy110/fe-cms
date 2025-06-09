import { ILeadsReferPartnerPostApi } from "../../../models";

export interface IPostLeadsReferPartnerResponse {
  data: ILeadsReferPartnerPostApi[];
}

export interface IPostLeadsReferPartnerError {
  message: string;
  statusCode: number;
  error: string;
}
