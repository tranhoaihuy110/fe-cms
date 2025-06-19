import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { LoadingMore } from "../../../components";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getCampaignAudienceMasterApi,
  searchCampaignAudienceMasterApi,
  sortCampaignAudienceMasterApi,
  postCampaignAudienceMasterApi,
  patchCampaignAudienceMasterApi,
  deleteCampaignAudienceMasterApi,
} from "../../../services";
import { ICampaignAudienceMasterProps } from "./index";
import { ICampaignAudienceMasterGetApi } from "../../../models";
import {
  DeleteCampaignAudienceMasterConfirmationModal,
  CampaignAudienceMasterFormModal,
} from "../index";

export const CampaignAudienceMasterTable: React.FC<
  ICampaignAudienceMasterProps
> = (props) => {
  const { children = "" } = props;

  const initialFormData: ICampaignAudienceMasterGetApi = {
    id: "",
    target_desc: "",
    target_name: "",
    condition: "",
    user_create: "",
    status: "",
    mode: "",
    json_filter: "",
    create_date: "",
    fb_custom_audience_id: "",
    list_project_short_name: "",
    last_crond_date: "",
    platform: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "target_name", label: "Target Name", type: "text" },
    { key: "target_desc", label: "Target Description", type: "text" },
    { key: "condition", label: "Condition", type: "text" },
    { key: "user_create", label: "User Create", type: "text" },
    { key: "status", label: "Status", type: "text" },
    { key: "mode", label: "Mode", type: "text" },
    {
      key: "fb_custom_audience_id",
      label: "FB Custom Audience ID",
      type: "text",
    },
    {
      key: "list_project_short_name",
      label: "Project Short Name",
      type: "text",
    },
    { key: "platform", label: "Platform", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof ICampaignAudienceMasterGetApi,
    target_desc: "target_desc" as keyof ICampaignAudienceMasterGetApi,
    target_name: "target_name" as keyof ICampaignAudienceMasterGetApi,
    condition: "condition" as keyof ICampaignAudienceMasterGetApi,
    user_create: "user_create" as keyof ICampaignAudienceMasterGetApi,
    status: "status" as keyof ICampaignAudienceMasterGetApi,
    mode: "mode" as keyof ICampaignAudienceMasterGetApi,
    json_filter: "json_filter" as keyof ICampaignAudienceMasterGetApi,
    create_date: "create_date" as keyof ICampaignAudienceMasterGetApi,
    fb_custom_audience_id:
      "fb_custom_audience_id" as keyof ICampaignAudienceMasterGetApi,
    list_project_short_name:
      "list_project_short_name" as keyof ICampaignAudienceMasterGetApi,
    last_crond_date: "last_crond_date" as keyof ICampaignAudienceMasterGetApi,
    platform: "platform" as keyof ICampaignAudienceMasterGetApi,
  };

  const mapToForm = (
    data: ICampaignAudienceMasterGetApi
  ): ICampaignAudienceMasterGetApi => ({
    id: data.id || "",
    target_name: data.target_name || "",
    target_desc: data.target_desc || "",
    condition: data.condition || "",
    user_create: data.user_create || "",
    status: data.status || "",
    mode: data.mode || "",
    json_filter: data.json_filter || "",
    create_date: data.create_date || "",
    fb_custom_audience_id: data.fb_custom_audience_id || "",
    list_project_short_name: data.list_project_short_name || "",
    last_crond_date: data.last_crond_date || "",
    platform: data.platform || "",
  });

  const mapFromForm = (
    data: ICampaignAudienceMasterGetApi
  ): Partial<ICampaignAudienceMasterGetApi> => {
    return {
      id: data.id || undefined,
      target_desc: data.target_desc,
      target_name: data.target_name,
      condition: data.condition,
      user_create: data.user_create,
      status: data.status,
      mode: data.mode,
      json_filter: data.json_filter,
      create_date: data.create_date,
      fb_custom_audience_id: data.fb_custom_audience_id,
      list_project_short_name: data.list_project_short_name,
      last_crond_date: data.last_crond_date,
      platform: data.platform,
    };
  };

  const mapResponse = (
    response: any
  ): { data: ICampaignAudienceMasterGetApi[]; total?: number } => {
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
    ICampaignAudienceMasterGetApi,
    ICampaignAudienceMasterGetApi,
    { page: number; size: number; id?: string },
    {
      page: number;
      size: number;
      id?: string;
      target_desc?: string;
      condition?: string;
      user_create?: string;
      status?: string;
      mode?: string;
      fb_custom_audience_id?: string;
      list_project_short_name?: string;
      platform?: string;
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
      const response = await getCampaignAudienceMasterApi({
        page,
        size,
        id: id || "",
        sort: "create_date,desc",
      });
      console.log("getCampaignAudienceMasterApi response:", response);
      return response;
    },
    searchData: async ({
      id,
      target_desc,
      target_name,
      condition,
      user_create,
      status,
      mode,
      from,
      to,
    }: {
      id?: string;
      target_desc?: string;
      target_name?: string;
      condition?: string;
      user_create?: string;
      status?: string;
      mode?: string;
      fb_custom_audience_id?: string;
      list_project_short_name?: string;
      platform?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchCampaignAudienceMasterApi({
        id,
        target_desc,
        target_name,
        condition,
        user_create,
        status,
        mode,
        from,
        to,
      });
      console.log("searchCampaignAudienceMasterApi response:", response);
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
      const response = await sortCampaignAudienceMasterApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortCampaignAudienceMasterApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getCampaignAudienceMasterApi({
        page: 1,
        size: 1,
        id: id,
      });
      if (!response.data || !response.data[0]) {
        throw new Error("Campaign Master not found");
      }
      return response.data[0];
    },
    addData: postCampaignAudienceMasterApi,
    updateData: patchCampaignAudienceMasterApi,
    deleteData: deleteCampaignAudienceMasterApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null ? String(filters.id) : "";
  const searchTargetDescTerm =
    filters.target_name !== undefined && filters.target_name !== null
      ? String(filters.target_name)
      : "";
  const searchConditionTerm =
    filters.condition !== undefined && filters.condition !== null
      ? String(filters.condition)
      : "";
  const searchUserCreateTerm =
    filters.user_create !== undefined && filters.user_create !== null
      ? String(filters.user_create)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchTargetDescTerm = (value: string) =>
    setFilter("target_name", value || null);
  const setSearchConditionTerm = (value: string) =>
    setFilter("condition", value || null);
  const setSearchUserCreateTerm = (value: string) =>
    setFilter("user_create", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchTargetDesc = () => handleClearFilter("target_name");
  const handleClearSearchCondition = () => handleClearFilter("condition");
  const handleClearSearchUserCreate = () => handleClearFilter("user_create");

  const columns = [
    {
      key: "id" as keyof ICampaignAudienceMasterGetApi,
      header: "ID",
    },
    {
      key: "target_name" as keyof ICampaignAudienceMasterGetApi,
      header: "Target Name",
    },
    {
      key: "target_desc" as keyof ICampaignAudienceMasterGetApi,
      header: "Target Description",
    },
    {
      key: "condition" as keyof ICampaignAudienceMasterGetApi,
      header: "Condition",
    },
    {
      key: "user_create" as keyof ICampaignAudienceMasterGetApi,
      header: "User Create",
    },
    {
      key: "status" as keyof ICampaignAudienceMasterGetApi,
      header: "Status",
    },
    {
      key: "mode" as keyof ICampaignAudienceMasterGetApi,
      header: "Mode",
    },
    {
      key: "fb_custom_audience_id" as keyof ICampaignAudienceMasterGetApi,
      header: "FB Custom Audience ID",
    },
    {
      key: "list_project_short_name" as keyof ICampaignAudienceMasterGetApi,
      header: "Project Short Name",
    },
    {
      key: "platform" as keyof ICampaignAudienceMasterGetApi,
      header: "Platform",
    },
    {
      key: "create_date" as keyof ICampaignAudienceMasterGetApi,
      header: "Date Created",
      render: (item: ICampaignAudienceMasterGetApi) =>
        new Date(item.create_date || "").toLocaleString(),
    },
    {
      key: "last_crond_date" as keyof ICampaignAudienceMasterGetApi,
      header: "Last Crond Date",
      render: (item: ICampaignAudienceMasterGetApi) =>
        new Date(item.last_crond_date || "").toLocaleString(),
    },
    {
      key: "actions" as keyof ICampaignAudienceMasterGetApi,
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
          searchNameTerm={searchTargetDescTerm}
          setSearchNameTerm={setSearchTargetDescTerm}
          searchUsernameTerm={searchUserCreateTerm}
          setSearchUsernameTerm={setSearchUserCreateTerm}
          searchPhoneTerm={searchConditionTerm}
          setSearchPhoneTerm={setSearchConditionTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchTargetDesc}
          handleClearSearchPhone={handleClearSearchCondition}
          handleClearSearchUsername={handleClearSearchUserCreate}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by Target Name"
          thirdSearchLabel="Search by User Create"
          fourthSearchLabel="Search by Condition"
          idSearchType="text"
          hidePhoneEmail={false}
        />

        <div className="max-w-full overflow-x-auto">
          {error ? (
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
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-gray-900/50 z-10">
              <LoadingMore />
            </div>
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
      <CampaignAudienceMasterFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        onReset={handleReset}
        config={currentItem || initialFormData}
      />
      <DeleteCampaignAudienceMasterConfirmationModal
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
