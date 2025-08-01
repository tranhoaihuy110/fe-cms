import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { toast } from "react-toastify";
import { IUserProfileUrlMapGetApi } from "../../../../models";
import { UserProfileUrlMapFormModalProps } from "./index";
import {IFormField} from '../../../../components'
export const UserProfileUrlMapFormModal: React.FC<UserProfileUrlMapFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<IUserProfileUrlMapGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config) {
      setFormData({
        id: config.id || "",
        email: config.email || "",
        profile_url: config.profile_url || "",
        profile_image: config.profile_image || "",
      });
    } else if (isOpen && mode === "add") {
      setFormData({
        email: "",
        profile_url: "",
        profile_image: "",
      });
    }
  }, [isOpen, mode, config]);

  const fields: IFormField<IUserProfileUrlMapGetApi>[]  = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "ID",
            type: "text" as const,
            disabled: true,
            placeholder: " ID",
          }as const,
        ]
      : []),
    {
      name: "email",
      label: "Email",
      type: "text" as const,
      required: true,
      placeholder: "Enter email",
      disabled: mode === "detail",
    },
    {
      name: "profile_url",
      label: "Profile Url",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter profile_url",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "profile_image",
      label: "Profile Image",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter profile_image",
      rows: 6,
      disabled: mode === "detail",
    },
  ];

  return (
    <FormModal<IUserProfileUrlMapGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (!(String(data.email ?? "").trim().length)) {
        toast.error("Key is required.");
        throw new Error("Missing key");
}
        if (!(String(data.email ?? "").trim().length)) {
        throw new Error("Missing values");
        }

        const newMetadata: IUserProfileUrlMapGetApi = {
            id: data.id || undefined,
            email: data.email,
            profile_url: data.profile_url,
            profile_image: data.profile_image,
        };

        await onSubmit(newMetadata);
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New User Profile Url Map ",
        edit: "Edit User Profile Url Map",
        detail: "User Profile Url Map Details",
      }}
      description={{
        add: "Create a new User Profile Url Map with the details below.",
        edit: "Update the User Profile Url Map details to keep it up-to-date.",
        detail: "View the details of the User Profile Url Map below.",
      }}
      children={children}
    />
  );
};
