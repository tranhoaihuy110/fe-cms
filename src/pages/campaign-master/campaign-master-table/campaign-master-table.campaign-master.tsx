import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getCampaignMasterApi,
  searchCampaignMasterApi,
  sortCampaignMasterApi,
  postCampaignMasterApi,
  patchCampaignMasterApi,
  deleteCampaignMasterApi,
} from "../../../services";
import { ICampaignMasterTableProps } from "./index";
import { ICampaignMasterGetApi } from "../../../models";
import {
  DeleteCampaignMasterConfirmationModal,
  CampaignMasterFormModal,
} from "../index";

export const CampaignMasterTable: React.FC<ICampaignMasterTableProps> = (
  props
) => {
  const { children = "" } = props;

  const initialFormData: ICampaignMasterGetApi = {
    id: "",
    campaign_desc: "",
    campaign_name: "",
    campaign_type: "",
    campaign_status: "",
    audience_number: "",
    email_template_id: "",
    json_metadata: {},
    created_at: "",
    updated_at: "",
    created_user: "",
    segment: "",
    email_template_final: "",
    send_by_email: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "campaign_name", label: "Campaign Name", type: "text" },
    { key: "campaign_type", label: "Campaign Type", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof ICampaignMasterGetApi,
    campaign_name: "campaign_name" as keyof ICampaignMasterGetApi,
    campaign_type: "campaign_type" as keyof ICampaignMasterGetApi,
    createdAt: "created_at" as keyof ICampaignMasterGetApi,
  };

  const mapToForm = (data: ICampaignMasterGetApi): ICampaignMasterGetApi => ({
    id: data.id || "",
    campaign_name: data.campaign_name || "",
    campaign_type: data.campaign_type || "",
    campaign_desc: data.campaign_desc || "",
    campaign_status: data.campaign_status || "",
    audience_number: data.audience_number || "",
    email_template_id: data.email_template_id || "",
    json_metadata: data.json_metadata || {},
    created_at: data.created_at || "",
    updated_at: data.updated_at || "",
    created_user: data.created_user || "",
    segment: data.segment || "",
    email_template_final: data.email_template_final || "",
    send_by_email: data.send_by_email || "",
  });

  const mapFromForm = (
    data: ICampaignMasterGetApi
  ): Partial<ICampaignMasterGetApi> => {
    return {
      id: data.id || undefined,
      campaign_name: data.campaign_name,
      campaign_type: data.campaign_type,
      campaign_desc: data.campaign_desc,
      campaign_status: data.campaign_status,
      audience_number: data.audience_number,
      email_template_id: data.email_template_id,
      json_metadata: data.json_metadata,
      created_user: data.created_user,
      segment: data.segment,
      email_template_final: data.email_template_final,
      send_by_email: data.send_by_email,
    };
  };

  const mapResponse = (
    response: any
  ): { data: ICampaignMasterGetApi[]; total?: number } => {
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
  } = useTableData<
    ICampaignMasterGetApi,
    ICampaignMasterGetApi,
    { page: number; size: number; id?: string },
    {
      page: number;
      size: number;
      id?: string;
      username?: string;
      campaign_name?: string;
      campaign_type?: string;
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
      const response = await getCampaignMasterApi({
        page,
        size,
        id: id || "",
        sort: "created_at,desc",
      });
      console.log("getCampaignMasterApi response:", response);
      return response;
    },
    searchData: async ({
      id,
      from,
      to,
      campaign_name,
      campaign_type,
    }: {
      id?: string;
      from?: string;
      to?: string;
      campaign_name?: string;
      campaign_type?: string;
    }) => {
      const response = await searchCampaignMasterApi({
        id,
        from,
        to,
        campaign_name,
        campaign_type,
      });
      console.log("searchCampaignMasterApi response:", response);
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
      const response = await sortCampaignMasterApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortCampaignMasterApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getCampaignMasterApi({
        page: 1,
        size: 1,
        id: id,
      });
      if (!response.data || !response.data[0]) {
        throw new Error("Campaign Master not found");
      }
      return response.data[0];
    },
    addData: postCampaignMasterApi,
    updateData: patchCampaignMasterApi,
    deleteData: deleteCampaignMasterApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null ? String(filters.id) : "";
  const searchUsernameTerm =
    filters.campaign_name !== undefined && filters.campaign_name !== null
      ? String(filters.campaign_name)
      : "";
  const searchPhoneTerm =
    filters.phone_number !== undefined && filters.phone_number !== null
      ? String(filters.phone_number)
      : "";
  const searchVerifyStatusTerm =
    filters.verify_status !== undefined && filters.verify_status !== null
      ? String(filters.verify_status)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchUsernameTerm = (value: string) =>
    setFilter("campaign_name", value || null);
  const setSearchPhoneTerm = (value: string) =>
    setFilter("phone_number", value || null);
  const setSearchVerifyStatusTerm = (value: string) =>
    setFilter("verify_status", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchUsername = () => handleClearFilter("campaign_name");
  const handleClearSearchPhone = () => handleClearFilter("phone_number");
  const handleClearSearchVerifyStatus = () =>
    handleClearFilter("verify_status");

  const columns = [
    { key: "id" as keyof ICampaignMasterGetApi, header: "ID" },
    {
      key: "campaign_name" as keyof ICampaignMasterGetApi,
      header: "Campaign Name",
    },
    {
      key: "campaign_type" as keyof ICampaignMasterGetApi,
      header: "Campaign Type",
    },
    {
      key: "audience_number" as keyof ICampaignMasterGetApi,
      header: "Audience Number",
    },
    {
      key: "created_user" as keyof ICampaignMasterGetApi,
      header: "Created User",
    },
    {
      key: "updated_at" as keyof ICampaignMasterGetApi,
      header: "Date Updated",
      render: (item: ICampaignMasterGetApi) =>
        new Date(item.updated_at || "").toLocaleString(),
    },
    {
      key: "created_at" as keyof ICampaignMasterGetApi,
      header: "Date Created",
      render: (item: ICampaignMasterGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    { key: "actions" as keyof ICampaignMasterGetApi, header: "Actions" },
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
          searchNameTerm={searchUsernameTerm}
          setSearchNameTerm={setSearchUsernameTerm}
          searchUsernameTerm={searchVerifyStatusTerm}
          setSearchUsernameTerm={setSearchVerifyStatusTerm}
          searchPhoneTerm={searchPhoneTerm}
          setSearchPhoneTerm={setSearchPhoneTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchUsername}
          handleClearSearchPhone={handleClearSearchPhone}
          handleClearSearchUsername={handleClearSearchVerifyStatus}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by Campaign Name"
          idSearchType="text"
          hidePhoneEmail={true}
        />

        <div className="max-w-full overflow-x-auto">
          {loading && !paginatedData.length ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Loading...
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
      <CampaignMasterFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        onReset={handleReset}
        config={currentItem || initialFormData}
      />
      <DeleteCampaignMasterConfirmationModal
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
