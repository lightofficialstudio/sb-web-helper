"use client";

import { menu } from "@/constants/sidebar-menu-constant";
import {
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SidebarContent() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    menu.forEach((item) => {
      if (item.children?.some((child) => child.href === pathname)) {
        setOpenKey(item.label);
      }
    });
  }, [pathname]);

  return (
    <div
      className="flex flex-col h-full justify-between text-sm font-medium transition-all duration-500 ease-in-out
        animate-fade-in-down overflow-visible"
    >
      <div>
        <div className="mb-6 text-2xl font-extrabold text-[#ff7b00] dark:text-orange-400">
          HELPER
        </div>

        <nav className="space-y-2">
          {menu.map((item) => {
            if (item.children) {
              const isOpen = openKey === item.label;
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenKey(isOpen ? null : item.label)}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-left text-gray-700 dark:text-gray-200 hover:ring-2 hover:ring-orange-300 dark:hover:ring-orange-500 transition"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    {isOpen ? (
                      <IoIosArrowUp className="text-sm text-gray-500" />
                    ) : (
                      <IoIosArrowDown className="text-sm text-gray-500" />
                    )}
                  </button>

                  <div
                    className={`
                      ml-8 mt-2 flex flex-col space-y-1 overflow-hidden transition-[max-height,opacity] duration-300
                      ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}
                    `}
                  >
                    {item.children.map((child) => {
                      const isActive = child.href === pathname;
                      return (
                        <Link
                          href={child.href!}
                          key={child.label}
                          className={`
                            flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-colors duration-200
                            ${
                              isActive
                                ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }
                            ${
                              isActive
                                ? "border-l-4 border-orange-500 pl-3"
                                : ""
                            }
                          `}
                        >
                          <span
                            className={`
                              w-2 h-2 rounded-full flex-shrink-0
                              ${isActive ? "bg-orange-500" : "bg-orange-300"}
                            `}
                          />
                          <span className="flex-1">{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            } else {
              return (
                <Link
                  href={item.href || "#"}
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-colors hover:ring-2 hover:ring-orange-300 dark:hover:ring-orange-500 ${
                    item.href === pathname
                      ? "bg-black text-white dark:bg-orange-500"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.tag && (
                    <span className="text-[10px] bg-purple-500 text-white px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  )}
                </Link>
              );
            }
          })}
        </nav>
      </div>

      {/* AI Assistant Card */}
      <div className="hidden mt-8 p-4 bg-purple-100 dark:bg-purple-900 rounded-2xl text-sm relative overflow-hidden text-gray-700 dark:text-gray-200">
        <h3 className="font-bold mb-1">AI Assistant</h3>
        <p className="text-xs mb-2">
          Technology that helps people complete tasks faster and more
          efficiently.
        </p>
        <div className="absolute -bottom-3 -left-3 transform rotate-12 text-purple-400 text-5xl opacity-20">
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
}
