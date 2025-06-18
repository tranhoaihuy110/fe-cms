import { ICampaignAudienceMasterGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getCampaignAudienceMasterApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ICampaignAudienceMasterGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ICampaignAudienceMasterGetApi[] }>("/api/v1/campaign-audience-master/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
