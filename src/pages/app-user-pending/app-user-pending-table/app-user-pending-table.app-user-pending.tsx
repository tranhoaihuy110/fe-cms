import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { LoadingMore, StatusButton } from "../../../components";

import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getAppUserPendingApi,
  searchAppUserPendingApi,
  sortAppUserPendingApi,
  postAppUserPendingApi,
  patchAppUserPendingApi,
  deleteAppUserPendingApi,
} from "../../../services";
import { IAppUserPendingTableProps } from "./index";
import { IAppUserPendingGetApi } from "../../../models";
import {
  DeleteAppUserPendingConfirmationModal,
  AppUserPendingFormModal,
} from "../index";
import { dayjs } from "../../../utils/dayjs";

export const AppUserPendingTable: React.FC<IAppUserPendingTableProps> = (
  props
) => {
  const { children = "" } = props;

  const initialFormData: IAppUserPendingGetApi = {
    user_id: "",
    username: "",
    user_firstname: "",
    user_lastname: "",
    user_password: "",
    phone_number: "",
    user_gender: "",
    user_email: "",
    date_of_birth: "",
    company_name: "",
    created_at: "",
    verify_code: "",
    verify_code_expired: "",
    verify_status: "",
    json_data: {},
    otp: "",
    otp_expired_at: "",
    job: "",
    expertise: "",
    user_type: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "user_id", label: "User ID", type: "text" },
    { key: "username", label: "Username", type: "text" },
    { key: "user_firstname", label: "User Firstname", type: "text" },
  ];

  const fieldMapping = {
    id: "user_id" as keyof IAppUserPendingGetApi,
    username: "username" as keyof IAppUserPendingGetApi,
    user_firstname: "user_firstname" as keyof IAppUserPendingGetApi,
    createdAt: "created_at" as keyof IAppUserPendingGetApi,
  };

  const mapToForm = (data: IAppUserPendingGetApi): IAppUserPendingGetApi => ({
    user_id: data.user_id || "",
    username: data.username || "",
    user_firstname: data.user_firstname || "",
    user_lastname: data.user_lastname || "",
    user_password: data.user_password || "",
    phone_number: data.phone_number || "",
    user_gender: data.user_gender || "",
    user_email: data.user_email || "",
    date_of_birth: data.date_of_birth || "",
    company_name: data.company_name || "",
    created_at: data.created_at || "",
    verify_code: data.verify_code || "",
    verify_code_expired: data.verify_code_expired || "",
    verify_status: data.verify_status || "",
    json_data: data.json_data || {},
    otp: data.otp || "",
    otp_expired_at: data.otp_expired_at || "",
    job: data.job || "",
    expertise: data.expertise || "",
    user_type: data.user_type || "",
  });

  const mapFromForm = (
    data: IAppUserPendingGetApi
  ): Partial<IAppUserPendingGetApi> => {
    return {
      user_id: data.user_id,
      username: data.username,
      user_password: data.user_password,
      user_firstname: data.user_firstname,
      user_lastname: data.user_lastname,
      phone_number: data.phone_number,
      user_gender: data.user_gender,
      user_email: data.user_email,
      date_of_birth: data.date_of_birth,
      company_name: data.company_name,
      verify_code: data.verify_code,
      verify_code_expired: data.verify_code_expired,
      verify_status: data.verify_status,
      otp: data.otp,
      otp_expired_at: data.otp_expired_at,
      json_data: data.json_data || {},
      job: data.job,
      expertise: data.expertise,
      user_type: data.user_type,
    };
  };

  const mapResponse = (
    response: any
  ): { data: IAppUserPendingGetApi[]; total?: number } => {
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
    IAppUserPendingGetApi,
    IAppUserPendingGetApi,
    { page: number; size: number; user_id?: string },
    {
      page: number;
      size: number;
      user_id?: string;
      username?: string;
      phone_number?: string;
      verify_status?: string;
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
      user_id,
    }: {
      page: number;
      size: number;
      user_id?: string;
    }) => {
      const response = await getAppUserPendingApi({
        page,
        size,
        user_id: user_id || "",
        sort: "created_at,desc",
      });
      console.log("getAppUserPendingApi response:", response);
      return response;
    },
    searchData: async ({
      size,
      user_id,
      username,
      phone_number,
      verify_status,
      from,
      to,
    }: {
      size: number;
      user_id?: string;
      username?: string;
      phone_number?: string;
      verify_status?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchAppUserPendingApi({
        size,
        user_id,
        username,
        phone_number,
        verify_status,
        from,
        to,
      });
      console.log("searchAppUserPendingApi response:", response);
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
      const response = await sortAppUserPendingApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortAppUserPendingApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getAppUserPendingApi({
        page: 1,
        size: 1,
        user_id: id,
      });
      console.log("getAppUserPendingApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Sf Mart Leads not found");
      }
      return response.data[0];
    },
    addData: postAppUserPendingApi,
    updateData: patchAppUserPendingApi,
    deleteData: deleteAppUserPendingApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.user_id !== undefined && filters.user_id !== null
      ? String(filters.user_id)
      : "";
  const searchUsernameTerm =
    filters.username !== undefined && filters.username !== null
      ? String(filters.username)
      : "";
  const searchPhoneTerm =
    filters.phone_number !== undefined && filters.phone_number !== null
      ? String(filters.phone_number)
      : "";
  const searchVerifyStatusTerm =
    filters.verify_status !== undefined && filters.verify_status !== null
      ? String(filters.verify_status)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("user_id", value || null);
  const setSearchUsernameTerm = (value: string) =>
    setFilter("username", value || null);
  const setSearchPhoneTerm = (value: string) =>
    setFilter("phone_number", value || null);
  const setSearchVerifyStatusTerm = (value: string) =>
    setFilter("verify_status", value || null);

  const handleClearSearchId = () => handleClearFilter("user_id");
  const handleClearSearchUsername = () => handleClearFilter("username");
  const handleClearSearchPhone = () => handleClearFilter("phone_number");
  const handleClearSearchVerifyStatus = () =>
    handleClearFilter("verify_status");

  const columns = [
    { key: "user_id" as keyof IAppUserPendingGetApi, header: "USER ID" },
    { key: "username" as keyof IAppUserPendingGetApi, header: "Username" },
    {
      key: "user_firstname" as keyof IAppUserPendingGetApi,
      header: "User Firstname",
    },
    {
      key: "user_lastname" as keyof IAppUserPendingGetApi,
      header: "User Lastname",
    },
    { key: "user_password" as keyof IAppUserPendingGetApi, header: "Password" },
    {
      key: "phone_number" as keyof IAppUserPendingGetApi,
      header: "Phone Number",
    },
    { key: "user_gender" as keyof IAppUserPendingGetApi, header: "Gender" },
    { key: "user_email" as keyof IAppUserPendingGetApi, header: "Email" },
    {
      key: "date_of_birth" as keyof IAppUserPendingGetApi,
      header: "Date of Birth",
    },
    {
      key: "company_name" as keyof IAppUserPendingGetApi,
      header: "Company Name",
    },
    {
      key: "created_at" as keyof IAppUserPendingGetApi,
      header: "Date Created",
      render: (item: IAppUserPendingGetApi) =>
        dayjs(item.created_at).format("HH:mm:ss DD-MM-YYYY"),
    },
    {
      key: "verify_code" as keyof IAppUserPendingGetApi,
      header: "Verify Code",
    },
    {
      key: "verify_code_expired" as keyof IAppUserPendingGetApi,
      header: "Verify Code Expired",
    },
    {
      key: "verify_status" as keyof IAppUserPendingGetApi,
      header: "Verify Status",
      render: (item: IAppUserPendingGetApi) => {
        const statuses = Array.isArray(item.verify_status)
          ? item.verify_status.map((s) => s.toString())
          : typeof item.verify_status === "number"
          ? [item.verify_status]
          : item.verify_status
          ? [item.verify_status.toString()]
          : [];
        const customStyles: Record<string, string> = {
          "1": "bg-green-600 text-white",
          "0": "bg-yellow-600 text-black",
        };
        return (
          <StatusButton
            statuses={statuses}
            customStyles={customStyles}
            className="mr-1"
          />
        );
      },
    },
    { key: "json_data" as keyof IAppUserPendingGetApi, header: "JSON Data" },
    { key: "otp" as keyof IAppUserPendingGetApi, header: "OTP" },
    {
      key: "otp_expired_at" as keyof IAppUserPendingGetApi,
      header: "OTP Expired At",
    },
    { key: "job" as keyof IAppUserPendingGetApi, header: "Job" },
    { key: "expertise" as keyof IAppUserPendingGetApi, header: "Expertise" },
    { key: "user_type" as keyof IAppUserPendingGetApi, header: "User Type" },
    {
      key: "actions" as keyof IAppUserPendingGetApi,
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
          firstSearchLabel="Search by User ID"
          secondSearchLabel="Search by Username"
          thirdSearchLabel="Search by Verify Status"
          fourthSearchLabel="Search by  Phone Number "
          idSearchType="text"
          hidePhoneEmail={false}
        />

        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-gray-900/50 z-10">
              <LoadingMore />
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500 dark:text-red-400">
              {error}
            </div>
          ) : !paginatedData || paginatedData.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No app user pending found for the selected filters.
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
      <AppUserPendingFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteAppUserPendingConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};
