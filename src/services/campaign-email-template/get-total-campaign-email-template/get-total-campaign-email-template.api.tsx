import { MS_API } from "../../api";
import { IGetTotalCampaignEmailTemplateParams } from "./index";

interface GetTotalCampaignEmailTemplateResponse {
  data: { total: number }[];
}
export const getTotalCampaignEmailTemplateApi = async (
  params: IGetTotalCampaignEmailTemplateParams
) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalCampaignEmailTemplateResponse>(
    "/api/v1/campaign-email-template/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        id: params.id,
        template_email_code: params.template_email_code,
        email_subject: params.email_subject,
        email_body: params.email_body,
        email_type: params.email_type,
        template_email_keys: params.template_email_keys,
        created_at: params.created_at,
        updated_at: params.updated_at,
        user_create: params.user_create,
        created_at_from: params.from,
        created_at_to: params.to,
      },
    }
  );
  return res.data.data[0].total || 0;
};
