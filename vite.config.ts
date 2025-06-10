import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";


export default defineConfig(() => {
  const url = "https://crud-partner-be.vercel.app"
  const API_PREFIX = "/api/v1";

  const apiV1Routes = [
    "/leadsources",
    "/auth",
    "/common_metadata_partner",
    "/app-config",
    "/app-user",
    "/leadsproperty",
    "/leads",
    "/common-faq",
    "/api-log",
    "/common-metadata",
    "/entity-file-mapping",
    "/leadsproperty-floors",
    "/properties",
    "/user-profile-url-map",
    "/user-notifications",
    "/potential-lead-history-search",
    "/user-fcm-token",
    "/rentals",
    "/sf-mart-leads",
    "/owners",
    "/app-user-pending",
    "/mart-potential-lead",
    "/common-branch-postcode",
    "/property-owner-ship",
    "/leadnotes",
    "/leadassignments",
    "/leadactivities",
    "/leads-refer-partner-activity",
    "/mart-potential-lead-orders",
    "/leads-refer-partner",
    "/common-metadata-final",
    "/leads-refer-partner-activity",
    "/potential-lead-action",
    "/leads-property-rooms",
    "/campaign-master",
    "/campaign-email-template",
  ];

  const proxyConfig = apiV1Routes
    .map((route) => `${API_PREFIX}${route}`)
    .reduce((acc, route) => {
      acc[route] = {
        target: url,
        changeOrigin: true,
        secure: false,
      };
      return acc;
    }, {} as Record<string, any>);

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
          exportType: "named",
          namedExport: "ReactComponent",
        },
      }),
    ],
    server: {
      proxy: proxyConfig,
    },
  };
});



