import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { TNavItem } from "./index";

import {
  ListIcon,
  ChevronDownIcon,
  SerIcon,
  ConfigIcon,
  DataIcon,
  AppUserIcon,
  LogIcon,
  LeadIcon,
  CateIcon,
  PartnerIcon,
  FAQIcon,
  PlugInIcon,
} from "../../icons";
import { useSidebar } from "../../context/index";
import { MenuIcon } from "lucide-react";

const navItems: TNavItem[] = [
  {
    name: "APP CONFIG",
    icon: <ConfigIcon />,
    subItems: [
      {
        name: "App Config",
        path: "/appconfig",
        pro: false,
        icon: <ListIcon />,
      },
    ],
  },
  {
    name: "USERS",
    icon: <AppUserIcon />,
    subItems: [
      {
        name: "App User",
        path: "/appuser",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "App User Pending",
        path: "/appuserpending",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "User FCM Tokens",
        path: "/userfcmtokens",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "User Notifications",
        path: "/usernotifications",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "User Profile URL Map",
        path: "/userprofileurlmap",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "User Behavior Log Table",
        path: "/UserBehaviorLogTable",
        pro: false,
        icon: <ListIcon />,
      },
    ],
  },
  {
    name: "LEADS",
    icon: <LeadIcon />,
    subItems: [
      {
        name: "Lead Tables",
        path: "/lead_tables",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Leads Property Tables",
        path: "/leads_property_table",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Lead Activities",
        path: "/lead-activities",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Lead Assignments",
        path: "/LeadAssignmentTables",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Lead Note",
        path: "/LeadNotesTables",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Lead Property Floors",
        path: "/leadPropertyfloors",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Leads Property Rooms",
        path: "/LeadsPropertyRoomsTables",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Lead Sources",
        path: "/leadsourcestable",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Leads Refer Partner",
        path: "/leadsReferPartnerTables",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Leads Refer Partner Activity",
        path: "/leadsReferPartnerActivity",
        pro: false,
        icon: <ListIcon />,
      },
    ],
  },
  {
    name: "COMMON",
    icon: <FAQIcon />,
    subItems: [
      {
        name: "Common Branch Postcode",
        path: "/commonbranchpostcode",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Common FAQ",
        path: "/commonfaq",
        pro: false,
        icon: <FAQIcon />,
      },
      {
        name: "Common Metadata",
        path: "/commonmetadata",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Common Metadata Final",
        path: "/common_metadata_final",
        pro: false,
        icon: <ListIcon />,
      },
    ],
  },
  {
    name: "METADATA",
    icon: <DataIcon />,
    subItems: [
      {
        name: "Category Tables",
        path: "/category-tables",
        pro: false,
        icon: <CateIcon />,
      },
      {
        name: "Partner Tables",
        path: "/partner-tables",
        pro: false,
        icon: <PartnerIcon />,
      },
      {
        name: "Service Tables",
        path: "/service-tables",
        pro: false,
        icon: <SerIcon />,
      },
    ],
  },
  {
    name: "CAMPAIGN",
    icon: <DataIcon />,
    subItems: [
      {
        name: "Campaign Master",
        path: "/CampaignMaster",
        pro: false,
        icon: <CateIcon />,
      },
      {
        name: "Campaign Email Template Tables",
        path: "/CampaignEmailTemplateTables",
        pro: false,
        icon: <CateIcon />,
      },
      {
        name: "Campaign Master Participant Blacklists",
        path: "/CampaignMasterParticipantBlacklists",
        pro: false,
        icon: <CateIcon />,
      },
    ],
  },
];

const othersItems: TNavItem[] = [
  {
    name: "OTHERS",
    icon: <MenuIcon />,
    subItems: [
      {
        name: "API Logs",
        path: "/apilogs",
        pro: false,
        icon: <LogIcon />,
      },
      {
        name: "Entity File Mapping",
        path: "/entityfilemapping",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Owners",
        path: "/owner",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Properties",
        path: "/properties",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Property Floors Table",
        path: "/PropertyFloorsTable",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Rentals",
        path: "/rental",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "SF Mart Leads",
        path: "/sfmartleads",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Mart Potential Lead",
        path: "/martpotentiallead",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Mart Potential Lead Order",
        path: "/mart-potential-lead-orders",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Potential Lead Action",
        path: "/potentialLeadActionTable",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Potential Lead History Search",
        path: "/userPotentialLeadHistorySearch",
        pro: false,
        icon: <ListIcon />,
      },
      {
        name: "Property Room Table",
        path: "/PropertyRoomTable",
        pro: false,
        icon: <ListIcon />,
      },
    ],
  },
];

const authItems: TNavItem[] = [
  {
    icon: <PlugInIcon />,
    name: "AUTHENCATION",
    subItems: [
      { name: "Sign In", path: "/", pro: false, icon: <ListIcon /> },
      { name: "Sign Up", path: "/signup", pro: false, icon: <ListIcon /> },
    ],
  },
];

export const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenus, setOpenSubmenus] = useState<
    { type: "main" | "others" | "auth"; index: number }[]
  >([]);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    const newOpenSubmenus: {
      type: "main" | "others" | "auth";
      index: number;
    }[] = [];

    navItems.forEach((nav, index) => {
      if (
        nav.subItems &&
        nav.subItems.some((subItem) => isActive(subItem.path))
      ) {
        newOpenSubmenus.push({ type: "main", index });
      }
    });

    othersItems.forEach((nav, index) => {
      if (
        nav.subItems &&
        nav.subItems.some((subItem) => isActive(subItem.path))
      ) {
        newOpenSubmenus.push({ type: "others", index });
      }
    });

    authItems.forEach((nav, index) => {
      if (
        nav.subItems &&
        nav.subItems.some((subItem) => isActive(subItem.path))
      ) {
        newOpenSubmenus.push({ type: "auth", index });
      }
    });

    setOpenSubmenus(newOpenSubmenus);
  }, [location.pathname]);

  useEffect(() => {
    openSubmenus.forEach(({ type, index }) => {
      const key = `${type}-${index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    });
  }, [openSubmenus]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "others" | "auth"
  ) => {
    setOpenSubmenus((prevOpenSubmenus) => {
      const key = { type: menuType, index };
      const isOpen = prevOpenSubmenus.some(
        (item) => item.type === menuType && item.index === index
      );
      if (isOpen) {
        return prevOpenSubmenus.filter(
          (item) => !(item.type === menuType && item.index === index)
        );
      } else {
        return [...prevOpenSubmenus, key];
      }
    });
  };

  const renderMenuItems = (
    items: TNavItem[],
    menuType: "main" | "others" | "auth"
  ) => (
    <ul className="flex flex-col gap-2">
      {items.map((nav, index) => {
        const isOpen = openSubmenus.some(
          (item) => item.type === menuType && item.index === index
        );
        const isParentActive =
          nav.subItems &&
          nav.subItems.some((subItem) => isActive(subItem.path));

        return (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`flex items-center w-full p-2 rounded-lg transition-colors duration-200 ${
                  isParentActive || isOpen
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                } ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-between"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 ${
                      isParentActive || isOpen
                        ? "text-brand-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="text-sm font-medium">{nav.name}</span>
                  )}
                </div>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-500" : "text-gray-400"
                    }`}
                  />
                )}
              </button>
            ) : (
              nav.path && (
                <Link
                  to={nav.path}
                  className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                    isActive(nav.path)
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  } ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "lg:justify-start"
                  }`}
                >
                  <span
                    className={`w-5 h-5 ${
                      isActive(nav.path)
                        ? "text-brand-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="ml-3 text-sm font-medium">{nav.name}</span>
                  )}
                </Link>
              )
            )}
            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[`${menuType}-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  height: isOpen
                    ? `${subMenuHeight[`${menuType}-${index}`] || 0}px`
                    : "0px",
                }}
              >
                <ul className="mt-1 ml-10 space-y-1">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.path}
                        className={`flex items-center p-2 rounded-lg text-sm transition-colors duration-200 ${
                          isActive(subItem.path)
                            ? "text-brand-500 font-medium"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 mr-2 ${
                            isActive(subItem.path)
                              ? "text-brand-500"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {subItem.icon}
                        </span>
                        <span>{subItem.name}</span>
                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.new && (
                            <span
                              className={`px-1.5 py-0.5 text-xs rounded ${
                                isActive(subItem.path)
                                  ? "bg-brand-500 text-white"
                                  : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                              }`}
                            >
                              new
                            </span>
                          )}
                          {subItem.pro && (
                            <span
                              className={`px-1.5 py-0.5 text-xs rounded ${
                                isActive(subItem.path)
                                  ? "bg-brand-500 text-white"
                                  : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                              }`}
                            >
                              pro
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 lg:mt-0 top-0 left-0 h-screen flex flex-col px-5 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/category-tables">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/Clippathgroup.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/Clippathgroup.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/Clippathgroup.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Menu" : ""}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Other" : ""}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Auth" : ""}
              </h2>
              {renderMenuItems(authItems, "auth")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};
