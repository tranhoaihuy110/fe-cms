import {
  PageMeta,
} from "../../../components/index";
import { UserBehaviorLogTable } from "../../index";

export const UserBehaviorLogs = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <UserBehaviorLogTable />
      </div>
    </>
  );
};
