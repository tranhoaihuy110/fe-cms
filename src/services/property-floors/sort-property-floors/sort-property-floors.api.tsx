import { IPropertyFloorsGetApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortPropertyFloorsParams {
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortPropertyFloorsApi = async (
  params: ISortPropertyFloorsParams
): Promise<{ data: IPropertyFloorsGetApi[] }> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: IPropertyFloorsGetApi[] }>(
    "/api/v1/property-floors/list",
    {
      params: queryParams,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
