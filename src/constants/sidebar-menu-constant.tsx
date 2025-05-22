import {
  FiGrid,
  FiClock,
  FiActivity,
  FiBarChart2,
  FiUsers,
  FiFileText,
  FiSettings,
} from "react-icons/fi";
import { FaRegLightbulb } from "react-icons/fa6";

interface MenuItem {
  label: string;
  icon?: JSX.Element;
  href?: string;
  tag?: string;
  children?: MenuItem[];
}

export const menu: MenuItem[] = [
  {
    label: "Testing",
    icon: <FiGrid />,
    children: [
      { label: "Automated Testing", href: "/testing/auto" },
      { label: "Load Testing", href: "/testing/load" },
    ],
  },
  {
    label: "Support",
    icon: <FaRegLightbulb />,
    children: [
      { label: "ทดสอบค้นหาบัตร NFC (Vimal)", href: "/support/test/nfc" },
      {
        label: "ยกเลิกรายการสินค้าเกิน 7 วัน",
        href: "/support/test/cancel-sales",
      },
    ],
  },
  //   { label: "Timesheets", icon: <FiClock />, href: "/timesheets" },
  //   { label: "Activity", icon: <FiActivity />, href: "/activity" },
  //   {
  //     label: "Insights",
  //     icon: <FaRegLightbulb />,
  //     tag: "New",
  //     href: "/insights",
  //   },
  //   {
  //     label: "Management",
  //     icon: <FiUsers />,
  //     children: [
  //       { label: "Employees", href: "/management/employees" },
  //       { label: "Attendance", href: "/management/attendance" },
  //       { label: "Leave Requests", href: "/management/leave-requests" },
  //     ],
  //   },
  //   { label: "Reports", icon: <FiFileText />, href: "/reports" },
  //   { label: "Teams", icon: <FiUsers />, href: "/teams" },
  //   { label: "Settings", icon: <FiSettings />, href: "/settings" },
];
