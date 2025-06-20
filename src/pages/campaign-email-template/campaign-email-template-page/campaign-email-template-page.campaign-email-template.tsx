import {
  PageMeta,
} from "../../../components/index";
import { CampaignEmailTemplateTable } from "../index";

export const CampaignEmailTemplateTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <CampaignEmailTemplateTable />
      </div>
    </>
  );
};
