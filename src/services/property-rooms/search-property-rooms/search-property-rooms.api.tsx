import { IPropertyRoomGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchPropertyRoomParams } from "./index";

export const searchPropertyRoomApi = (
  params: ISearchPropertyRoomParams
) => {
  return new Promise<{ data: IPropertyRoomGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IPropertyRoomGetApi[] }>(
      "/api/v1/property-rooms/list",
      {
        params: {
          created_at_from: params.from,
          created_at_to: params.to,
          property_id: params.property_id,
          id: params.id,
          size: params.size,
          floor_id: params.floor_id,
          room_type: params.room_type,
          room_name: params.room_name
        },
      }
    )
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
