import {
  PageMeta,
} from "../../../components/index";
import { CampaignMasterTable } from "../index";

export const CampaignMasterTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <CampaignMasterTable />
      </div>
    </>
  );
};
