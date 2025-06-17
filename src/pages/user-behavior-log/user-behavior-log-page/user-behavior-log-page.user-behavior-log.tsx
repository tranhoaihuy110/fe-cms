import {
  PageMeta,
} from "../../../components/index";
import { UserBehaviorLogTable } from "../../index";

export const UserBehaviorLogs = () => {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="space-y-6">
          <UserBehaviorLogTable />
      </div>
    </>
  );
};
