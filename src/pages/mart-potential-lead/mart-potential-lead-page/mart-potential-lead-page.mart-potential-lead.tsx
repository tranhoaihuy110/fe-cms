import {
  PageMeta,
} from "../../../components/index";
import { MartPotentialLeadTable } from "../../index";

export const MartPotentialLeadTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <MartPotentialLeadTable />
      </div>
    </>
  );
};
