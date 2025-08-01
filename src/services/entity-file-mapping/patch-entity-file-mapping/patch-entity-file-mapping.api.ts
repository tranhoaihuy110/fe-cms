import { MS_API } from "../../api";

export const patchEntityFileMappingApi = (value?: Record<string, any>) => {
  const { id, ...payload } = value || {};
  if (!id) {
    return Promise.reject(new Error("id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(
      `/api/v1/entity-file-mapping/update/${id}`,
      payload
    )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};