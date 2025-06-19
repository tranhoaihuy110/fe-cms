import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { LoadingMore } from "../../../components";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getLeadActivityApi,
  searchLeadActivityApi,
  sortLeadActivityApi,
  postLeadActivityApi,
  patchLeadActivityApi,
  deleteLeadActivityApi,
} from "../../../services";
import { ILeadActivityGetApi } from "../../../models";
import {
  DeleteLeadActivityConfirmationModal,
  LeadActivityFormModal,
} from "../index";

import { ILeadActivitiesTableProps } from "./index";

export const LeadActivityTable: React.FC<ILeadActivitiesTableProps> = (
  props
) => {
  const { children = "" } = props;

  const initialFormData: ILeadActivityGetApi = {
    activity_id: "",
    lead_id: 0,
    email: "",
    activity_type: "",
    activity_date: "",
    description: "",
    status: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "activity_id", label: "Id", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "description", label: "Description", type: "text" },
    { key: "activity_type", label: "Activity Type", type: "text" },
  ];

  const fieldMapping = {
    id: "activity_id" as keyof ILeadActivityGetApi,
    email: "email" as keyof ILeadActivityGetApi,
    description: "description" as keyof ILeadActivityGetApi,
    createdAt: "activity_date" as keyof ILeadActivityGetApi,
  };

  const mapToForm = (data: ILeadActivityGetApi): ILeadActivityGetApi => ({
    activity_id: data.activity_id || "",
    lead_id: data.lead_id || 0,
    activity_type: data.activity_type || "",
    description: data.description || "",
    status: data.status || "",
  });

  const mapFromForm = (
    data: ILeadActivityGetApi
  ): Partial<ILeadActivityGetApi> => ({
    activity_id: data.activity_id,
    lead_id: data.lead_id,
    activity_type: data.activity_type,
    description: data.description,
    status: data.status,
  });

  const mapResponse = (
    response: any
  ): { data: ILeadActivityGetApi[]; total?: number } => {
    if (!response || !response.data) {
      return { data: [], total: 0 };
    }
    return {
      data: response.data,
      total: response.pagination?.total || 0,
    };
  };
  const wrappedDeleteLeadActivityApi = async (id: string): Promise<any> => {
    return await deleteLeadActivityApi(id);
  };

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,

    itemsPerPageOptions,
    isModalOpen,
    modalMode,
    currentItem,
    isDeleteModalOpen,
    itemToDelete,
    filters,
    setFilter,
    startDate,

    endDate,

    timeFilter,
    handleTimeFilter,
    handleItemsPerPageChange,
    handleStartDateChange,
    handleEndDateChange,
    handleClearFilter,
    handleSearch,
    handleReset,
    handleSort,
    openAddModal,
    openEditModal,
    openDetailModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
    paginatedData,
    effectiveTotalItems,
    sortConfig,
    loading,
    error,
    isFilterActive
  } = useTableData<
    ILeadActivityGetApi,
    ILeadActivityGetApi,
    { page: number; size: number; activity_id?: string; key?: string },
    {
      page: number;
      size: number;
      activity_id?: string;
      email?: string;
      from?: string;
      to?: string;
    },
    {
      page: number;
      size: number;
      sort: { field: string; direction: "asc" | "desc" };
    },
    string
  >({
    fetchData: async ({
      page,
      size,
      activity_id,
      email,
    }: {
      page: number;
      size: number;
      activity_id?: string;
      email?: string;
    }) => {
      const response = await getLeadActivityApi({
        page,
        size,
        activity_id: activity_id || "",
        email: email || "",
        sort: "activity_date,desc",
      });
      console.log("getLeadActivityApi response:", response);
      return response;
    },
    searchData: async ({
      size,
      activity_id,
      email,
      from,
      to,
    }: {
      page: number;
      size: number;
      activity_id?: string;
      email?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchLeadActivityApi({
        size,
        activity_id,
        email,
        from,
        to,
      });
      console.log("searchLeadActivityApi response:", response);
      return response;
    },
    sortData: async ({
      page,
      size,
      sort,
    }: {
      page: number;
      size: number;
      sort: { field: string; direction: "asc" | "desc" };
    }) => {
      const response = await sortLeadActivityApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortLeadActivityApi response:", response);
      return response;
    },
    fetchById: async (activity_id: string) => {
      const response = await getLeadActivityApi({
        page: 1,
        size: 1,
        activity_id,
      });
      console.log("getLeadActivityApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Metadata not found");
      }
      return response.data[0];
    },
    addData: postLeadActivityApi,
    updateData: patchLeadActivityApi,
    deleteData: wrappedDeleteLeadActivityApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.activity_id !== undefined && filters.activity_id !== null
      ? String(filters.activity_id)
      : "";
  const searchKeyTerm =
    filters.email !== undefined && filters.email !== null
      ? String(filters.email)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("activity_id", value || null);
  const setSearchKeyTerm = (value: string) => setFilter("email", value || null);

  const handleClearSearchId = () => handleClearFilter("activity_id");
  const handleClearSearchKey = () => handleClearFilter("email");

  const columns = [
    { key: "activity_id" as keyof ILeadActivityGetApi, header: "Activity ID" },
    {
      key: "lead_id" as keyof ILeadActivityGetApi,
      header: "Lead ID",
    },
    {
      key: "email" as keyof ILeadActivityGetApi,
      header: "Email",
      render: (item: ILeadActivityGetApi) => {
        const maxLength = 80;
        const displayValues =
          (item.email || "").length > maxLength
            ? (item.email || "").substring(0, maxLength) + "..."
            : item.email || "";
        return <div>{displayValues}</div>;
      },
    },
    {
      key: "activity_type" as keyof ILeadActivityGetApi,
      header: "Activity Type",
      render: (item: ILeadActivityGetApi) => {
        const maxLength = 80;
        const displayMetaValues =
          (item.activity_type || "").length > maxLength
            ? (item.activity_type || "").substring(0, maxLength) + "..."
            : item.activity_type || "";
        return <div>{displayMetaValues}</div>;
      },
    },
    {
      key: "activity_date" as keyof ILeadActivityGetApi,
      header: "Activity Date",
      render: (item: ILeadActivityGetApi) =>
        new Date(item.activity_date || "").toLocaleString(),
    },
    { key: "actions" as keyof ILeadActivityGetApi, header: "Actions" },
  ];

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <FilterSection
          startDate={startDate}
          setStartDate={handleStartDateChange}
          endDate={endDate}
          setEndDate={handleEndDateChange}
          timeFilter={timeFilter}
          handleTimeFilter={handleTimeFilter}
          searchIdTerm={searchIdTerm}
          setSearchIdTerm={setSearchIdTerm}
          searchNameTerm={searchKeyTerm}
          setSearchNameTerm={setSearchKeyTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchKey}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          hideNameSearch={false}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by Email"
          idSearchType="text"
          hidePhoneEmail={true}
          hideAddButton={false}
          searchPhoneTerm=""
          searchUsernameTerm=""
          setSearchPhoneTerm={setSearchKeyTerm}
          setSearchUsernameTerm={setSearchKeyTerm}
          handleClearSearchPhone={handleClearSearchKey}
          handleClearSearchUsername={handleClearSearchKey}
        />

        <div className="max-w-full overflow-x-auto">
          {loading && (isFilterActive || !paginatedData.length) ? (
            <div className="p-4 flex justify-center items-center">
              <LoadingMore />
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500 dark:text-red-400">
              {error}
            </div>
          ) : !paginatedData || paginatedData.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No metadata found for the selected filters.
            </div>
          ) : (
            <TableComponent
              data={paginatedData}
              columns={columns}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              onDetail={openDetailModal}
              sortConfig={sortConfig}
              handleSort={handleSort}
            />
          )}
        </div>

        <PaginationSection
          totalItems={effectiveTotalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      <LeadActivityFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteLeadActivityConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};
