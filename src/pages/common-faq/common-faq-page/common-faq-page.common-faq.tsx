import {
  PageMeta,
} from "../../../components/index";
import { CommonFaqTable } from "../index";

export const CommonFaqTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <CommonFaqTable />
      </div>
    </>
  );
};
