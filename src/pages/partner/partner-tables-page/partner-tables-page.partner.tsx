import {

  PageMeta,
} from "../../../components/index";
import { PartnerTable } from "../table-partner/index";
export const PartnerTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
        <PartnerTable />
      </div>
    </>
  );
};
