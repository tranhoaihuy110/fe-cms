export interface IGetTotalCampaignMasterError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalCampaignMasterParams {
  from?: string;
  to?: string;
  id?: string;
  campaign_name?: string;
  campaign_type?: string;
  campaign_desc?: string | null;
  campaign_status?: string;
  audience_number?: string;
  email_template_id?: string | null;
  json_metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string | null;
  created_user?: string;
  segment?: string;
  email_template_final?: string;
  send_by_email?: string;
}
