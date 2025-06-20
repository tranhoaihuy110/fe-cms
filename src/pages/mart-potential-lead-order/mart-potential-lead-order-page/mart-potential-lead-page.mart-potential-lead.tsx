import {
  PageMeta,
} from "../../../components/index";
import { MartPotentialLeadOrderTable } from "../../index";

export const MartPotentialLeadOrderTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <MartPotentialLeadOrderTable />
      </div>
    </>
  );
};
