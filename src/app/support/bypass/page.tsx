"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@components/layouts/backend-layout";
import ContentCard from "@components/layouts/backend/content";
import { useTranslation } from "react-i18next";
import BaseLoadingComponent from "@components/loading/loading-component-1";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@stores/store";
import MinimalButton from "@/components/button/minimal-button-component";
import { SearchableSelectComponent } from "@/components/input-field/searchable-select-component";
import { MinimalRow } from "@components/table/minimal-row-component";
import MinimalTable from "@components/table/minimal-table-component";
import { CallAPI as GET_SCHOOL_LIST_DETAIL } from "@stores/actions/support/call-get-school-list-detail";
import * as type from "@stores/type";

const columns: { key: string; label: string }[] = [
  { key: "school_id", label: "รหัสโรงเรียน" },
  { key: "school_code", label: "รหัสสถานศึกษา" },
  { key: "company_name", label: "ชื่อโรงเรียน" },
  { key: "school_type", label: "ประเภทระบบ" },
  { key: "SchoolTypes", label: "ประเภทโรงเรียน" },
  { key: "province", label: "จังหวัด" },
  { key: "PROVINCE_NAME", label: "ชื่อจังหวัด (เต็ม)" },
  { key: "school_group", label: "กลุ่มโรงเรียน" },
  { key: "school_class", label: "ระดับชั้นที่เปิดสอน" },
  { key: "school_grade", label: "เกรดโรงเรียน" },
  { key: "isActive", label: "สถานะการใช้งาน" },
  { key: "active_date", label: "วันที่เริ่มใช้งาน" },
  { key: "sale_name", label: "ผู้ดูแลการขาย" },
  { key: "support_name", label: "ผู้ดูแลระบบ/ซัพพอร์ต" },
  { key: "action", label: "การกระทำ" }, // เช่น ปุ่มแก้ไข ลบ ฯลฯ
];

export default function Page() {
  const { t } = useTranslation("mock");
  const dispatch = useDispatch<AppDispatch>();
  const SCHOOL_LIST_STATE = useAppSelector((state) => state.callSchoolList);
  const SCHOOL_LIST_WITH_DETAIL = useAppSelector(
    (state) => state.callGetSchooListDetail
  );

  const [selectedSchool, setSelectedSchool] = useState<string>("");
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
    setTable(data);
  }, [SCHOOL_LIST_WITH_DETAIL]);

  const renderTableData = (
    data: type.ResponseSchoolListWithMoreDetail["data"]["data"]
  ) =>
    data.map((row, idx) => (
      <MinimalRow key={idx}>
        {() => (
          <>
            <td className="p-4 text-sm font-medium text-gray-900 dark:text-gray-100">
              {row.school_id}
            </td>
            <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
              {row.school_code}
            </td>
            <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
              <span className="font-semibold">{row.company_name}</span>
            </td>
            <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {row.school_pass}
              </code>
            </td>
            <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
              <span className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-200 px-3 py-1 rounded-full text-xs">
                {row.school_type}
              </span>
            </td>
            <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
              <span className="inline-block bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-200 px-3 py-1 rounded-full text-xs">
                {row.SchoolTypes}
              </span>
            </td>
            <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
              {row.province}
            </td>
            <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
              {row.PROVINCE_NAME}
            </td>
            <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
              {row.school_group || "-"}
            </td>
            <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
              {row.school_class || "-"}
            </td>
            <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
              <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-xs">
                {row.school_grade}
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
            <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
              {row.active_date}
            </td>
            <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
              {row.sale_name || "-"}
            </td>
            <td className="p-4 text-sm text-gray-700 dark:text-gray-200">
              {row.support_name || "-"}
            </td>
            <td className="p-4">
              <MinimalButton
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                onClick={() => {}}
              >
                แก้ไข
              </MinimalButton>
            </td>
          </>
        )}
      </MinimalRow>
    ));

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
          >
            {table ? renderTableData(table) : null}
          </MinimalTable>
        </ContentCard>
      </div>
    </DashboardLayout>
  );
}
