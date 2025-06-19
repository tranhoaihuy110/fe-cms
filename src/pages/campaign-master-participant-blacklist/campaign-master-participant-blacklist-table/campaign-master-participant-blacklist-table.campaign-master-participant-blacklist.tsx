import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { LoadingMore } from "../../../components";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getCampaignMasterParticipantBlacklistApi,
  searchCampaignMasterParticipantBlacklistApi,
  sortCampaignMasterParticipantBlacklistApi,
  postCampaignMasterParticipantBlacklistApi,
  patchCampaignMasterParticipantBlacklistApi,
  deleteCampaignMasterParticipantBlacklistApi,
} from "../../../services";
import { ICampaignMasterParticipantBlacklistProps } from "./index";
import { ICampaignMasterParticipantBlacklistGetApi } from "../../../models";
import {
  DeleteCampaignMasterParticipantBlacklistConfirmationModal,
  CampaignMasterParticipantBlacklistFormModal,
} from "../index";

export const CampaignMasterParticipantBlacklistTable: React.FC<
  ICampaignMasterParticipantBlacklistProps
> = (props) => {
  const { children = "" } = props;

  const initialFormData: ICampaignMasterParticipantBlacklistGetApi = {
    id: "",
    email: "",
    full_name: "",
    check_email: "",
    phone: "",
    status_email: "",
    json_metadata: {},
    created_at: "",
    updated_at: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "full_name", label: "Full Name", type: "text" },
    { key: "check_email", label: "Check Email", type: "text" },
    { key: "phone", label: "Phone", type: "text" },
    { key: "status_email", label: "Status Email", type: "text" },
    { key: "json_metadata", label: "Json Metadata", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof ICampaignMasterParticipantBlacklistGetApi,
    email: "email" as keyof ICampaignMasterParticipantBlacklistGetApi,
    full_name: "full_name" as keyof ICampaignMasterParticipantBlacklistGetApi,
    check_email:
      "check_email" as keyof ICampaignMasterParticipantBlacklistGetApi,
    phone: "phone" as keyof ICampaignMasterParticipantBlacklistGetApi,
    status_email:
      "status_email" as keyof ICampaignMasterParticipantBlacklistGetApi,
    json_metadata:
      "json_metadata" as keyof ICampaignMasterParticipantBlacklistGetApi,
    created_at: "created_at" as keyof ICampaignMasterParticipantBlacklistGetApi,
    updated_at: "updated_at" as keyof ICampaignMasterParticipantBlacklistGetApi,
  };

  const mapToForm = (
    data: ICampaignMasterParticipantBlacklistGetApi
  ): ICampaignMasterParticipantBlacklistGetApi => ({
    id: data.id || "",
    email: data.email || "",
    full_name: data.full_name || "",
    check_email: data.check_email || "",
    phone: data.phone || "",
    status_email: data.status_email || "",
    json_metadata: data.json_metadata || {},
    created_at: data.created_at || "",
    updated_at: data.updated_at || "",
  });

  const mapFromForm = (
    data: ICampaignMasterParticipantBlacklistGetApi
  ): Partial<ICampaignMasterParticipantBlacklistGetApi> => {
    return {
      id: data.id || undefined,
      email: data.email,
      full_name: data.full_name,
      check_email: data.check_email,
      phone: data.phone,
      status_email: data.status_email,
      json_metadata: data.json_metadata,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  };

  const mapResponse = (
    response: any
  ): { data: ICampaignMasterParticipantBlacklistGetApi[]; total?: number } => {
    if (!response || !response.data) {
      return { data: [], total: 0 };
    }
    return {
      data: response.data,
      total: response.pagination?.total || 0,
    };
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
    ICampaignMasterParticipantBlacklistGetApi,
    ICampaignMasterParticipantBlacklistGetApi,
    { page: number; size: number; id?: string },
    {
      page: number;
      size: number;
      id?: string;
      email?: string;
      full_name?: string;
      check_email?: string;
      phone?: string;
      status_email?: string;
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
      id,
    }: {
      page: number;
      size: number;
      id?: string;
    }) => {
      const response = await getCampaignMasterParticipantBlacklistApi({
        page,
        size,
        id: id || "",
        sort: "created_at,desc",
      });
      console.log(
        "getCampaignMasterParticipantBlacklistApi response:",
        response
      );
      return response;
    },
    searchData: async ({
      id,
      from,
      to,
      email,
      full_name,
      check_email,
      phone,
      status_email,
    }: {
      id?: string;
      from?: string;
      to?: string;
      email?: string;
      full_name?: string;
      check_email?: string;
      phone?: string;
      status_email?: string;
    }) => {
      const response = await searchCampaignMasterParticipantBlacklistApi({
        id,
        from,
        to,
        email,
        full_name,
        check_email,
        phone,
        status_email,
      });
      console.log(
        "searchCampaignMasterParticipantBlacklistApi response:",
        response
      );
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
      const response = await sortCampaignMasterParticipantBlacklistApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log(
        "sortCampaignMasterParticipantBlacklistApi response:",
        response
      );
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getCampaignMasterParticipantBlacklistApi({
        page: 1,
        size: 1,
        id: id,
      });
      if (!response.data || !response.data[0]) {
        throw new Error("Campaign Master not found");
      }
      return response.data[0];
    },
    addData: postCampaignMasterParticipantBlacklistApi,
    updateData: patchCampaignMasterParticipantBlacklistApi,
    deleteData: deleteCampaignMasterParticipantBlacklistApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null ? String(filters.id) : "";
  const searchEmailTerm =
    filters.email !== undefined && filters.email !== null
      ? String(filters.email)
      : "";
  const searchFullNameTerm =
    filters.full_name !== undefined && filters.full_name !== null
      ? String(filters.full_name)
      : "";
  const searchPhoneTerm =
    filters.phone !== undefined && filters.phone !== null
      ? String(filters.phone)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchEmailTerm = (value: string) =>
    setFilter("email", value || null);
  const setSearchFullNameTerm = (value: string) =>
    setFilter("full_name", value || null);
  const setSearchPhoneTerm = (value: string) =>
    setFilter("phone", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchFullName = () => handleClearFilter("full_name");
  const handleClearSearchPhone = () => handleClearFilter("phone");
  const handleClearSearchStatusEmail = () => handleClearFilter("status_email");

  const columns = [
    {
      key: "id" as keyof ICampaignMasterParticipantBlacklistGetApi,
      header: "ID",
    },
    {
      key: "email" as keyof ICampaignMasterParticipantBlacklistGetApi,
      header: "Email",
    },
    {
      key: "full_name" as keyof ICampaignMasterParticipantBlacklistGetApi,
      header: "Full Name",
    },
    {
      key: "check_email" as keyof ICampaignMasterParticipantBlacklistGetApi,
      header: "Check Email",
    },
    {
      key: "phone" as keyof ICampaignMasterParticipantBlacklistGetApi,
      header: "Phone",
    },
    {
      key: "status_email" as keyof ICampaignMasterParticipantBlacklistGetApi,
      header: "Status Email",
    },
    {
      key: "updated_at" as keyof ICampaignMasterParticipantBlacklistGetApi,
      header: "Date Updated",
      render: (item: ICampaignMasterParticipantBlacklistGetApi) =>
        new Date(item.updated_at || "").toLocaleString(),
    },
    {
      key: "created_at" as keyof ICampaignMasterParticipantBlacklistGetApi,
      header: "Date Created",
      render: (item: ICampaignMasterParticipantBlacklistGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "actions" as keyof ICampaignMasterParticipantBlacklistGetApi,
      header: "Actions",
    },
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
          searchNameTerm={searchFullNameTerm}
          setSearchNameTerm={setSearchFullNameTerm}
          searchUsernameTerm={searchEmailTerm}
          setSearchUsernameTerm={setSearchEmailTerm}
          searchPhoneTerm={searchPhoneTerm}
          setSearchPhoneTerm={setSearchPhoneTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchFullName}
          handleClearSearchPhone={handleClearSearchPhone}
          handleClearSearchUsername={handleClearSearchStatusEmail}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by Full Name"
          thirdSearchLabel="Search by Email"
          fourthSearchLabel="Search by Phone"
          idSearchType="text"
          hidePhoneEmail={false}
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
              No campaign master found for the selected filters.
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
      <CampaignMasterParticipantBlacklistFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        onReset={handleReset}
        config={currentItem || initialFormData}
      />
      <DeleteCampaignMasterParticipantBlacklistConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
        onReset={handleReset}
      />
      {children}
    </>
  );
};
