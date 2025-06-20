import {
  PageMeta,
} from "../../../components/index";
import { AppUserPendingTable } from "../../index";

export const AppUserPendingTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <AppUserPendingTable />
      </div>
    </>
  );
};
