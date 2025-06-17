/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserBehaviorLogGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getUserBehaviorLogApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IUserBehaviorLogGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: IUserBehaviorLogGetApi[] }>(
        "/api/v1/user-behavior-log/list",
        { params }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
