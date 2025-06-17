import { IPropertyRoomGetApi } from "../../../models";
import { MS_API } from "../../api";

export interface ISortPropertyRoomParams {
  page?: number;
  size?: number;
  option: string;
  ascDesc: string;
}

export const sortPropertyRoomApi = async (
  params: ISortPropertyRoomParams
): Promise<{ data: IPropertyRoomGetApi[] }> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  const queryParams = {
    page: params.page ?? 1,
    size: params.size ?? 10,
    sort: `${params.option},${params.ascDesc}`,
  };

  const res = await MS_API.get<{ data: IPropertyRoomGetApi[] }>(
    "/api/v1/property-rooms/list",
    {
      params: queryParams,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
