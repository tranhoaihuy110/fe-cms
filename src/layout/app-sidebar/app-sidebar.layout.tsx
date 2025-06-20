import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { TNavItem } from "./index";
import {
  Settings,
  SlidersHorizontal,
  UserCircle,
  User,
  Clock,
  KeyRound,
  Bell,
  Link2,
  Activity,
  Briefcase,
  Table,
  LayoutGrid,
  TrendingUp,
  UserPlus,
  StickyNote,
  Layers,
  DoorOpen,
  Share2,
  UserCheck,
  Workflow,
  MapPin,
  HelpCircle,
  Database,
  CheckCircle2,
  Tags,
  Handshake,
  Wrench,
  Megaphone,
  Mail,
  Ban,
  UsersRound,
  ShoppingCart,
  ListChecks,
  UserSearch,
  Lightbulb,
  PlayCircle,
  Search,
  Home,
  Bed,
  Building2,
  ScrollText,
  FileStack,
  CalendarCheck,
  Radar,
  Menu,
  LogIn,
  UserPlus2,
  PlugIcon,
  Clipboard,
} from "lucide-react";

import { useSidebar } from "../../context/index";
import { ChevronDownIcon } from "../../icons";

const navItems: TNavItem[] = [
  {
    name: "CONFIG",
    icon: <Settings size={20} />,
    subItems: [
      {
        name: "App config",
        path: "/appconfig",
        pro: false,
        icon: <SlidersHorizontal size={20} />,
      },
    ],
  },
  {
    name: "USER",
    icon: <UserCircle size={20} />,
    subItems: [
      {
        name: "App user",
        path: "/appuser",
        pro: false,
        icon: <User size={20} />,
      },
      {
        name: "App user pending",
        path: "/appuserpending",
        pro: false,
        icon: <Clock size={20} />,
      },
      {
        name: "User fcm tokens",
        path: "/userfcmtokens",
        pro: false,
        icon: <KeyRound size={20} />,
      },
      {
        name: "User notifications",
        path: "/usernotifications",
        pro: false,
        icon: <Bell size={20} />,
      },
      {
        name: "User profile url map",
        path: "/userprofileurlmap",
        pro: false,
        icon: <Link2 size={20} />,
      },
      {
        name: "User behavior log table",
        path: "/UserBehaviorLogTable",
        pro: false,
        icon: <Activity size={20} />,
      },
    ],
  },
  {
    name: "LEAD",
    icon: <Briefcase size={20} />,
    subItems: [
      {
        name: "Lead tables",
        path: "/lead_tables",
        pro: false,
        icon: <Table size={20} />,
      },
      {
        name: "Leads property tables",
        path: "/leads_property_table",
        pro: false,
        icon: <LayoutGrid size={20} />,
      },
      {
        name: "Lead activities",
        path: "/lead-activities",
        pro: false,
        icon: <TrendingUp size={20} />,
      },
      {
        name: "Lead assignments",
        path: "/LeadAssignmentTables",
        pro: false,
        icon: <UserPlus size={20} />,
      },
      {
        name: "Lead note",
        path: "/LeadNotesTables",
        pro: false,
        icon: <StickyNote size={20} />,
      },
      {
        name: "Lead property floors",
        path: "/leadPropertyfloors",
        pro: false,
        icon: <Layers size={20} />,
      },
      {
        name: "Leads property rooms",
        path: "/LeadsPropertyRoomsTables",
        pro: false,
        icon: <DoorOpen size={20} />,
      },
      {
        name: "Lead sources",
        path: "/leadsourcestable",
        pro: false,
        icon: <Share2 size={20} />,
      },
      {
        name: "Leads refer partner",
        path: "/leadsReferPartnerTables",
        pro: false,
        icon: <UserCheck size={20} />,
      },
      {
        name: "Leads refer partner activity",
        path: "/leadsReferPartnerActivity",
        pro: false,
        icon: <Workflow size={20} />,
      },
    ],
  },
  {
    name: "COMMON",
    icon: <HelpCircle size={20} />,
    subItems: [
      {
        name: "Common branch postcode",
        path: "/commonbranchpostcode",
        pro: false,
        icon: <MapPin size={20} />,
      },
      {
        name: "Common faq",
        path: "/commonfaq",
        pro: false,
        icon: <HelpCircle size={20} />,
      },
      {
        name: "Common metadata",
        path: "/commonmetadata",
        pro: false,
        icon: <Database size={20} />,
      },
      {
        name: "Common metadata final",
        path: "/common_metadata_final",
        pro: false,
        icon: <CheckCircle2 size={20} />,
      },
    ],
  },
  {
    name: "METADATA",
    icon: <Database size={20} />,
    subItems: [
      {
        name: "Category tables",
        path: "/category-tables",
        pro: false,
        icon: <Tags size={20} />,
      },
      {
        name: "Partner tables",
        path: "/partner-tables",
        pro: false,
        icon: <Handshake size={20} />,
      },
      {
        name: "Service tables",
        path: "/service-tables",
        pro: false,
        icon: <Wrench size={20} />,
      },
    ],
  },
  {
    name: "CAMPAIGN",
    icon: <Megaphone size={20} />,
    subItems: [
      {
        name: "Campaign master",
        path: "/CampaignMaster",
        pro: false,
        icon: <Clipboard size={20} />,
      },
      {
        name: "Campaign email template tables",
        path: "/CampaignEmailTemplateTables",
        pro: false,
        icon: <Mail size={20} />,
      },
      {
        name: "Campaign master participant blacklists",
        path: "/CampaignMasterParticipantBlacklists",
        pro: false,
        icon: <Ban size={20} />,
      },
      {
        name: "Campaign audience master table",
        path: "/CampaignAudienceMasterTable",
        pro: false,
        icon: <UsersRound size={20} />,
      },
    ],
  },
];

const othersItems: TNavItem[] = [
  {
    name: "MART",
    icon: <ShoppingCart size={20} />,
    subItems: [
      {
        name: "Mart potential lead",
        path: "/martpotentiallead",
        pro: false,
        icon: <UserSearch size={20} />,
      },
      {
        name: "Mart potential lead order",
        path: "/mart-potential-lead-orders",
        pro: false,
        icon: <ListChecks size={20} />,
      },
    ],
  },
  {
    name: "POTENTIAL",
    icon: <Lightbulb size={20} />,
    subItems: [
      {
        name: "Potential lead action",
        path: "/potentialLeadActionTable",
        pro: false,
        icon: <PlayCircle size={20} />,
      },
      {
        name: "Potential lead history search",
        path: "/userPotentialLeadHistorySearch",
        pro: false,
        icon: <Search size={20} />,
      },
    ],
  },
  {
    name: "PROPERTY",
    icon: <Home size={20} />,
    subItems: [
      {
        name: "Property room table",
        path: "/PropertyRoomTable",
        pro: false,
        icon: <Bed size={20} />,
      },
      {
        name: "Properties",
        path: "/properties",
        pro: false,
        icon: <Building2 size={20} />,
      },
      {
        name: "Property floors table",
        path: "/PropertyFloorsTable",
        pro: false,
        icon: <Layers size={20} />,
      },
    ],
  },
  {
    name: "OTHER",
    icon: <Menu size={20} />,
    subItems: [
      {
        name: "Api logs",
        path: "/apilogs",
        pro: false,
        icon: <ScrollText size={20} />,
      },
      {
        name: "Entity file mapping",
        path: "/entityfilemapping",
        pro: false,
        icon: <FileStack size={20} />,
      },
      {
        name: "Owners",
        path: "/owner",
        pro: false,
        icon: <UserCheck size={20} />,
      },
      {
        name: "Rentals",
        path: "/rental",
        pro: false,
        icon: <CalendarCheck size={20} />,
      },
      {
        name: "Sf mart leads",
        path: "/sfmartleads",
        pro: false,
        icon: <Radar size={20} />,
      },
    ],
  },
];

const authItems: TNavItem[] = [
  {
    icon: <PlugIcon />,
    name: "AUTHENCATION",
    subItems: [
      { name: "Sign In", path: "/", pro: false, icon: <LogIn /> },
      { name: "Sign Up", path: "/signup", pro: false, icon: <UserPlus2 /> },
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
