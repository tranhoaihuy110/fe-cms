export interface ICampaignAudienceMasterGetApi {
  id?: string;
  target_desc: string
  condition: string
  create_date: string
  user_create: string
  status: string
  mode: string
  json_filter: string
  fb_custom_audience_id: string
  list_project_short_name: string
  last_crond_date: string
  platform: string
}

export interface ICampaignAudienceMasterResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ICampaignAudienceMasterPatchApi {
  id?: string;
  target_desc: string
  condition: string
  create_date: string
  user_create: string
  status: string
  mode: string
  json_filter: string
  fb_custom_audience_id: string
  list_project_short_name: string
  last_crond_date: string
  platform: string
}

export interface ICampaignAudienceMasterPostApi {
  target_desc: string
  condition: string
  create_date: string
  user_create: string
  status: string
  mode: string
  json_filter: string
  fb_custom_audience_id: string
  list_project_short_name: string
  last_crond_date: string
  platform: string
}
