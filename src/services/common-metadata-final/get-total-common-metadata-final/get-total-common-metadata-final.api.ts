import { MS_API } from "../../api";
import { IGetTotalCommonMetadataFinalParams } from "./index";
interface GetTotalCommonMetaDataResponse {
  data: { total: number }[];
}
export const getTotalCommonMetadataFinalApi = async (
  params: IGetTotalCommonMetadataFinalParams
) => {
  const token = localStorage.getItem("access_token");
  const res = await MS_API.get<GetTotalCommonMetaDataResponse>(
    "/api/v1/common-metadata-final/total",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: params.id,
        meta_key: params.meta_key,
        created_at_from: params.from,
        created_at_to: params.to,
      },
    }
  );
  return res.data.data[0].total || 0;
};
