import {
  PageMeta,
} from "../../../components/index";
import { ServiceTable } from "../table-service/table-service.service";

export const ServiceTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
        <ServiceTable />
      </div>
    </>
  );
};
