"use client";
import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@components/layouts/backend-layout";
import ContentCard from "@components/layouts/backend/content";
import { useTranslation } from "react-i18next";
import BaseLoadingComponent from "@components/loading/loading-component-1";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@stores/store";
import MinimalButton from "@/components/button/minimal-button-component";
import { SearchableSelectComponent } from "@/components/input-field/searchable-select-component";
import MinimalTable from "@components/table/minimal-table-component";
import { CallAPI as GET_SCHOOL_LIST_DETAIL } from "@stores/actions/support/call-get-school-list-detail";
import { CallAPI as GET_BYPASS_TOKEN } from "@stores/actions/support/call-get-bypass-token";
import * as type from "@stores/type";
import { Toaster, toast } from "sonner";

const columns: { key: string; label: string }[] = [
  { key: "school_id", label: "รหัสโรงเรียน" },
  { key: "company_name", label: "ชื่อโรงเรียน" },
  { key: "province", label: "จังหวัด" },
  { key: "school_group", label: "กลุ่มโรงเรียน" },
  { key: "school_class", label: "ระดับชั้นที่เปิดสอน" },
  { key: "school_grade", label: "เกรดโรงเรียน" },
  { key: "isActive", label: "สถานะการใช้งาน" },
  { key: "action", label: "เข้าสู่ระบบ" },
];

export default function Page() {
  const { t } = useTranslation("mock");
  const dispatch = useDispatch<AppDispatch>();
  const SCHOOL_LIST_STATE = useAppSelector((state) => state.callSchoolList);
  const SCHOOL_LIST_WITH_DETAIL = useAppSelector(
    (state) => state.callGetSchooListDetail
  );

  const USER = useAppSelector((state) => state.callAdminLogin);

  const [selectedSchool, setSelectedSchool] = useState<string | string[]>("");
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [url, setUrl] = useState<Record<string, string>>({
    prodSystemURL: "https://system.schoolbright.co/BypassSuperAdmin.aspx?q=",
    betaSystemURL: "https://beta.schoolbright.co/BypassSuperAdmin.aspx?q=",
    devSystemURL: "https://dev.schoolbright.co/BypassSuperAdmin.aspx?q=",
    prodCanteenURL: "https://canteen.schoolbright.co/BypassSuperAdmin.aspx?q=",
    devCanteenURL:
      "https://dev-canteen.schoolbright.co/BypassSuperAdmin.aspx?q=",
    prodAcademicURL:
      "https://academic.schoolbright.co/BypassSuperAdmin.aspx?q=",
    devAcademicURL:
      "https://dev-academic.schoolbright.co/BypassSuperAdmin.aspx?q=",
    devUIAcademicURL:
      "https://dev-ui-academic.schoolbright.co/BypassSuperAdmin.aspx?q=",
    devLibraryURL: "https://library-dev.schoolbright.co/Home/ByPass?token=",
    prodLibraryURL: "https://library.schoolbright.co/Home/ByPass?token=",
    prodKindergartenURL:
      "https://kindergarten.schoolbright.co/Home/ByPass?token=",
    devKindergartenURL:
      "https://kindergarten-dev.schoolbright.co/Home/ByPass?token=",
    devActivityURL:
      "https://dev-markactivity.schoolbright.co/Home/ByPass?token=",
    prodActivityURL: "https://markactivity.schoolbright.co/Home/ByPass?token=",
    devAccountingURL:
      "https://dev-accounting.schoolbright.co/Home/ByPass?token=",
    prodAccountingURL: "https://accounting.schoolbright.co/Home/ByPass?token=",
    prodExamURL: "https://exam.schoolbright.co/home/getToken?token=",
  });
  const [bypass, setBypass] = useState<string>("");
  const [mode, setMode] = useState<{
    school_id: string;
    name: string;
    environment: string;
  }>({
    school_id: "",
    name: "",
    environment: "",
  });
  // เปลี่ยน useRef เดิมของ `dropdownRef` ให้รองรับ dropdown หลายอัน
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleOpenByPassLink = async (
    targetUrl: string,
    school_id: string,
    extendPath?: string
  ) => {
    try {
      const isExtendPath = extendPath ? extendPath : "";
      // เปลี่ยนชื่อแปรท้องถิ่นเป็น finalUrl เพื่อไม่ชน state ชื่อ url
      const finalUrl =
        targetUrl + (await getBypassToken(school_id)) + isExtendPath;

      console.log("URL \n", finalUrl);

      // ✅ Toast แจ้งสำเร็จ + ปุ่ม Copy URL + 10 วิ + Bottom Center
      toast.success("Bypass สำเร็จ", {
        description: `คุณกำลังเข้าสู่ ${finalUrl}`,
        duration: 10000,
        position: "top-right",
        action: {
          label: "Copy URL",
          onClick: () => {
            navigator.clipboard.writeText(finalUrl).then(() => {
              toast.success("Copied!", {
                description: "URL copied to clipboard.",
                duration: 3000,
                position: "top-right",
              });
            });
          },
        },
      });

      return window.open(finalUrl, "_blank");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const getBypassToken = async (school_id: string) => {
    try {
      const userEmail = USER?.response?.data?.user_data.email;
      console.log("user", USER);
      const response = await dispatch(
        GET_BYPASS_TOKEN({ school_id: school_id, user_email: userEmail })
      ).unwrap();
      return response?.data?.bypass;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    try {
      switch (mode.name) {
        case "system":
          switch (mode.environment) {
            case "production":
              handleOpenByPassLink(url.prodSystemURL, mode.school_id);
              break;

            case "staging":
              handleOpenByPassLink(url.betaSystemURL, mode.school_id);
              break;

            case "development":
              handleOpenByPassLink(url.devSystemURL, mode.school_id);
              break;
          }
          break;
        case "academic":
          switch (mode.environment) {
            case "production":
              handleOpenByPassLink(url.prodAcademicURL, mode.school_id);
              break;

            case "development":
              handleOpenByPassLink(url.devAcademicURL, mode.school_id);
              break;

            case "ui":
              handleOpenByPassLink(url.devUIAcademicURL, mode.school_id);
              break;
          }
          break;
        case "library":
          switch (mode.environment) {
            case "production":
              handleOpenByPassLink(url.prodLibraryURL, mode.school_id);
              break;

            case "development":
              handleOpenByPassLink(url.devLibraryURL, mode.school_id);
              break;
          }
          break;
        case "accounting":
          switch (mode.environment) {
            case "production":
              handleOpenByPassLink(url.prodAccountingURL, mode.school_id);
              break;

            case "development":
              handleOpenByPassLink(url.devAccountingURL, mode.school_id);
              break;
          }
          break;
        case "canteen":
          switch (mode.environment) {
            case "production":
              handleOpenByPassLink(url.prodCanteenURL, mode.school_id);
              break;

            case "development":
              handleOpenByPassLink(url.devCanteenURL, mode.school_id);
              break;
          }
          break;
        case "kindergarten":
          switch (mode.environment) {
            case "production":
              handleOpenByPassLink(url.prodKindergartenURL, mode.school_id);
              break;

            case "development":
              handleOpenByPassLink(url.devKindergartenURL, mode.school_id);
              break;
          }
          break;
        case "activity":
          switch (mode.environment) {
            case "production":
              handleOpenByPassLink(
                url.prodActivityURL,
                mode.school_id,
                "&page=ActivityManagement"
              );
              break;

            case "development":
              handleOpenByPassLink(
                url.devActivityURL,
                mode.school_id,
                "&page=ActivityManagement"
              );
              break;
          }
          break;
        case "exam":
          switch (mode.environment) {
            case "production":
              handleOpenByPassLink(url.prodExamURL, mode.school_id);
              break;

            case "development":
              handleOpenByPassLink(url.devExamURL, mode.school_id);
              break;
          }
          break;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, [mode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen !== null) {
        const ref = dropdownRefs.current[dropdownOpen];
        if (ref && !ref.contains(event.target as Node)) {
          setTimeout(() => {
            setDropdownOpen(null);
          }, 350);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const data = SCHOOL_LIST_WITH_DETAIL?.response?.data?.data ?? [];
    const filtered = selectedSchool
      ? data.filter((d) => String(d.school_id) === selectedSchool)
      : data;
    setTable(filtered);
  }, [selectedSchool, SCHOOL_LIST_WITH_DETAIL]);
  const [table, setTable] = useState<
    type.ResponseSchoolListWithMoreDetail["data"]["data"]
  >([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [schoolList, setSchoolList] = useState<any[]>([]);
  const isLoading = [
    SCHOOL_LIST_STATE.loading,
    SCHOOL_LIST_WITH_DETAIL.loading,
  ].some(Boolean);

  useEffect(() => {
    setSchoolList(
      SCHOOL_LIST_STATE?.response?.data?.data?.map((item: any) => ({
        label: item.SchoolName,
        value: item.SchoolID,
      })) || []
    );
  }, [SCHOOL_LIST_STATE?.response]);

  useEffect(() => {
    dispatch(GET_SCHOOL_LIST_DETAIL());
  }, []);

  useEffect(() => {
    const data = SCHOOL_LIST_WITH_DETAIL?.response?.data?.data ?? [];
    const filtered = selectedSchool
      ? data.filter((d) => String(d.school_id) === selectedSchool)
      : data;
    setTable(filtered);
  }, [SCHOOL_LIST_WITH_DETAIL]);

  return (
    <DashboardLayout>
      {isLoading && <BaseLoadingComponent />}

      <div className="w-full space-y-4">
        {/* บังคับให้ card แรกอยู่เต็มความกว้างใน md และ xl */}

        <ContentCard
          title="ตารางแสดงรายละเอียดโรงเรียน"
          fullWidth
          className="md:col-span-2 xl:col-span-4 w-full "
        >
          {/* -- ใน <ContentCard> ส่วนฟอร์ม -- */}
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* เลือกโรงเรียน */}
              <div className="flex-1">
                <SearchableSelectComponent
                  label="เลือกโรงเรียน"
                  options={[
                    { label: "เลือกรายการ", value: "" },
                    ...schoolList.map((s) => ({
                      label: s.label + " (" + s.value + ")",
                      value: String(s.value),
                    })),
                  ]}
                  value={selectedSchool}
                  onChange={setSelectedSchool}
                  placeholder="เลือกโรงเรียน"
                />
              </div>
            </div>
          </form>
        </ContentCard>

        {/* Reponse From Server */}
        {/* <ResponseCardComponent
          responseData={SCHOOL_LIST_STATE.response.data?.data}
          curlCommand={SCHOOL_LIST_STATE.response.data?.curl}
        /> */}

        {/* ตาราง */}
        <ContentCard
          title="ตารางแสดงรายละเอียดโรงเรียน"
          className="xl:col-span-4 w-full"
        >
          <MinimalTable
            isLoading={isLoading}
            header={columns}
            data={table}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={setRowsPerPage}
            rowRenderer={(row, idx) => (
              <tr key={idx}>
                <td className="p-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {idx + 1}
                </td>
                <td className="p-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {row.school_id}
                </td>

                <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
                  <span className="font-semibold">{row.company_name}</span>
                </td>

                <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
                  {row.province}
                </td>

                <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
                  {row.school_group || "-"}
                </td>
                <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
                  {row.school_class || "-"}
                </td>
                <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full transition-all duration-500
                      ${
                        row.school_grade === "A"
                          ? "bg-green-200 text-green-900 dark:bg-green-700 dark:text-green-100 animate-pulse"
                          : row.school_grade === "B"
                          ? "bg-blue-200 text-blue-900 dark:bg-blue-700 dark:text-blue-100 animate-pulse"
                          : row.school_grade === "C"
                          ? "bg-yellow-200 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-100 animate-pulse"
                          : row.school_grade === "D"
                          ? "bg-orange-200 text-orange-900 dark:bg-orange-700 dark:text-orange-100 animate-pulse"
                          : row.school_grade === "E"
                          ? "bg-red-200 text-red-900 dark:bg-red-700 dark:text-red-100 animate-pulse"
                          : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                  >
                    {row.school_grade ?? "No Grade"}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      row.isActive === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200"
                    }`}
                  >
                    {row.isActive}
                  </span>
                </td>

                <td className="p-4 relative">
                  <div
                    ref={(el) => {
                      dropdownRefs.current[idx] = el;
                    }}
                    className="relative inline-block text-left"
                  >
                    <MinimalButton
                      className="relative px-4 py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded shadow-lg text-xs font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95"
                      onClick={() => setDropdownOpen(idx)}
                    >
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded transition-opacity duration-300" />
                      เลือกเซิฟเวอร์
                    </MinimalButton>

                    <div
                      className={`absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ease-in-out transform ${
                        dropdownOpen === idx
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95"
                      }`}
                      style={{
                        pointerEvents: dropdownOpen === idx ? "auto" : "none",
                      }}
                    >
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-100">
                        <li className="group relative px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer bg-blue-100 dark:bg-blue-900/60">
                          ✨ System
                          <ul className="absolute right-[13rem] top-0 ml-1 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg hidden group-hover:block transition-all duration-300">
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "system",
                                  environment: "production",
                                });
                              }}
                            >
                              Production
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "system",
                                  environment: "staging",
                                });
                              }}
                            >
                              Beta
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "system",
                                  environment: "development",
                                });
                              }}
                            >
                              Dev
                            </li>
                          </ul>
                        </li>
                        <li className="group relative px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer bg-green-100 dark:bg-green-900/60">
                          👩🏻‍🏫 Academic
                          <ul className="absolute right-[13rem] top-0 ml-1 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg hidden group-hover:block transition-all duration-300">
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "academic",
                                  environment: "production",
                                });
                              }}
                            >
                              Production
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "academic",
                                  environment: "development",
                                });
                              }}
                            >
                              Dev
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "academic",
                                  environment: "ui",
                                });
                              }}
                            >
                              Dev UI
                            </li>
                          </ul>
                        </li>
                        <li className="group relative px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer bg-fuchsia-100 dark:bg-fuchsia-900/60">
                          🧾 Accounting
                          <ul className="absolute right-[13rem] top-0 ml-1 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg hidden group-hover:block transition-all duration-300">
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "accounting",
                                  environment: "production",
                                });
                              }}
                            >
                              Production
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "accounting",
                                  environment: "development",
                                });
                              }}
                            >
                              Dev
                            </li>
                          </ul>
                        </li>
                        <li className="group relative px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer bg-yellow-100 dark:bg-yellow-900/60">
                          📔 Library
                          <ul className="absolute right-[13rem] top-0 ml-1 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg hidden group-hover:block transition-all duration-300">
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "library",
                                  environment: "production",
                                });
                              }}
                            >
                              Production
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "library",
                                  environment: "development",
                                });
                              }}
                            >
                              Dev
                            </li>
                          </ul>
                        </li>
                        <li className="group relative px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer bg-purple-100 dark:bg-purple-900/60">
                          🥪 Canteen
                          <ul className="absolute right-full top-0 mส-1 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg hidden group-hover:block transition-all duration-300">
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "canteen",
                                  environment: "production",
                                });
                              }}
                            >
                              Production
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "canteen",
                                  environment: "development",
                                });
                              }}
                            >
                              Dev
                            </li>
                          </ul>
                        </li>
                        <li className="group relative px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer bg-orange-100 dark:bg-orange-900/60">
                          👶🏻 Kindergarten
                          <ul className="absolute right-full top-0 ml-1 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg hidden group-hover:block transition-all duration-300">
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "kindergarten",
                                  environment: "production",
                                });
                              }}
                            >
                              Production
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "kindergarten",
                                  environment: "development",
                                });
                              }}
                            >
                              Dev
                            </li>
                          </ul>
                        </li>
                        <li className="group relative px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer bg-amber-100 dark:bg-amber-900/60">
                          🎃 Mark Activity
                          <ul className="absolute right-full top-0 ml-1 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg hidden group-hover:block transition-all duration-300">
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "activity",
                                  environment: "production",
                                });
                              }}
                            >
                              Production
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "activity",
                                  environment: "development",
                                });
                              }}
                            >
                              Dev
                            </li>
                          </ul>
                        </li>
                        <li className="group relative px-4 py-2 hover:bg-sky-400 dark:hover:bg-gray-400 cursor-pointer bg-sky-100 dark:bg-sky-900/60">
                          🚀 SB Exam
                          <ul className="absolute right-full top-0 mr-1 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg hidden group-hover:block transition-all duration-300">
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "exam",
                                  environment: "production",
                                });
                              }}
                            >
                              Production
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                              onClick={() => {
                                setMode({
                                  school_id: row?.school_id ?? "",
                                  name: "exam",
                                  environment: "development",
                                });
                              }}
                            >
                              Dev
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            children={undefined}
          />
        </ContentCard>
      </div>
    </DashboardLayout>
  );
}
