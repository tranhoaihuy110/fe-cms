import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getCampaignEmailTemplateApi,
  searchCampaignEmailTemplateApi,
  sortCampaignEmailTemplateApi,
  postCampaignEmailTemplateApi,
  patchCampaignEmailTemplateApi,
  deleteCampaignEmailTemplateApi,
} from "../../../services";
import { ICampaignEmailTemplateTableProps } from "./index";
import { ICampaignEmailTemplateGetApi } from "../../../models";
import {
  CampaignEmailTemplateFormModal,
  DeleteCampaignEmailTemplateConfirmationModal,
} from "../index";

export const CampaignEmailTemplateTable: React.FC<
  ICampaignEmailTemplateTableProps
> = (props) => {
  const { children = "" } = props;

  const initialFormData: ICampaignEmailTemplateGetApi = {
    id: "",
    template_email_code: "",
    email_subject: "",
    email_body: "",
    email_type: "",
    template_email_keys: "",
    created_at: "",
    updated_at: "",
    user_create: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "template_email_code", label: "Template Email Code", type: "text" },
    { key: "email_subject", label: "Email Subject", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof ICampaignEmailTemplateGetApi,
    template_email_code:
      "template_email_code" as keyof ICampaignEmailTemplateGetApi,
    email_subject: "email_subject" as keyof ICampaignEmailTemplateGetApi,
    email_body: "email_body" as keyof ICampaignEmailTemplateGetApi,
    email_type: "email_type" as keyof ICampaignEmailTemplateGetApi,
    template_email_keys:
      "template_email_keys" as keyof ICampaignEmailTemplateGetApi,
    updated_at: "updated_at" as keyof ICampaignEmailTemplateGetApi,
    createdAt: "created_at" as keyof ICampaignEmailTemplateGetApi,
    user_create: "user_create" as keyof ICampaignEmailTemplateGetApi,
  };

  const mapToForm = (
    data: ICampaignEmailTemplateGetApi
  ): ICampaignEmailTemplateGetApi => ({
    id: data.id || "",
    template_email_code: data.template_email_code || "",
    email_subject: data.email_subject || "",
    email_body: data.email_body || "",
    email_type: data.email_type || "",
    template_email_keys: data.template_email_keys || "",
    created_at: data.created_at || "",
    updated_at: data.updated_at || "",
    user_create: data.user_create || "",
  });

  const mapFromForm = (
    data: ICampaignEmailTemplateGetApi
  ): Partial<ICampaignEmailTemplateGetApi> => ({
    id: data.id,
    template_email_code: data.template_email_code,
    email_subject: data.email_subject,
    email_body: data.email_body,
    email_type: data.email_type,
    template_email_keys: data.template_email_keys,
    created_at: data.created_at,
    updated_at: data.updated_at,
    user_create: data.user_create,
  });

  const mapResponse = (
    response: any
  ): { data: ICampaignEmailTemplateGetApi[]; total?: number } => {
    if (!response || !response.data) {
      return { data: [], total: 0 };
    }
    return {
      data: response.data,
      total: response.pagination?.total || 0,
    };
  };

  const wrappedDeleteCampaignEmailTemplateApi = async (
    id: string
  ): Promise<any> => {
    return await deleteCampaignEmailTemplateApi(id);
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
    openDeleteModal,
    closeModal,
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
    ICampaignEmailTemplateGetApi,
    ICampaignEmailTemplateGetApi,
    { page: number; size: number; id: string },
    { page: number; size: number; id: string; from?: string; to?: string },
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
      id: string;
    }) => {
      const response = await getCampaignEmailTemplateApi({
        page,
        size,
        id: id,
        sort: "created_at,desc",
      });
      console.log("getCampaignEmailTemplateApi response:", response);
      return response;
    },
    searchData: async ({
      size,
      id,
      from,
      to,
      template_email_code,
    }: {
      page: number;
      size: number;
      id?: string;
      from?: string;
      to?: string;
      template_email_code?: string;
    }) => {
      const response = await searchCampaignEmailTemplateApi({
        size,
        id,
        from,
        to,
        template_email_code,
      });
      console.log("searchCampaignEmailTemplateApi response:", response);
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
      const response = await sortCampaignEmailTemplateApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortCampaignEmailTemplateApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getCampaignEmailTemplateApi({
        page: 1,
        size: 1,
        id: id,
      });
      console.log(
        "getCampaignEmailTemplateApi (fetchById) response:",
        response
      );
      if (!response.data || !response.data[0]) {
        throw new Error("Common Branch Postcode not found");
      }
      return response.data[0];
    },
    addData: postCampaignEmailTemplateApi,
    updateData: patchCampaignEmailTemplateApi,
    deleteData: wrappedDeleteCampaignEmailTemplateApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null ? String(filters.id) : "";
  const searchUserNameTerm =
    filters.template_email_code !== undefined &&
    filters.template_email_code !== null
      ? String(filters.template_email_code)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchUserNameTerm = (value: string) =>
    setFilter("template_email_code", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchUsername = () =>
    handleClearFilter("template_email_code");

  const columns = [
    { key: "id" as keyof ICampaignEmailTemplateGetApi, header: "ID" },
    {
      key: "template_email_code" as keyof ICampaignEmailTemplateGetApi,
      header: "Template Email Code",
    },
    {
      key: "email_subject" as keyof ICampaignEmailTemplateGetApi,
      header: "Email Subject",
    },
    {
      key: "user_create" as keyof ICampaignEmailTemplateGetApi,
      header: "User Create",
    },
    {
      key: "created_at" as keyof ICampaignEmailTemplateGetApi,
      header: "Date Created",
      render: (item: ICampaignEmailTemplateGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "updated_at" as keyof ICampaignEmailTemplateGetApi,
      header: "Date Updated",
      render: (item: ICampaignEmailTemplateGetApi) =>
        new Date(item.updated_at || "").toLocaleString(),
    },
    { key: "actions" as keyof ICampaignEmailTemplateGetApi, header: "Actions" },
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
          searchNameTerm={searchUserNameTerm}
          setSearchNameTerm={setSearchUserNameTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchUsername}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          hideNameSearch={false}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by Template Email Code"
          idSearchType="text"
          hidePhoneEmail={true}
          hideAddButton={false}
          searchPhoneTerm=""
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
              No app configs found for the selected filters.
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
      <CampaignEmailTemplateFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        onReset={handleReset}
        config={currentItem || initialFormData}
      />
      <DeleteCampaignEmailTemplateConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        onReset={handleReset}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};
