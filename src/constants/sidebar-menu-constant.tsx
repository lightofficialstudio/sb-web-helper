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


export const menu = [
    { label: "ทดสอบ", icon: <FiGrid />, href: "/dashboard", active: true },
    { label: "Timesheets", icon: <FiClock />, href: "/timesheets" },
    { label: "Activity", icon: <FiActivity />, href: "/activity" },
    { label: "Insights", icon: <FaRegLightbulb />, tag: "New", href: "/insights" },
    {
        label: "Management",
        icon: <FiUsers />,
        children: [
            { label: "Employees", href: "/management/employees" },
            { label: "Attendance", href: "/management/attendance" },
            { label: "Leave Requests", href: "/management/leave-requests" },
        ],
    },
    { label: "Reports", icon: <FiFileText />, href: "/reports" },
    { label: "Teams", icon: <FiUsers />, href: "/teams" },
    { label: "Settings", icon: <FiSettings />, href: "/settings" },
];
