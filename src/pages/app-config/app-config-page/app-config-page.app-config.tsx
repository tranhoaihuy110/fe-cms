import {
  PageMeta,
} from "../../../components/index";
import { AppConfigTable } from "../index";

export const AppConfigTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <AppConfigTable />
      </div>
    </>
  );
};
