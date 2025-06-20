import {
  PageMeta,
} from "../../../components/index";
import { CommonMetadataFinalTable } from "../index";

export const CommonMetadataFinalTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <CommonMetadataFinalTable />
      </div>
    </>
  );
};
