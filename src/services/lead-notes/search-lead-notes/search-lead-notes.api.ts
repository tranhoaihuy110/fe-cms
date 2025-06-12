import { ILeadNotesGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchLeadNotesParams } from "./index";

export const searchLeadNotesApi = (params: ISearchLeadNotesParams) => {
  return new Promise<{ data: ILeadNotesGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: ILeadNotesGetApi[] }>("/api/v1/leadnotes/list", {
      params: {
        lead_id: params.lead_id,
        note_id: params.note_id,
        created_at_from: params.from,
        created_at_to: params.to,    
        size: params.size,
      },
    })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
