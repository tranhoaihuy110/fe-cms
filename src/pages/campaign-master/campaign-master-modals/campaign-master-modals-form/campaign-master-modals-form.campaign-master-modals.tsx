import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import {
  ICampaignMasterGetApi,
  ICampaignEmailTemplateGetApi,
} from "../../../../models";
import {
  searchCampaignMasterApi,
  searchCampaignEmailTemplateApi,
} from "../../../../services";
import { ICampaignMasterFormModalProps } from "./index";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { IFormField } from "../../../../components";

const processJson = (data: any): Record<string, any> => {
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

export const CampaignMasterFormModal: React.FC<
  ICampaignMasterFormModalProps
> = ({ isOpen, onClose, onSubmit, onReset, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<ICampaignMasterGetApi>(
    typeof config === "object" && config !== null
      ? {
          id: config.id || "",
          campaign_desc: config.campaign_desc || "",
          campaign_name: config.campaign_name || "",
          campaign_type: config.campaign_type || "",
          campaign_status: config.campaign_status || "",
          audience_number: config.audience_number || "",
          email_template_id: config.email_template_id || "",
          json_metadata: processJson(config.json_metadata) || {},
          created_at: config.created_at || "",
          updated_at: config.updated_at || "",
          created_user: config.created_user || "",
          segment: config.segment || "",
          email_template_final: config.email_template_final || "",
          send_by_email: config.send_by_email || "",
        }
      : {
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
        }
  );
  const [emailSuggestions, setEmailSuggestions] = useState<
    ICampaignEmailTemplateGetApi[]
  >([]);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const emailRef = useRef<HTMLDivElement | null>(null);

  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.id) {
        const fetchLeadPropertyDetails = async () => {
          try {
            const results = await searchCampaignMasterApi({
              id: config.id,
            });
            console.log("API results for Campaign Master details:", results);

            if (results && results.data.length > 0) {
              const fetchedConfig = results.data[0];
              const newFormData = {
                id: fetchedConfig.id || config.id || "",
                campaign_desc:
                  fetchedConfig.campaign_desc || config.campaign_desc || "",
                campaign_name:
                  fetchedConfig.campaign_name || config.campaign_name || "",
                campaign_type:
                  fetchedConfig.campaign_type || config.campaign_type || "",
                campaign_status:
                  fetchedConfig.campaign_status || config.campaign_status || "",
                audience_number:
                  fetchedConfig.audience_number || config.audience_number || "",
                email_template_id:
                  fetchedConfig.email_template_id ||
                  config.email_template_id ||
                  "",
                json_metadata:
                  processJson(fetchedConfig.json_metadata) ||
                  processJson(config.json_metadata) ||
                  {},
                created_at: fetchedConfig.created_at || config.created_at || "",
                updated_at: fetchedConfig.updated_at || config.updated_at || "",
                created_user:
                  fetchedConfig.created_user || config.created_user || "",
                segment: fetchedConfig.segment || config.segment || "",
                email_template_final:
                  fetchedConfig.email_template_final ||
                  config.email_template_final ||
                  "",
                send_by_email:
                  fetchedConfig.send_by_email || config.send_by_email || "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                id: config.id || "",
                campaign_desc: config.campaign_desc || "",
                campaign_name: config.campaign_name || "",
                campaign_type: config.campaign_type || "",
                campaign_status: config.campaign_status || "",
                audience_number: config.audience_number || "",
                email_template_id: config.email_template_id || "",
                json_metadata: processJson(config.json_metadata) || {},
                created_at: config.created_at || "",
                updated_at: config.updated_at || "",
                created_user: config.created_user || "",
                segment: config.segment || "",
                email_template_final: config.email_template_final || "",
                send_by_email: config.send_by_email || "",
              };
              setFormData(newFormData);
              console.log(
                "formData set to fallback in edit/detail mode:",
                newFormData
              );
              toast.warn("No data returned from API, using provided data.");
            }
          } catch (error) {
            console.error("Error fetching Campaign Master details:", error);

            const newFormData = {
              id: config.id || "",
              campaign_desc: config.campaign_desc || "",
              campaign_name: config.campaign_name || "",
              campaign_type: config.campaign_type || "",
              campaign_status: config.campaign_status || "",
              audience_number: config.audience_number || "",
              email_template_id: config.email_template_id || "",
              json_metadata: processJson(config.json_metadata) || {},
              created_at: config.created_at || "",
              updated_at: config.updated_at || "",
              created_user: config.created_user || "",
              segment: config.segment || "",
              email_template_final: config.email_template_final || "",
              send_by_email: config.send_by_email || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchLeadPropertyDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
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
        setFormData(defaultFormData);
        setEmailSuggestions([]);
        setShowEmailSuggestions(false);
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
        setShowEmailSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchEmailSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setEmailSuggestions([]);
        setShowEmailSuggestions(false);
        return;
      }
      try {
        const results = await searchCampaignEmailTemplateApi({
          size: 15,
          email_subject: value,
        });
        setEmailSuggestions(results.data);
        setShowEmailSuggestions(results.data.length > 0);
        if (results.data.length === 0) {
          toast.warn(
            "No Campaign Email Tempalte found for the given email code."
          );
        }
      } catch (error) {
        setEmailSuggestions([]);
        setShowEmailSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof ICampaignMasterGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<ICampaignMasterGetApi>[] = [
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
      name: "email_template_id",
      label: "Email Subject",
      type: "text" as const,
      inputType: "text" as const,
      required: true,
      placeholder: "Enter email subject",
      disabled: mode === "detail",
      value: formData.email_template_id,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "email_template_id");
        if (e.target instanceof HTMLInputElement) {
          searchEmailSuggestions(e.target.value);
        }
      },
      suggestions:
        showEmailSuggestions && emailSuggestions.length > 0
          ? emailSuggestions.map((template) => ({
              value: template.email_subject || "",
              label: `${template.email_subject} (Email Template ID: ${template.id})`,
              onSelect: () => {
                const updatedData = {
                  email_subject: template.email_subject || "",
                  email_template_id: template.id || "",
                };
                setFormData((prev) => ({
                  ...prev,
                  email_subject: updatedData.email_subject,
                  email_template_id: updatedData.email_template_id,
                }));
                setShowEmailSuggestions(false);
                console.log("Selected email suggestion:", updatedData);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: emailRef,
      clearable: mode !== "detail" && !!formData.email_template_id,
      onClear: () => {
        setFormData((prev) => ({
          ...prev,
          email_subject: "",
          email_template_id: "",
        }));
        return { email_subject: "", email_template_id: "" };
      },
    } as const,
    {
      name: "campaign_name",
      label: "Campaign Name",
      type: "text" as const,
      placeholder: "Enter Campaign Name",
      disabled: mode === "detail",
      value: formData.campaign_name,
    } as const,
    {
      name: "campaign_type",
      label: "Campaign Type",
      type: "text" as const,
      placeholder: "Enter Campaign Type",
      disabled: mode === "detail",
      value: formData.campaign_type,
    } as const,
    {
      name: "campaign_desc",
      label: "Campaign Desc",
      type: "text" as const,
      required: true,
      placeholder: "Enter Campaign Desc",
      disabled: mode === "detail",
      value: formData.campaign_desc,
    } as const,
    {
      name: "json_metadata",
      label: "JSON Metadata",
      type: "aceEditor" as const,
      placeholder: "Enter JSON metadata {Json Object}",
      disabled: mode === "detail",
      value: JSON.stringify(formData.json_metadata, null, 2),
      onChange: (e) => handleInputChange(e, "json_metadata"),
      aceOptions: {
        mode: "json",
        theme: "github",
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        fontSize: 14,
        height: "150px",
      },
    } as const,
    {
      name: "campaign_status",
      label: "Campaign Status",
      type: "text" as const,
      placeholder: "Enter Campaign Status",
      disabled: mode === "detail",
      value: formData.campaign_status,
    } as const,
    {
      name: "audience_number",
      label: "Audience Number",
      type: "text" as const,
      placeholder: "Enter Audience Number",
      disabled: mode === "detail",
      value: formData.audience_number,
    } as const,
    {
      name: "created_user",
      label: "Created User",
      type: "text" as const,
      placeholder: "Enter Created User",
      disabled: mode === "detail",
      value: formData.created_user,
    } as const,
    {
      name: "segment",
      label: "Segment",
      type: "text" as const,
      placeholder: "Enter Segment",
      disabled: mode === "detail",
      value: formData.segment,
    } as const,
    {
      name: "email_template_final",
      label: "Email Template Final",
      type: "textarea" as const,
      placeholder: "Enter Email Template Final",
      disabled: mode === "detail",
      value: formData.email_template_final,
    } as const,
    {
      name: "send_by_email",
      label: "Send By Email",
      type: "text" as const,
      placeholder: "Enter Send By Email",
      disabled: mode === "detail",
      value: formData.send_by_email,
    } as const,
  ];

  return (
    <FormModal<ICampaignMasterGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          let jsonMetadata = data.json_metadata || {};
          if (
            typeof data.json_metadata === "string" &&
            data.json_metadata !== ""
          ) {
            try {
              jsonMetadata = JSON.parse(data.json_metadata);
              if (typeof jsonMetadata !== "object" || jsonMetadata === null) {
                throw new Error("Invalid JSON Metadata");
              }
            } catch (error) {
              throw new Error("Invalid JSON Metadata");
            }
          }

          const submitData: ICampaignMasterGetApi = {
            id: data.id || "",
            campaign_desc: data.campaign_desc || "",
            campaign_name: data.campaign_name || "",
            campaign_type: data.campaign_type || "",
            campaign_status: data.campaign_status || "",
            audience_number: data.audience_number || "",
            email_template_id: data.email_template_id || "",
            json_metadata: jsonMetadata,
            created_at: data.created_at || "",
            updated_at: data.updated_at || "",
            created_user: data.created_user || "",
            segment: data.segment || "",
            email_template_final: data.email_template_final || "",
            send_by_email: data.send_by_email || "",
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
        add: "Add New Campaign Master",
        edit: "Edit Campaign Master",
        detail: "Campaign Master Details",
      }}
      description={{
        add: "Create a new Campaign Master with the details below.",
        edit: "Update Campaign Master details to keep information current.",
        detail: "View details of the Campaign Master below.",
      }}
      children={children}
    />
  );
};
