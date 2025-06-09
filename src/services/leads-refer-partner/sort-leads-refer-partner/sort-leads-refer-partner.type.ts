import { ILeadsReferPartnerGetApi } from "../../../models";

export interface ISortLeadsReferPartnerResponse {
  data: ILeadsReferPartnerGetApi[];
}

export interface ISortLeadsReferPartnerError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortLeadsReferPartnerParams {
  option: string;
  ascDesc: string; 
  page?: number; 
  size?: number; 
}