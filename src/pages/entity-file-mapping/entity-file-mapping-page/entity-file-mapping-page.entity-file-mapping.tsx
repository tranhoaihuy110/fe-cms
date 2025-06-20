import {
  PageMeta,
} from "../../../components/index";
import { EntityFileMappingTable } from "../index";

export const EntityFileMappingTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <EntityFileMappingTable />
      </div>
    </>
  );
};
