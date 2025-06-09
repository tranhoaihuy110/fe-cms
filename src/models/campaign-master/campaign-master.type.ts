export interface ICampaignMasterGetApi {
  id: string;
  campaign_name: string;
  campaign_type: string;
  campaign_desc: string | null;
  campaign_status: string;
  audience_number: string;
  email_template_id: string | null;
  json_metadata: Record<string, any>;
  created_at: string;
  updated_at: string | null;
  created_user: string;
  segment: string;
  email_template_final: string;
  send_by_email: string;
}

export interface ICampaignMasterPostApi {
  campaign_type: string;
  campaign_desc: string | null;
  campaign_status: string;
  audience_number: string;
  email_template_id: string | null;
  json_metadata: Record<string, any>;
  created_user: string;
  segment: string;
  email_template_final: string;
  send_by_email: string;
}

export interface ICampaignMasterPatchApi {
  campaign_type: string;
  campaign_desc: string | null;
  campaign_status: string;
  audience_number: string;
  email_template_id: string | null;
  json_metadata: Record<string, any>;
  created_user: string;
  segment: string;
  email_template_final: string;
  send_by_email: string;
}

export interface ICampaignMasterResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}
