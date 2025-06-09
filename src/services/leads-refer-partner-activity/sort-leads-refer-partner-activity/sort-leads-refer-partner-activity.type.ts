import { ILeadsReferPartnerActivityGetApi } from "../../../models";

export interface ISortLeadsReferPartnerActivityResponse {
  data: ILeadsReferPartnerActivityGetApi[];
}

export interface ISortLeadsReferPartnerActivityError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortLeadsReferPartnerActivityParams {
  option: string;
  ascDesc: string; 
  page?: number; 
  size?: number; 
}