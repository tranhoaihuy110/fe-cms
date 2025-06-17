import { ICampaignMasterParticipantBlacklistGetApi } from "../../../models";

 interface IPagination {
  total: number;
  page: number;
  size: number;
}

export interface ISearchCampaignMasterParticipantBlacklistResponse {
  data: ICampaignMasterParticipantBlacklistGetApi[];
  pagination: IPagination;
}

export interface ISearchCampaignMasterParticipantBlacklistError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchCampaignMasterParticipantBlacklistParams {
  from?: string;
  to?: string;
  id?: string;
  json_metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string | null;
  full_name?: string;
  email?: string;
  check_email?: string;
  phone?: string;
  status_email?: string;
  page?:number,
  size?:number
}   
