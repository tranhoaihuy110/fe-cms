/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICampaignMasterGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getCampaignMasterApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ICampaignMasterGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ICampaignMasterGetApi[] }>("/api/v1/campaign-master/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
