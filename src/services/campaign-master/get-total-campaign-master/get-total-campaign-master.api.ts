
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MS_API } from "../../api";
import { IGetTotalCampaignMasterParams } from "./index";
interface getTotalCampaignMasterApi {
  data: { total: number }[];
}
export const getTotalCampaignMasterApi = async (params: IGetTotalCampaignMasterParams) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<getTotalCampaignMasterApi>("/api/v1/campaign-master/total", {
    headers: { Authorization: `Bearer ${token}` },    
    params: {
        created_at_from: params.from,
        created_at_to: params.to,
        id : params.id,
        campaign_name: params.campaign_name,
        campaign_type: params.campaign_type,
        campaign_desc: params.campaign_desc,
        campaign_status: params.campaign_status,
        audience_number: params.audience_number,
        email_template_id: params.email_template_id,
        json_metadata: params.json_metadata,
        updated_at: params.updated_at,
        created_user: params.created_user,
        segment: params.segment,
        email_template_final: params.email_template_final,
        send_by_email: params.send_by_email,
      },
  });
  return res.data.data[0].total || 0;
};

