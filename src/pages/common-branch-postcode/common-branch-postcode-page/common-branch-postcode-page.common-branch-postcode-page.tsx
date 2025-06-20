import {
  PageMeta,
} from "../../../components/index";
import { CommonBranchPostcodeTable } from "../index";

export const CommonBranchPostcodeTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <CommonBranchPostcodeTable />
      </div>
    </>
  );
};
