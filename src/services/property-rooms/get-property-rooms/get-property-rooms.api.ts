/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPropertyRoomGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getPropertyRoomApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IPropertyRoomGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IPropertyRoomGetApi[] }>("/api/v1/property-rooms/list", {
      params,
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
