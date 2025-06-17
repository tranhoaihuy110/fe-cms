/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPropertyFloorsGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getPropertyFloorsApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IPropertyFloorsGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IPropertyFloorsGetApi[] }>("/api/v1/property-floors/list", {
      params,
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
