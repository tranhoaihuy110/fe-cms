import {
  PageMeta,
} from "../../../components/index";
import { RentalsTable } from "../../index";

export const RentalsTables = () => {
  return (
    <>
      <PageMeta
        title="Druce"
        description="Druce"
      />
      <div className="space-y-6">
          <RentalsTable />
      </div>
    </>
  );
};
