import {
  PageMeta,
} from "../../../components/index";
import { SfMartLeadsTable } from "../../index";

export const SfMartLeadsTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <SfMartLeadsTable />
      </div>
    </>
  );
};
