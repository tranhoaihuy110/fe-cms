import { ICampaignAudienceMasterGetApi } from "../../../models";

export interface ISearchCampaignAudienceMasterResponse {
  data: ICampaignAudienceMasterGetApi[];
}

export interface ISearchCampaignAudienceMasterError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchCampaignAudienceMasterParams {
  to?: string;
  from?: string;
  size?: number;
  id?: string;
  target_desc?: string;
  target_name?: string
  condition?: string;
  user_create?: string;
  status?: string;
  mode?: string;
}   
