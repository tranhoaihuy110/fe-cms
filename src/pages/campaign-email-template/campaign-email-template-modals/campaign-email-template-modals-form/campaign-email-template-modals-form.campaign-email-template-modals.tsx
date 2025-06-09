import React, { useEffect, useState, useRef } from "react";
import { FormModal } from "../../../../index";
import {
  ICampaignEmailTemplateGetApi,
} from "../../../../models";
import {
  searchCampaignEmailTemplateApi,
} from "../../../../services";
import { ICampaignEmailTemplateFormModalProps } from "./index";
import { toast } from "react-toastify";
import { IFormField } from "../../../../components";

export const CampaignEmailTemplateFormModal: React.FC<
  ICampaignEmailTemplateFormModalProps
> = ({ isOpen, onClose, onSubmit, onReset, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<ICampaignEmailTemplateGetApi>(
    typeof config === "object" && config !== null
      ? {
          id: config.id || "",
          template_email_code: config.template_email_code || "",
          email_subject: config.email_subject || "",
          email_body: config.email_body || "",
          email_type: config.email_type || "",
          template_email_keys: config.template_email_keys || "",
          user_create: config.user_create || "",
          created_at: config.created_at || "",
          updated_at: config.updated_at || "",
        }
      : {
          id: "",
          template_email_code: "",
          email_subject: "",
          email_body: "",
          email_type: "",
          template_email_keys: "",
          user_create: "",
          created_at: "",
          updated_at: "",
        }
  );
  const emailRef = useRef<HTMLDivElement | null>(null);

  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.id) {
        const fetchLeadPropertyDetails = async () => {
          try {
            const results = await searchCampaignEmailTemplateApi({
              size: 1,
              id: config.id,
            });
            console.log("API results for Campaign Email Template details:", results);

            if (results && results.length > 0) {
              const fetchedConfig = results[0];
              const newFormData = {
                id: fetchedConfig.id || config.id || "",
                template_email_code: fetchedConfig.template_email_code || config.template_email_code || "",
                email_subject: fetchedConfig.email_subject || config.email_subject || "",
                email_body: fetchedConfig.email_body || config.email_body || "",
                email_type: fetchedConfig.email_type || config.email_type || "",
                template_email_keys: fetchedConfig.template_email_keys || config.template_email_keys || "",
                user_create: fetchedConfig.user_create || config.user_create || "",
                created_at: fetchedConfig.created_at || config.created_at || "",
                updated_at: fetchedConfig.updated_at || config.updated_at || "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                id: config.id || "",
                template_email_code: config.template_email_code || "",
                email_subject: config.email_subject || "",
                email_body: config.email_body || "",
                email_type: config.email_type || "",
                template_email_keys: config.template_email_keys || "",
                user_create: config.user_create || "",
                created_at: config.created_at || "",
                updated_at: config.updated_at || "",
              };
              setFormData(newFormData);
              console.log(
                "formData set to fallback in edit/detail mode:",
                newFormData
              );
              toast.warn("No data returned from API, using provided data.");
            }
          } catch (error) {
            console.error("Error fetching Campaign Email Template details:", error);
            const newFormData = {
              id: config.id || "",
              template_email_code: config.template_email_code || "",
              email_subject: config.email_subject || "",
              email_body: config.email_body || "",
              email_type: config.email_type || "",
              template_email_keys: config.template_email_keys || "",
              user_create: config.user_create || "",
              created_at: config.created_at || "",
              updated_at: config.updated_at || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchLeadPropertyDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          template_email_code: "",
          email_subject: "",
          email_body: "",
          email_type: "",
          template_email_keys: "",
          user_create: "",
          created_at: "",
          updated_at: "",
        };
        setFormData(defaultFormData);

        console.log("formData initialized in add mode:", defaultFormData);
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, mode, config]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emailRef.current &&
        !emailRef.current.contains(event.target as Node)
      ) {
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof ICampaignEmailTemplateGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<ICampaignEmailTemplateGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "ID",
            type: "text" as const,
            disabled: true,
            placeholder: "ID",
            value: formData.id,
          } as const,
        ]
      : []),
    {
      name: "template_email_code",
      label: "Template Email Code",
      type: "text" as const,
      placeholder: "Enter Template Email Code",
      disabled: mode === "detail",
      value: formData.template_email_code,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "template_email_code");
      },
    } as const,
    {
      name: "email_subject",
      label: "Email Subject",
      type: "text" as const,
      required: true,
      placeholder: "Enter Email Subject",
      disabled: mode === "detail",
      value: formData.email_subject,
    } as const,
    {
      name: "email_body",
      label: "Email Body",
      type: "textarea" as const,
      placeholder: "Enter Email Body",
      disabled: mode === "detail",
      value: formData.email_body,
    } as const,
    {
      name: "email_type",
      label: "Email Type",
      type: "text" as const,
      placeholder: "Enter Email Type",
      disabled: mode === "detail",
      value: formData.email_type,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "email_type");
      },
    } as const,
    {
      name: "template_email_keys",
      label: "Template Email Keys",
      type: "text" as const,
      placeholder: "Enter Template Email Keys",
      disabled: mode === "detail",
      value: formData.template_email_keys,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "template_email_keys");
      },
    } as const,
    {
      name: "user_create",
      label: "Created User",
      type: "text" as const,
      placeholder: "Enter Created User",
      disabled: mode === "detail",
      value: formData.user_create,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "user_create");
      },
    } as const,
  ];

  return (
    <FormModal<ICampaignEmailTemplateGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          const submitData: ICampaignEmailTemplateGetApi = {
            id: data.id || undefined,
            template_email_code: data.template_email_code || "",
            email_subject: data.email_subject || "",
            email_body: data.email_body || "",
            email_type: data.email_type || "",
            template_email_keys: data.template_email_keys || "",
            user_create: data.user_create || "",
          };

          await onSubmit(submitData);
          onReset && onReset();
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Campaign Email Template",
        edit: "Edit Campaign Email Template",
        detail: "Campaign Email Template Details",
      }}
      description={{
        add: "Create a new Campaign Email Template with the details below.",
        edit: "Update Campaign Email Template details to keep information current.",
        detail: "View details of the Campaign Email Template below.",
      }}
      children={children}
    />
  );
};