import {
  PageMeta,
} from "../../../components/index";
import { ApiLogsTable } from "../index";

export const ApiLogsTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <ApiLogsTable />
      </div>
    </>
  );
};
