/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { IUserNotificationsGetApi } from "../../../../models";
import { UserNotificationsFormModalProps } from "./index";
import { IFormField } from "../../../../components";

const processJson = (data: unknown): Record<string, any> => {
  try {
    if (typeof data === "string") {
      return JSON.parse(data) || {};
    }
    return data || {};
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return {};
  }
};

export const UserNotificationsFormModal: React.FC<
  UserNotificationsFormModalProps
> = ({ isOpen, onClose, onSubmit, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<
    IUserNotificationsGetApi | undefined
  >(typeof config === "object" && config !== null ? config : undefined);

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config) {
      setFormData({
        id: config.id || "",
        title: config.title || "",
        message: config.message || "",
        user_id: config.user_id || "",
        user_email: config.user_email || "",
        type: config.type || "",
        is_read: config.is_read || "",
        data: processJson(config.data) || {},
        read_at: config.read_at || "",
        
      });
    } else if (isOpen && mode === "add") {
      setFormData({
        title: "",
        message: "",
        user_id: "",
        user_email: "",
        type: "",
        is_read: "",
        data: {},
        read_at: "",

      });
    }
  }, [isOpen, mode, config]);

  const fields: IFormField<IUserNotificationsGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "ID",
            type: "text" as const,
            disabled: true,
            placeholder: " ID",
          } as const,
        ]
      : []),
    {
      name: "title",
      label: "Title",
      type: "text" as const,
      required: true,
      placeholder: "Enter title",
      disabled: mode === "detail",
    },
    {
      name: "message",
      label: "Message",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter message",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "user_id",
      label: "User Id",
      type: "text" as const,
      required: true,
      placeholder: "Enter user_id",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "type",
      label: "Type",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter type",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "is_read",
      label: "Is Read",
      type: "select" as const,
      required: true,
      placeholder: "Enter is_read",
      selectOptions: {
        options: [
          { value: "0", label: "True" },
          { value: "1", label: "False" },
        ],
      },
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "data",
      label: "Data",
      type: "aceEditor" as const,
      required: true,
      placeholder: "Enter data",
      disabled: mode === "detail",
      value: JSON.stringify(formData?.data ?? {}, null, 2),
      onChange: (e) => {
        try {
          setFormData((prev) => ({
            ...prev!,
            data: JSON.parse(e.target.value || "{}"),
          }));
        } catch {}
      },
    },
  ];

  return (
    <FormModal<IUserNotificationsGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (!String(data.title ?? "").trim().length) {
          throw new Error("Missing key");
        }
        if (!String(data.title ?? "").trim().length) {
          throw new Error("Missing values");
        }

        const newMetadata: IUserNotificationsGetApi = {
          id: data.id || undefined,
          title: data.title,
          message: data.message,
          user_id: data.user_id,
          type: data.type,
          is_read: data.is_read,
          data: data.data,
          read_at: data.read_at || undefined,
          user_email: data.user_email || undefined,
        };

        await onSubmit(newMetadata);
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New User Notification ",
        edit: "Edit User Notification",
        detail: "User Notification Details",
      }}
      description={{
        add: "Create a new User Notification with the details below.",
        edit: "Update the User Notification details to keep it up-to-date.",
        detail: "View the details of the User Notification below.",
      }}
      children={children}
    />
  );
};
