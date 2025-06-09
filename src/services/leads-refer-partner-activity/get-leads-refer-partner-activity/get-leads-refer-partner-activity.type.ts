import { ILeadsReferPartnerActivityGetApi } from "../../../models";

export interface IGetLeadsReferPartnerActivityResponse {
  data: ILeadsReferPartnerActivityGetApi[];
}

export interface IGetLeadsReferPartnerActivityError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetLeadsReferPartnerActivityParams {
  page: number;
  size: number;
  id?: string;
}