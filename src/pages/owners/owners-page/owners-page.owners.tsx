import {
  PageMeta,
} from "../../../components/index";
import { OwnersTable } from "../../index";

export const OwnersTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <OwnersTable />
      </div>
    </>
  );
};
