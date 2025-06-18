import { ICampaignAudienceMasterGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchCampaignAudienceMasterParams } from "./index";

export const searchCampaignAudienceMasterApi = (
  params: ISearchCampaignAudienceMasterParams
) => {
  return new Promise<{ data: ICampaignAudienceMasterGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: ICampaignAudienceMasterGetApi[] }>(
        "/api/v1/campaign-audience-master/list",
        {
          params: {
            created_date_from: params.from,
            created_date_to: params.to,
            size: params.size,
            id:params.id,
            target_desc: params.target_desc,
            target_name: params.target_name,
            condition: params.condition,
            user_create: params.user_create,
            status: params.status,
            mode: params.mode,
          },
        }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
