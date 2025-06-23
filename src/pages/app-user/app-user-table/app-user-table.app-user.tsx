import React from "react";
import { StatusButton } from "../../../index";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { LoadingMore } from "../../../components";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getAppUserApi,
  searchAppUserApi,
  sortAppUserApi,
  patchAppUserApi,
  deleteAppUserApi,
} from "../../../services";
import { IAppUserTableProps } from "./index";
import { IAppUserGetApi } from "../../../models";
import { AppUserFormModal, DeleteAppUserConfirmationModal } from "../index";
import { dayjs } from "../../../utils/dayjs";

export const AppUserTable: React.FC<IAppUserTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IAppUserGetApi = {
    user_id: "",
    username: "",
    user_email: "",
    user_firstname: "",
    user_lastname: "",
    user_fullname: "",
    phone_number: "",
    user_gender: null,
    user_avatar: null,
    date_of_birth: null,
    job: null,
    user_status: 0,
    created_at: "",
    updated_at: "",
    group_id: null,
    user_session: "",
    parent_id: null,
    province_id: null,
    district_id: null,
    ward_id: null,
    object_id: null,
    user_type: "",
    department: null,
    department_code: null,
    language_session: null,
    rank: null,
    company_name: null,
    date_start_work: null,
    profession: null,
    job_title: null,
    manager_email: null,
    is_head: "",
    department_v2: null,
    department_level2: null,
    test_mh: null,
    otp: null,
    otp_expired_at: null,
    json_data: null,
    keycloak_id: "",
    salesforce_id: null,
    salesforce_token: null,
    expertise: null,
    fcm_token: null,
    profile_url: null,
    partner_code: null,
    auth_provider: null,
  };

  const filterConfig: FilterConfig[] = [
    { key: "user_id", label: "User ID", type: "number" },
    { key: "username", label: "User Name", type: "text" },
    { key: "user_email", label: "User Email", type: "text" },
    { key: "user_fullname", label: "User FullName", type: "text" },
    { key: "phone_number", label: "Phone Number", type: "text" },
  ];

  const fieldMapping = {
    id: "user_id" as keyof IAppUserGetApi,
    name: "username" as keyof IAppUserGetApi,
    email: "user_email" as keyof IAppUserGetApi,
    fullname: "user_fullname" as keyof IAppUserGetApi,
    phonenumber: "phone_number" as keyof IAppUserGetApi,
    createdAt: "created_at" as keyof IAppUserGetApi,
  };

  const mapToForm = (data: IAppUserGetApi): IAppUserGetApi => ({
    user_id: data.user_id || "",
    username: data.username || "",
    user_email: data.user_email || "",
    user_firstname: data.user_firstname || "",
    user_lastname: data.user_lastname || "",
    user_fullname: data.user_fullname || "",
    phone_number: data.phone_number || "",
    user_gender: data.user_gender || null,
    user_avatar: data.user_avatar || null,
    date_of_birth: data.date_of_birth || null,
    job: data.job || null,
    user_status: data.user_status || 0,
    created_at: data.created_at || "",
    updated_at: data.updated_at || "",
    group_id: data.group_id || null,
    user_session: data.user_session || "",
    parent_id: data.parent_id || null,
    province_id: data.province_id || null,
    district_id: data.district_id || null,
    ward_id: data.ward_id || null,
    object_id: data.object_id || null,
    user_type: data.user_type || "",
    department: data.department || null,
    department_code: data.department_code || null,
    language_session: data.language_session || null,
    rank: data.rank || null,
    company_name: data.company_name || null,
    date_start_work: data.date_start_work || null,
    profession: data.profession || null,
    job_title: data.job_title || null,
    manager_email: data.manager_email || null,
    is_head: data.is_head || "",
    department_v2: data.department_v2 || null,
    department_level2: data.department_level2 || null,
    test_mh: data.test_mh || null,
    otp: data.otp || null,
    otp_expired_at: data.otp_expired_at || null,
    json_data: data.json_data || null,
    keycloak_id: data.keycloak_id || "",
    salesforce_id: data.salesforce_id || null,
    salesforce_token: data.salesforce_token || null,
    expertise: data.expertise || null,
    fcm_token: data.fcm_token || null,
    profile_url: data.profile_url || null,
    partner_code: data.partner_code || null,
    auth_provider: data.auth_provider || null,
  });

  const mapFromForm = (data: IAppUserGetApi): Partial<IAppUserGetApi> => ({
    user_id: data.user_id,
    username: data.username,
    user_email: data.user_email,
    user_firstname: data.user_firstname,
    user_lastname: data.user_lastname,
    phone_number: data.phone_number,
    user_status: data.user_status,
  });

  const mapResponse = (
    response: any
  ): { data: IAppUserGetApi[]; total?: number } => {
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
    IAppUserGetApi,
    IAppUserGetApi,
    { page: number; size: number; user_id?: string },
    {
      page: number;
      size: number;
      user_id?: string;
      user_email?: string;
      phone_number?: string;
      username?: string;
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
      const response = await getAppUserApi({
        page,
        size,
        user_id: user_id || "",
        sort: "created_at,desc",
      });
      console.log("getAppUserApi response:", response);
      return response;
    },
    searchData: async ({
      size,
      user_id,
      user_email,
      username,
      phone_number,
      from,
      to,
    }: {
      size: number;
      user_id?: string;
      user_email?: string;
      username?: string;
      phone_number?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchAppUserApi({
        size,
        user_id,
        user_email,
        username,
        phone_number,
        from,
        to,
      });
      console.log("searchAppUserApi response:", response);
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
      const response = await sortAppUserApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortAppUserApi response:", response);
      return response;
    },
    fetchById: async (user_id: string) => {
      const response = await getAppUserApi({
        page: 1,
        size: 1,
        user_id,
      });
      console.log("getAppUserApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("App User not found");
      }
      return response.data[0];
    },
    addData: patchAppUserApi,
    updateData: patchAppUserApi,
    deleteData: deleteAppUserApi,
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
  const searchNameTerm =
    filters.user_email !== undefined && filters.user_email !== null
      ? String(filters.user_email)
      : "";
  const searchPhoneTerm =
    filters.phone_number !== undefined && filters.phone_number !== null
      ? String(filters.phone_number)
      : "";
  const searchUsernameTerm =
    filters.username !== undefined && filters.username !== null
      ? String(filters.username)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("user_id", value || null);
  const setSearchNameTerm = (value: string) =>
    setFilter("user_email", value || null);
  const setSearchPhoneTerm = (value: string) =>
    setFilter("phone_number", value || null);
  const setSearchUsernameTerm = (value: string) =>
    setFilter("username", value || null);

  const handleClearSearchId = () => handleClearFilter("user_id");
  const handleClearSearchName = () => handleClearFilter("user_email");
  const handleClearSearchPhone = () => handleClearFilter("phone_number");
  const handleClearSearchUsername = () => handleClearFilter("username");

  const columns = [
    { key: "user_id" as keyof IAppUserGetApi, header: "User ID" },
    { key: "username" as keyof IAppUserGetApi, header: "Username" },
    { key: "user_email" as keyof IAppUserGetApi, header: "Email" },
    { key: "user_firstname" as keyof IAppUserGetApi, header: "First Name" },
    { key: "user_lastname" as keyof IAppUserGetApi, header: "Last Name" },
    { key: "user_fullname" as keyof IAppUserGetApi, header: "Full Name" },
    { key: "phone_number" as keyof IAppUserGetApi, header: "Phone Number" },
    { key: "user_gender" as keyof IAppUserGetApi, header: "Gender" },
    { key: "user_avatar" as keyof IAppUserGetApi, header: "Avatar" },
    { key: "date_of_birth" as keyof IAppUserGetApi, header: "Date of Birth" },
    { key: "job" as keyof IAppUserGetApi, header: "Job" },
    {
      key: "user_status" as keyof IAppUserGetApi,
      header: "Status",
      render: (item: IAppUserGetApi) => {
        const statuses = Array.isArray(item.user_status)
          ? item.user_status.map((s) => s.toString())
          : typeof item.user_status === "number"
          ? [item.user_status]
          : item.user_status
          ? [item.user_status]
          : [];
        const customStyles: Record<string, string> = {
          1: "bg-green-600 text-white",
          0: "bg-yellow-600 text-black",
          [-1]: "bg-gray-600 text-white",
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
    {
      key: "created_at" as keyof IAppUserGetApi,
      header: "Date Created",
      render: (item: IAppUserGetApi) =>
        dayjs(item.created_at).format("HH:mm:ss DD-MM-YYYY"),
    },
    {
      key: "updated_at" as keyof IAppUserGetApi,
      header: "Date Updated",
      render: (item: IAppUserGetApi) =>
        dayjs(item.updated_at).format("HH:mm:ss DD-MM-YYYY"),
    },
    { key: "group_id" as keyof IAppUserGetApi, header: "Group ID" },
    { key: "user_session" as keyof IAppUserGetApi, header: "Session" },
    { key: "parent_id" as keyof IAppUserGetApi, header: "Parent ID" },
    { key: "province_id" as keyof IAppUserGetApi, header: "Province ID" },
    { key: "district_id" as keyof IAppUserGetApi, header: "District ID" },
    { key: "ward_id" as keyof IAppUserGetApi, header: "Ward ID" },
    { key: "object_id" as keyof IAppUserGetApi, header: "Object ID" },
    { key: "user_type" as keyof IAppUserGetApi, header: "User Type" },
    { key: "department" as keyof IAppUserGetApi, header: "Department" },
    {
      key: "department_code" as keyof IAppUserGetApi,
      header: "Department Code",
    },
    {
      key: "language_session" as keyof IAppUserGetApi,
      header: "Language Session",
    },
    { key: "rank" as keyof IAppUserGetApi, header: "Rank" },
    { key: "company_name" as keyof IAppUserGetApi, header: "Company Name" },
    {
      key: "date_start_work" as keyof IAppUserGetApi,
      header: "Start Work Date",
    },
    { key: "profession" as keyof IAppUserGetApi, header: "Profession" },
    { key: "job_title" as keyof IAppUserGetApi, header: "Job Title" },
    { key: "manager_email" as keyof IAppUserGetApi, header: "Manager Email" },
    { key: "is_head" as keyof IAppUserGetApi, header: "Is Head" },
    { key: "department_v2" as keyof IAppUserGetApi, header: "Department V2" },
    {
      key: "department_level2" as keyof IAppUserGetApi,
      header: "Department Level 2",
    },
    { key: "test_mh" as keyof IAppUserGetApi, header: "Test MH" },
    { key: "otp" as keyof IAppUserGetApi, header: "OTP" },
    { key: "otp_expired_at" as keyof IAppUserGetApi, header: "OTP Expired At" },
    {
      key: "json_data" as keyof IAppUserGetApi,
      header: "JSON Data",
      render: (item: IAppUserGetApi) => {
        const maxLength = 80;
        let displayString = "";
        if (typeof item.json_data === "string") {
          displayString = item.json_data;
        } else if (item.json_data && typeof item.json_data === "object") {
          displayString = JSON.stringify(item.json_data);
        } else {
          displayString = "";
        }
        const displayOutput =
          displayString.length > maxLength
            ? displayString.substring(0, maxLength) + "..."
            : displayString;
        return <div>{displayOutput}</div>;
      },
    },
    { key: "keycloak_id" as keyof IAppUserGetApi, header: "Keycloak ID" },
    { key: "salesforce_id" as keyof IAppUserGetApi, header: "Salesforce ID" },
    {
      key: "salesforce_token" as keyof IAppUserGetApi,
      header: "Salesforce Token",
    },
    { key: "expertise" as keyof IAppUserGetApi, header: "Expertise" },
    { key: "fcm_token" as keyof IAppUserGetApi, header: "FCM Token" },
    { key: "profile_url" as keyof IAppUserGetApi, header: "Profile URL" },
    { key: "partner_code" as keyof IAppUserGetApi, header: "Partner Code" },
    { key: "auth_provider" as keyof IAppUserGetApi, header: "Auth Provider" },
    { key: "actions" as keyof IAppUserGetApi, header: "Actions" },
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
          searchPhoneTerm={searchPhoneTerm}
          setSearchPhoneTerm={setSearchPhoneTerm}
          searchUsernameTerm={searchUsernameTerm}
          setSearchUsernameTerm={setSearchUsernameTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchName}
          handleClearSearchPhone={handleClearSearchPhone}
          handleClearSearchUsername={handleClearSearchUsername}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by User ID"
          idSearchType="number"
          hideAddButton={true}
        />

        <div className="max-w-full overflow-x-auto">
          {error ? (
            <div className="p-4 text-center text-red-500 dark:text-red-400">
              {error}
            </div>
          ) : !paginatedData || paginatedData.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No app users found for the selected filters.
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
      <AppUserFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteAppUserConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};
