import { ICampaignEmailTemplateGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ICampaignEmailTemplateParams } from "./index";

export const searchCampaignEmailTemplateApi = (params: ICampaignEmailTemplateParams) => {
  return new Promise<{ data: ICampaignEmailTemplateGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ICampaignEmailTemplateGetApi[] }>("/api/v1/campaign-email-template/list", {
      params: {
        created_at_from: params.from,
        created_at_to: params.to,
        size: params.size,
        id: params.id,
        template_email_code: params.template_email_code,
        email_subject: params.email_subject,
        email_body: params.email_body,
        email_type: params.email_type,
        template_email_keys: params.template_email_keys,
        created_at: params.created_at,
        updated_at: params.updated_at,
        user_create: params.user_create,
      },
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
