import {
  PageMeta,
} from "../../../components/index";
import { AppUserTable } from "../index";

export const AppUserTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <AppUserTable />
      </div>
    </>
  );
};
