import React, { useEffect, useState, useRef } from "react";
import { FormModal } from "../../../../index";
import { ICampaignMasterParticipantBlacklistGetApi } from "../../../../models";
import { searchCampaignMasterParticipantBlacklistApi } from "../../../../services";
import { ICampaignMasterParticipantBlacklistFormModalProps } from "./index";
import { toast } from "react-toastify";
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

export const CampaignMasterParticipantBlacklistFormModal: React.FC<
  ICampaignMasterParticipantBlacklistFormModalProps
> = ({ isOpen, onClose, onSubmit, onReset, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<ICampaignMasterParticipantBlacklistGetApi>(
    typeof config === "object" && config !== null
      ? {
          id: config.id || "",
          email: config.email || "",
          full_name: config.full_name || "",
          check_email: config.check_email || "",
          phone: config.phone || "",
          status_email: config.status_email || "",
          json_metadata: processJson(config.json_metadata) || {},
          created_at: config.created_at || "",
          updated_at: config.updated_at || "",
        }
      : {
          id: "",
          email: "",
          full_name: "",
          check_email: "",
          phone: "",
          status_email: "",
          json_metadata: {},
          created_at: "",
          updated_at: "",
        }
  );
  const [emailSuggestions, setEmailSuggestions] = useState<ICampaignMasterParticipantBlacklistGetApi[]>([]);
  const emailRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.id) {
        const fetchBlacklistDetails = async () => {
          try {
            const results = await searchCampaignMasterParticipantBlacklistApi({
              id: config.id,
            });
            console.log("API results for Blacklist details:", results);

            if (results && results.data.length > 0) {
              const fetchedConfig = results.data[0];
              const newFormData = {
                id: fetchedConfig.id || config.id || "",
                email: fetchedConfig.email || config.email || "",
                full_name: fetchedConfig.full_name || config.full_name || "",
                check_email: fetchedConfig.check_email || config.check_email || "",
                phone: fetchedConfig.phone || config.phone || "",
                status_email: fetchedConfig.status_email || config.status_email || "",
                json_metadata:
                  processJson(fetchedConfig.json_metadata) ||
                  processJson(config.json_metadata) ||
                  {},
                created_at: fetchedConfig.created_at || config.created_at || "",
                updated_at: fetchedConfig.updated_at || config.updated_at || "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                id: config.id || "",
                email: config.email || "",
                full_name: config.full_name || "",
                check_email: config.check_email || "",
                phone: config.phone || "",
                status_email: config.status_email || "",
                json_metadata: processJson(config.json_metadata) || {},
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
            console.error("Error fetching Blacklist details:", error);
            toast.error("Failed to fetch blacklist details.");
            const newFormData = {
              id: config.id || "",
              email: config.email || "",
              full_name: config.full_name || "",
              check_email: config.check_email || "",
              phone: config.phone || "",
              status_email: config.status_email || "",
              json_metadata: processJson(config.json_metadata) || {},
              created_at: config.created_at || "",
              updated_at: config.updated_at || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchBlacklistDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          id: "",
          email: "",
          full_name: "",
          check_email: "",
          phone: "",
          status_email: "",
          json_metadata: {"":""},
          created_at: "",
          updated_at: "",
        };
        setFormData(defaultFormData);
        setEmailSuggestions([]);

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
    fieldName: keyof ICampaignMasterParticipantBlacklistGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<ICampaignMasterParticipantBlacklistGetApi>[] = [
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
      name: "email",
      label: "Email",
      type: "text" as const,
      inputType: "email" as const,
      required: true,
      placeholder: "Enter email",
      disabled: mode === "detail",
      value: formData.email,
    } as const,
    {
      name: "full_name",
      label: "Full Name",
      type: "text" as const,
      placeholder: "Enter full name",
      disabled: mode === "detail",
      value: formData.full_name,
      onChange: (e) => handleInputChange(e, "full_name"),
    } as const,
    {
      name: "check_email",
      label: "Check Email",
      type: "text" as const,
      inputType: "text" as const,
      placeholder: "Enter check email",
      disabled: mode === "detail",
      value: formData.check_email,
      onChange: (e) => handleInputChange(e, "check_email"),
    } as const,
    {
      name: "phone",
      label: "Phone",
      type: "text" as const,
      inputType: "tel" as const,
      placeholder: "Enter phone number",
      disabled: mode === "detail",
      value: formData.phone,
      onChange: (e) => handleInputChange(e, "phone"),
    } as const,
    {
      name: "status_email",
      label: "Status Email",
      type: "text" as const,
      placeholder: "Enter email status",
      disabled: mode === "detail",
      value: formData.status_email,
      onChange: (e) => handleInputChange(e, "status_email"),
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
  ];

  console.log("Rendering CampaignMasterParticipantBlacklistFormModal with formData:", formData);
  console.log("Fields passed to FormModal:", fields);
  console.log("Current email suggestions:", emailSuggestions);

  return (
    <FormModal<ICampaignMasterParticipantBlacklistGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);

          const email = data.email || "";
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            toast.error("Email must be a valid email address.");
            throw new Error("Invalid email");
          }

          let jsonMetadata = data.json_metadata || {};
          if (
            typeof data.json_metadata === "string" &&
            data.json_metadata !== ""
          ) {
            try {
              jsonMetadata = JSON.parse(data.json_metadata);
              if (typeof jsonMetadata !== "object" || jsonMetadata === null) {
                toast.error("JSON Metadata must be a valid JSON object.");
                throw new Error("Invalid JSON Metadata");
              }
            } catch (error) {
              toast.error("JSON Metadata must be a valid JSON object.");
              throw new Error("Invalid JSON Metadata");
            }
          }

          const submitData: ICampaignMasterParticipantBlacklistGetApi = {
            id: data.id || "",
            email: data.email || "",
            full_name: data.full_name || "",
            check_email: data.check_email || "",
            phone: data.phone || "",
            status_email: data.status_email || "",
            json_metadata: jsonMetadata,
            created_at: data.created_at || "",
            updated_at: data.updated_at || "",
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
        add: "Add New Blacklist Entry",
        edit: "Edit Blacklist Entry",
        detail: "Blacklist Entry Details",
      }}
      description={{
        add: "Create a new blacklist entry with the details below.",
        edit: "Update blacklist entry details to keep information current.",
        detail: "View details of the blacklist entry below.",
      }}
      children={children}
    />
  );
};