import { ICampaignMasterGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchCampaignMasterParams } from "./index";

export const searchCampaignMasterApi = (params: ISearchCampaignMasterParams) => {
  return new Promise<ICampaignMasterGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: ICampaignMasterGetApi[] }>("/api/v1/campaign-master/list", {  
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
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};

