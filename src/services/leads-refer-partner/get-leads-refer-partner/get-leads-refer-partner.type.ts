import { ILeadsReferPartnerGetApi } from "../../../models";

export interface IGetLeadsReferPartnerResponse {
  data: ILeadsReferPartnerGetApi[];
}

export interface IGetLeadsReferPartnerError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetLeadsReferPartnerParams {
  page: number;
  size: number;
  refer_partner_id?: string;
}