export interface ICampaignEmailTemplateGetApi {
  id?: string;
  template_email_code: string;
  email_subject: string;
  email_body: string;
  email_type: string;
  template_email_keys: string;
  created_at?: string;
  updated_at?: string;
  user_create: string;
}

export interface ICampaignEmailTemplatePostApi {
  template_email_code: string;
  email_subject: string;
  email_body: string;
  email_type: string;
  template_email_keys: string;
  user_create: string;
}

export interface ICampaignEmailTemplatePatchApi {
  template_email_code: string;
  email_subject: string;
  email_body: string;
  email_type: string;
  template_email_keys: string;
  user_create: string;
}

export interface ICampaignEmailTemplateResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}
