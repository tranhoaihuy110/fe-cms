import { ICampaignAudienceMasterGetApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortCampaignAudienceMasterParams {
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortCampaignAudienceMasterApi = async (
  params: ISortCampaignAudienceMasterParams
): Promise<{data:ICampaignAudienceMasterGetApi[]}> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: ICampaignAudienceMasterGetApi[] }>("/api/v1/campaign-audience-master/list", {
    params: queryParams,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
