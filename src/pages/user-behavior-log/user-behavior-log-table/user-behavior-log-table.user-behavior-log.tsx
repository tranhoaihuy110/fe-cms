import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { LoadingMore } from "../../../components";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getUserBehaviorLogApi,
  searchUserBehaviorLogApi,
  sortUserBehaviorLogApi,
  postUserBehaviorLogApi,
  patchUserBehaviorLogApi,
  deleteUserBehaviorLogApi,
} from "../../../services";
import { IUserBehaviorLogProps } from "./index";
import { IUserBehaviorLogGetApi } from "../../../models";
import {
  DeleteUserBehaviorLogConfirmationModal,
  UserBehaviorLogFormModal,
} from "../index";

export const UserBehaviorLogTable: React.FC<IUserBehaviorLogProps> = (
  props
) => {
  const { children = "" } = props;

  const initialFormData: IUserBehaviorLogGetApi = {
    id: "",
    user_name: "",
    action: "",
    description: "",
    json_data: {},
    created_at: "",
    created_by: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "user_name", label: "User Name", type: "text" },
    { key: "action", label: "Action", type: "text" },
    { key: "description", label: "Description", type: "text" },
    { key: "created_by", label: "Created By", type: "text" },
    { key: "json_data", label: "JSON Data", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof IUserBehaviorLogGetApi,
    user_name: "user_name" as keyof IUserBehaviorLogGetApi,
    action: "action" as keyof IUserBehaviorLogGetApi,
    description: "description" as keyof IUserBehaviorLogGetApi,
    json_data: "json_data" as keyof IUserBehaviorLogGetApi,
    created_at: "created_at" as keyof IUserBehaviorLogGetApi,
    created_by: "created_by" as keyof IUserBehaviorLogGetApi,
  };

  const mapToForm = (data: IUserBehaviorLogGetApi): IUserBehaviorLogGetApi => ({
    id: data.id || "",
    user_name: data.user_name || "",
    action: data.action || "",
    description: data.description || "",
    json_data: data.json_data || {},
    created_at: data.created_at || "",
    created_by: data.created_by || "",
  });

  const mapFromForm = (
    data: IUserBehaviorLogGetApi
  ): Partial<IUserBehaviorLogGetApi> => {
    return {
      id: data.id || undefined,
      user_name: data.user_name,
      action: data.action,
      description: data.description,
      json_data: data.json_data,
      created_at: data.created_at,
      created_by: data.created_by,
    };
  };

  const mapResponse = (
    response: any
  ): { data: IUserBehaviorLogGetApi[]; total?: number } => {
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
    IUserBehaviorLogGetApi,
    IUserBehaviorLogGetApi,
    { page: number; size: number; id?: string },
    {
      page: number;
      size: number;
      id?: string;
      user_name?: string;
      action?: string;
      description?: string;
      created_by?: string;
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
      const response = await getUserBehaviorLogApi({
        page,
        size,
        id: id || "",
        sort: "created_at,desc",
      });
      console.log("getUserBehaviorLogApi response:", response);
      return response;
    },
    searchData: async ({
      id,
      from,
      to,
      user_name,
      action,
    }: {
      id?: string;
      from?: string;
      to?: string;
      user_name?: string;
      action?: string;
      description?: string;
      created_by?: string;
    }) => {
      const response = await searchUserBehaviorLogApi({
        id,
        from,
        to,
        user_name,
        action,
      });
      console.log("searchUserBehaviorLogApi response:", response);
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
      const response = await sortUserBehaviorLogApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortUserBehaviorLogApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getUserBehaviorLogApi({
        page: 1,
        size: 1,
        id: id,
      });
      if (!response.data || !response.data[0]) {
        throw new Error("User Behavior Log not found");
      }
      return response.data[0];
    },
    addData: postUserBehaviorLogApi,
    updateData: patchUserBehaviorLogApi,
    deleteData: deleteUserBehaviorLogApi,
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
    filters.user_name !== undefined && filters.user_name !== null
      ? String(filters.user_name)
      : "";
  const searchActionTerm =
    filters.action !== undefined && filters.action !== null
      ? String(filters.action)
      : "";
  const searchCreatedByTerm =
    filters.created_by !== undefined && filters.created_by !== null
      ? String(filters.created_by)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchUserNameTerm = (value: string) =>
    setFilter("user_name", value || null);
  const setSearchActionTerm = (value: string) =>
    setFilter("action", value || null);
  const setSearchCreatedByTerm = (value: string) =>
    setFilter("created_by", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchUserName = () => handleClearFilter("user_name");
  const handleClearSearchAction = () => handleClearFilter("action");
  const handleClearSearchCreatedBy = () => handleClearFilter("created_by");

  const columns = [
    {
      key: "id" as keyof IUserBehaviorLogGetApi,
      header: "ID",
    },
    {
      key: "user_name" as keyof IUserBehaviorLogGetApi,
      header: "User Name",
    },
    {
      key: "action" as keyof IUserBehaviorLogGetApi,
      header: "Action",
    },
    {
      key: "description" as keyof IUserBehaviorLogGetApi,
      header: "Description",
      render: (item: IUserBehaviorLogGetApi) => {
        const maxLength = 30;

        const dataString =
          typeof item.description === "string"
            ? item.description
            : JSON.stringify(item.description);

        const displayInput =
          dataString.length > maxLength
            ? dataString.substring(0, maxLength) + "..."
            : dataString;

        return <div>{displayInput}</div>;
      },
    },
    {
      key: "created_by" as keyof IUserBehaviorLogGetApi,
      header: "Created By",
    },
    {
      key: "created_at" as keyof IUserBehaviorLogGetApi,
      header: "Date Created",
      render: (item: IUserBehaviorLogGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "actions" as keyof IUserBehaviorLogGetApi,
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
          searchNameTerm={searchUserNameTerm}
          setSearchNameTerm={setSearchUserNameTerm}
          searchUsernameTerm={searchActionTerm}
          setSearchUsernameTerm={setSearchActionTerm}
          searchPhoneTerm={searchCreatedByTerm}
          setSearchPhoneTerm={setSearchCreatedByTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchUserName}
          handleClearSearchPhone={handleClearSearchCreatedBy}
          handleClearSearchUsername={handleClearSearchAction}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by User Name"
          thirdSearchLabel="Search by Action"
          fourthSearchLabel="Search by Created By"
          idSearchType="text"
          hidePhoneEmail={true}
        />

        <div className="max-w-full overflow-x-auto">
           {error ? (
            <div className="p-4 text-center text-red-500 dark:text-red-400">
              {error}
            </div>
          ) : !paginatedData || paginatedData.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No user behavior logs found for the selected filters.
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
          )}{loading && (
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
      <UserBehaviorLogFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        onReset={handleReset}
        config={currentItem || initialFormData}
      />
      <DeleteUserBehaviorLogConfirmationModal
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
