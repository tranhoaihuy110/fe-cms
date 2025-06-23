/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { LoadingMore } from "../../../components";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getMetaDataApi,
  searchMetaDataApi,
  sortMetaDataApi,
  postMetaDataApi,
  patchMetaDataApi,
  deleteMetaDataApi,
} from "../../../services";
import { IPartnerTableProps } from "./table-partner.type";
import { IMetaDataApi } from "../../../models";
import { PartnerConfirmationModal, PartnerFormModal } from "../partner-modal";
import { dayjs } from "../../../utils/dayjs";

export const PartnerTable: React.FC<IPartnerTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IMetaDataApi = {
    id: "",
    name: "",
    category_id: "",
    category_name: "",
    service_id: "",
    service_name: "",
    create_at: "",
    data_type: "partner",
    data_code: "",
    data_title: "",
    data_parent_id: "",
    data_image: "",
    data_desc: "",
    data_parent_id_v2: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "Partner ID", type: "text" },
    { key: "name", label: "Partner Name", type: "text" },
    { key: "service_name", label: "Service Name", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof IMetaDataApi,
    name: "name" as keyof IMetaDataApi,
    createdAt: "create_at" as keyof IMetaDataApi,
  };

  const mapToForm = (data: IMetaDataApi): IMetaDataApi => ({
    id: data.id || "",
    name: data.name || "",
    category_id: data.category_id || "",
    category_name: data.category_name || "",
    service_id: data.service_id || "",
    service_name: data.service_name || "",
    create_at: data.create_at || "",
    data_type: data.data_type || "partner",
    data_code: data.data_code || "",
    data_title: data.data_title || "",
    data_parent_id: data.data_parent_id || "",
    data_image: data.data_image || "",
    data_desc: data.data_desc || "",
    data_parent_id_v2: data.data_parent_id_v2 || "",
  });

  const mapFromForm = (data: IMetaDataApi): Partial<IMetaDataApi> => ({
    name: data.name,
    category_id: data.category_id,
    category_name: data.category_name,
    service_id: data.service_id,
    service_name: data.service_name,
    data_type: data.data_type || "partner",
    data_code: data.data_code,
    data_title: data.data_title,
    data_parent_id: data.data_parent_id,
    data_image: data.data_image,
    data_desc: data.data_desc,
  });

  const mapResponse = (
    response: any
  ): { data: IMetaDataApi[]; total?: number } => {
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
    closeModal,
    openDeleteModal,
    openDetailModal,
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
    IMetaDataApi,
    IMetaDataApi,
    { page: number; size: number; data_type: string; id?: string },
    {
      page: number;
      size: number;
      data_type: string;
      id?: string;
      name?: string;
      category_name?: string;
      service_name?: string;
      from?: string;
      to?: string;
    },
    {
      page: number;
      size: number;
      data_type: string;
      sort: { field: string; direction: "asc" | "desc" };
    },
    string
  >({
    fetchData: async ({
      page,
      size,
      data_type = "partner",
      id,
    }: {
      page: number;
      size: number;
      data_type: string;
      id?: string;
    }) => {
      const response = await getMetaDataApi({
        page,
        size,
        data_type,
        id: id || "",
        sort: "create_at,desc",
      });
      return response;
    },
    searchData: async ({
      size,
      data_type = "partner",
      id,
      name,
      category_name,
      service_name,
      from,
      to,
    }: {
      page: number;
      size: number;
      data_type?: string;
      id?: string;
      name?: string;
      category_name?: string;
      service_name?: string;
      from?: string;
      to?: string;
    }) => {
      return searchMetaDataApi({
        from,
        to,
        size,
        data_type,
        id,
        name,
        category_name: category_name || "",
        service_name: service_name || "",
      });
    },
    sortData: async ({
      page,
      size,
      data_type = "partner",
      sort,
    }: {
      page: number;
      size: number;
      data_type: string;
      sort: { field: string; direction: "asc" | "desc" };
    }) => {
      return sortMetaDataApi({
        data_type,
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
    },
    fetchById: async (id: string) => {
      const response = await getMetaDataApi({
        page: 1,
        size: 10,
        data_type: "partner",
        id,
      });
      if (!response.data[0]) {
        throw new Error("Partner not found");
      }
      return response.data[0];
    },
    addData: postMetaDataApi,
    updateData: patchMetaDataApi,
    deleteData: deleteMetaDataApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null ? String(filters.id) : "";
  const searchNameTerm =
    filters.name !== undefined && filters.name !== null
      ? String(filters.name)
      : "";
  const searchCategoryNameTerm =
    filters.category_name !== undefined && filters.category_name !== null
      ? String(filters.category_name)
      : "";
  const searchServiceNameTerm =
    filters.service_name !== undefined && filters.service_name !== null
      ? String(filters.service_name)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchNameTerm = (value: string) => setFilter("name", value || null);
  const setSearchCategoryNameTerm = (value: string) =>
    setFilter("category_name", value || null);
  const setSearchServiceNameTerm = (value: string) =>
    setFilter("service_name", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchName = () => handleClearFilter("name");
  const handleClearSearchCategoryName = () =>
    handleClearFilter("category_name");
  const handleClearSearchServiceName = () => handleClearFilter("service_name");

  const columns = [
    { key: "id" as keyof IMetaDataApi, header: "Partner ID", isFixed: true },
    { key: "name" as keyof IMetaDataApi, header: "Partner Name" },
    { key: "service_name" as keyof IMetaDataApi, header: "Service Name" },
    { key: "category_name" as keyof IMetaDataApi, header: "Category Name" },
    {
      key: "create_at" as keyof IMetaDataApi,
      header: "Date Create",
      render: (item: IMetaDataApi) =>
        dayjs(item.create_at).format("HH:mm:ss DD-MM-YYYY"),
    },
    { key: "actions" as keyof IMetaDataApi, header: "Actions" },
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
          searchNameTerm={searchNameTerm}
          setSearchNameTerm={setSearchNameTerm}
          searchUsernameTerm={searchCategoryNameTerm}
          setSearchUsernameTerm={setSearchCategoryNameTerm}
          searchPhoneTerm={searchServiceNameTerm}
          setSearchPhoneTerm={setSearchServiceNameTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchName}
          handleClearSearchUsername={handleClearSearchCategoryName}
          handleClearSearchPhone={handleClearSearchServiceName}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          hideAddButton={false}
          hidePhoneEmail={false}
          hideNameSearch={false}
          firstSearchLabel="Search by Partner ID"
          secondSearchLabel="Search by Partner Name"
          thirdSearchLabel="Search by Category Name"
          fourthSearchLabel="Search by Service Name"
          idSearchType="text"
        />

        <div className="max-w-full overflow-x-auto">
          {error ? (
            <div className="p-4 text-center text-red-500 dark:text-red-400">
              {error}
            </div>
          ) : paginatedData.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No partner found for the selected filters.
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
          )}{" "}
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
      <PartnerFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        partner={currentItem || initialFormData}
      />
      <PartnerConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        partner={itemToDelete || null}
      />
      {children}
    </>
  );
};
