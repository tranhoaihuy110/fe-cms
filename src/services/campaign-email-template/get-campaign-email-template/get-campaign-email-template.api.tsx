/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICampaignEmailTemplateGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getCampaignEmailTemplateApi = (params?: Record<string, any>) => {
  return new Promise<{ data: ICampaignEmailTemplateGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ICampaignEmailTemplateGetApi[] }>("/api/v1/campaign-email-template/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
