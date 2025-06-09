export interface IGetTotalCampaignEmailTemplateError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalCampaignEmailTemplateParams {
  id?: string;
  template_email_code?: string;
  email_subject?: string;
  email_body?: string;
  email_type?: string;
  template_email_keys?: string;
  created_at?: string;
  updated_at?: string;
  user_create?: string;
  from?:string;
  to?:string
}
