import { IPropertyFloorsGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchPropertyFloorsParams } from "./index";

export const searchPropertyFloorsApi = (
  params: ISearchPropertyFloorsParams
) => {
  return new Promise<{ data: IPropertyFloorsGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IPropertyFloorsGetApi[] }>(
      "/api/v1/property-floors/list",
      {
        params: {
          created_at_from: params.from,
          created_at_to: params.to,
          property_id: params.property_id,
          id: params.id,
          size: params.size,
          floor_type: params.floor_type,
          floor_name: params.floor_name,
        },
      }
    )
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
