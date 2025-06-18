import React, { useEffect, useState, useRef } from "react";
import { FormModal } from "../../../../index";
import { ICampaignAudienceMasterGetApi } from "../../../../models";
import { searchCampaignAudienceMasterApi } from "../../../../services";
import { ICampaignAudienceMasterFormModalProps } from "./index";
import { toast } from "react-toastify";
import { IFormField } from "../../../../components";

export const CampaignAudienceMasterFormModal: React.FC<
  ICampaignAudienceMasterFormModalProps
> = ({ isOpen, onClose, onSubmit, onReset, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<ICampaignAudienceMasterGetApi>(
    typeof config === "object" && config !== null
      ? {
          id: config.id || "",
          target_desc: config.target_desc || "",
          target_name: config.target_name || "",
          condition: config.condition || "",
          user_create: config.user_create || "",
          status: config.status || "",
          mode: config.mode || "",
          json_filter: config.json_filter || "",
          create_date: config.create_date || "",
          fb_custom_audience_id: config.fb_custom_audience_id || "",
          list_project_short_name: config.list_project_short_name || "",
          last_crond_date: config.last_crond_date || "",
          platform: config.platform || "",
        }
      : {
          id: "",
          target_desc: "",
          target_name: "",
          condition: "",
          user_create: "",
          status: "",
          mode: "",
          json_filter: "",
          create_date: "",
          fb_custom_audience_id: "",
          list_project_short_name: "",
          last_crond_date: "",
          platform: "",
        }
  );
  const [emailSuggestions, setEmailSuggestions] = useState<
    ICampaignAudienceMasterGetApi[]
  >([]);
  const emailRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.id) {
        const fetchCampaignAudienceDetails = async () => {
          try {
            const results = await searchCampaignAudienceMasterApi({
              id: config.id,
            });
            console.log(
              "API results for Campaign Audience Master details:",
              results
            );

            if (results && results.data.length > 0) {
              const fetchedConfig = results.data[0];
              const newFormData = {
                id: fetchedConfig.id || config.id || "",
                target_desc:
                  fetchedConfig.target_desc || config.target_desc || "",
                target_name:
                  fetchedConfig.target_name || config.target_name || "",
                condition: fetchedConfig.condition || config.condition || "",
                user_create:
                  fetchedConfig.user_create || config.user_create || "",
                status: fetchedConfig.status || config.status || "",
                mode: fetchedConfig.mode || config.mode || "",
                json_filter: fetchedConfig.json_filter || config.json_filter || "",
                create_date:
                  fetchedConfig.create_date || config.create_date || "",
                fb_custom_audience_id:
                  fetchedConfig.fb_custom_audience_id ||
                  config.fb_custom_audience_id ||
                  "",
                list_project_short_name:
                  fetchedConfig.list_project_short_name ||
                  config.list_project_short_name ||
                  "",
                last_crond_date:
                  fetchedConfig.last_crond_date || config.last_crond_date || "",
                platform: fetchedConfig.platform || config.platform || "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                id: config.id || "",
                target_desc: config.target_desc || "",
                target_name: config.target_name || "",
                condition: config.condition || "",
                user_create: config.user_create || "",
                status: config.status || "",
                mode: config.mode || "",
                json_filter: config.json_filter,
                create_date: config.create_date || "",
                fb_custom_audience_id: config.fb_custom_audience_id || "",
                list_project_short_name: config.list_project_short_name || "",
                last_crond_date: config.last_crond_date || "",
                platform: config.platform || "",
              };
              setFormData(newFormData);
              console.log(
                "formData set to fallback in edit/detail mode:",
                newFormData
              );
              toast.warn("No data returned from API, using provided data.");
            }
          } catch (error) {
            console.error(
              "Error fetching Campaign Audience Master details:",
              error
            );
            const newFormData = {
              id: config.id || "",
              target_desc: config.target_desc || "",
              target_name: config.target_name || "",
              condition: config.condition || "",
              user_create: config.user_create || "",
              status: config.status || "",
              mode: config.mode || "",
              json_filter: config.json_filter,
              create_date: config.create_date || "",
              fb_custom_audience_id: config.fb_custom_audience_id || "",
              list_project_short_name: config.list_project_short_name || "",
              last_crond_date: config.last_crond_date || "",
              platform: config.platform || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchCampaignAudienceDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          id: "",
          target_desc: "",
          target_name: "",
          condition: "",
          user_create: "",
          status: "",
          mode: "",
          json_filter: "",
          create_date: "",
          fb_custom_audience_id: "",
          list_project_short_name: "",
          last_crond_date: "",
          platform: "",
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
        setEmailSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof ICampaignAudienceMasterGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<ICampaignAudienceMasterGetApi>[] = [
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
      name: "target_name",
      label: "Target Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter target name",
      disabled: mode === "detail",
      value: formData.target_name,
      onChange: (e) => handleInputChange(e, "target_name"),
    } as const,
    {
      name: "target_desc",
      label: "Target Description",
      type: "text" as const,
      required: true,
      placeholder: "Enter target description",
      disabled: mode === "detail",
      value: formData.target_desc,
      onChange: (e) => handleInputChange(e, "target_desc"),
    } as const,
    {
      name: "condition",
      label: "Condition",
      type: "text" as const,
      placeholder: "Enter condition",
      disabled: mode === "detail",
      value: formData.condition,
      onChange: (e) => handleInputChange(e, "condition"),
    } as const,
    {
      name: "user_create",
      label: "User Create",
      type: "text" as const,
      placeholder: "Enter user create",
      disabled: mode === "detail",
      value: formData.user_create,
      onChange: (e) => handleInputChange(e, "user_create"),
    } as const,
    {
      name: "status",
      label: "Status",
      type: "text" as const,
      placeholder: "Enter status",
      disabled: mode === "detail",
      value: formData.status,
      onChange: (e) => handleInputChange(e, "status"),
    } as const,
    {
      name: "mode",
      label: "Mode",
      type: "text" as const,
      placeholder: "Enter mode",
      disabled: mode === "detail",
      value: formData.mode,
      onChange: (e) => handleInputChange(e, "mode"),
    } as const,
    {
      name: "json_filter",
      label: "JSON Filter",
      type: "textarea" as const,
      placeholder: "Enter JSON filter",
      disabled: mode === "detail",
      value: formData.json_filter,
      onChange: (e) => handleInputChange(e, "json_filter"),
    } as const,
    {
      name: "fb_custom_audience_id",
      label: "FB Custom Audience ID",
      type: "text" as const,
      placeholder: "Enter FB custom audience ID",
      disabled: mode === "detail",
      value: formData.fb_custom_audience_id,
      onChange: (e) => handleInputChange(e, "fb_custom_audience_id"),
    } as const,
    {
      name: "list_project_short_name",
      label: "Project Short Name",
      type: "text" as const,
      placeholder: "Enter project short name",
      disabled: mode === "detail",
      value: formData.list_project_short_name,
      onChange: (e) => handleInputChange(e, "list_project_short_name"),
    } as const,
    {
      name: "platform",
      label: "Platform",
      type: "text" as const,
      placeholder: "Enter platform",
      disabled: mode === "detail",
      value: formData.platform,
      onChange: (e) => handleInputChange(e, "platform"),
    } as const,
  ];

  console.log(
    "Rendering CampaignAudienceMasterFormModal with formData:",
    formData
  );
  console.log("Fields passed to FormModal:", fields);
  console.log("Current email suggestions:", emailSuggestions);

  return (
    <FormModal<ICampaignAudienceMasterGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);

          const submitData: ICampaignAudienceMasterGetApi = {
            id: data.id || "",
            target_desc: data.target_desc || "",
            target_name: data.target_name || "",
            condition: data.condition || "",
            user_create: data.user_create || "",
            status: data.status || "",
            mode: data.mode || "",
            json_filter: data.json_filter || "",
            create_date: data.create_date || "",
            fb_custom_audience_id: data.fb_custom_audience_id || "",
            list_project_short_name: data.list_project_short_name || "",
            last_crond_date: data.last_crond_date || "",
            platform: data.platform || "",
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
        add: "Add New Campaign Audience Master",
        edit: "Edit Campaign Audience Master",
        detail: "Campaign Audience Master Details",
      }}
      description={{
        add: "Create a new campaign audience master with the details below.",
        edit: "Update campaign audience master details to keep information current.",
        detail: "View details of the campaign audience master below.",
      }}
      children={children}
    />
  );
};
