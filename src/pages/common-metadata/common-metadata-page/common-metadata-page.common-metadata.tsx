import {
  PageMeta,
} from "../../../components/index";
import { CommonMetadataTable } from "../index";

export const CommonMetadataTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <CommonMetadataTable />
      </div>
    </>
  );
};
