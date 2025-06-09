import { ICampaignMasterGetApi } from "../../../models";

export interface IGetCampaignMasterResponse {
  data: ICampaignMasterGetApi[];
}

export interface IGetCampaignMasterError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetCampaignMasterParams {
  page: number; 
  size: number; 
  id?: string;
}