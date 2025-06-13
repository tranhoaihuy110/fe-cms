export interface ICampaignMasterParticipantBlacklistGetApi {
  id: string;
  full_name: string;
  email: string;
  check_email: string;
  phone: string;
  status_email: string;
  json_metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface ICampaignMasterParticipantBlacklistPostApi {
  full_name: string;
  email: string;
  check_email: string;
  phone: string;
  status_email: string;
  json_metadata: Record<string, any> | null;
}

export interface ICampaignMasterParticipantBlacklistPatchApi {
  full_name: string;
  email: string;
  check_email: string;
  phone: string;
  status_email: string;
  json_metadata: Record<string, any> | null;
}

export interface ICampaignMasterParticipantBlacklistResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}
