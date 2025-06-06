"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DashboardLayout from "@components/layouts/backend-layout";
import ContentCard from "@components/layouts/backend/content";
import { useTranslation } from "react-i18next";
import BaseLoadingComponent from "@components/loading/loading-component-1";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@stores/store";
import MinimalButton from "@/components/button/minimal-button-component";
import Swal from "sweetalert2";
import { SearchableSelectComponent } from "@/components/input-field/searchable-select-component";
import { MinimalRow } from "@components/table/minimal-row-component";
import MinimalTable from "@components/table/minimal-table-component";
import { findSchoolName } from "@helpers/find-school-id";
import { convertTimeZoneToThai } from "@helpers/convert-time-zone-to-thai";
import { InputFieldComponent } from "@components/input-field/input-field-component";
import {
  FiArrowLeft,
  FiArrowRight,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";
import { isOnline } from "@helpers/check-online-device-status";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  ResponseGetServerStatus,
  CancelSalesState,
  ResponseSchoolList,
  ResponseUserList,
  ResponseNotification,
} from "@/stores/type";
import MinimalModal from "@components/modal/minimal-modal-component";
import {
  getNotificationRead,
  getNotificationType,
} from "@helpers/get-notification-type";
import { CallAPI as GET_SERVER_STATUS } from "@stores/actions/server/call-get-server-status";
import { CallAPI as GET_USER_BY_SCHOOLID } from "@stores/actions/school/call-get-user";
import { CallAPI as GET_NOTIFICATION } from "@stores/actions/mobile/call-get-notification";

const columns: { key: string; label: string }[] = [
  { key: "nMessageID", label: "รหัสข้อความ (ID)" },
  { key: "dSend", label: "วันที่ส่งข้อความ" },
  { key: "nType", label: "ประเภทข้อความ" },
  { key: "nStatus", label: "สถานะการอ่าน" },
  { key: "sTitle", label: "หัวข้อ" },
  { key: "sMessage", label: "ข้อความ" },
  { key: "logo", label: "โลโก้" },
  { key: "action", label: "การกระทำ" },
];

export default function Page() {
  const { t } = useTranslation("mock");
  const dispatch = useDispatch<AppDispatch>();
  const SCHOOL_LIST_STATE = useAppSelector((state) => state.callSchoolList);

  const USER_LIST_STATE = useAppSelector(
    (state) => state.callGetuserBySchoolId
  );

  const NOTIFICATION_STATE = useAppSelector(
    (state) => state.callGetNotification
  );

  const [selectedSchool, setSelectedSchool] = useState<string>("");
  // filter by selected school
  const isLoading = [
    SCHOOL_LIST_STATE.loading,
    USER_LIST_STATE.loading,
    NOTIFICATION_STATE.loading,
  ].some(Boolean);
  const [table, setTable] = useState<ResponseNotification[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [schoolList, setSchoolList] = useState<any[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [deviceIdSearch, setDeviceIdSearch] = useState<string>("");
  const [modal, setModal] = useState<string>("");
  const [selectedRow, setSelectedRow] = useState<ResponseNotification>();
  const [form, setForm] = useState<{
    schoolID: string;
    userID: string;
  }>({ schoolID: "", userID: "" });
  const [page, setPage] = useState<number>(1);

  const filteredTable = (table ?? []).filter((row) => {
    if (!fromDate && !toDate) return true;
    const ts = new Date(row.dSend).getTime();
    const fromTs = fromDate ? new Date(fromDate).getTime() : -Infinity;
    // วันสุดท้าย ให้ตีเป็นเที่ยงคืนถัดไป เพื่อรวมทั้งวัน
    const toTs = toDate
      ? new Date(
          new Date(toDate).setDate(new Date(toDate).getDate() + 1)
        ).getTime()
      : Infinity;
    return ts >= fromTs && ts < toTs;
  });

  useEffect(() => {
    setSchoolList(
      SCHOOL_LIST_STATE?.response?.data?.data?.map((item: any) => ({
        label: item.SchoolName,
        value: item.SchoolID,
      })) || []
    );
  }, [SCHOOL_LIST_STATE?.response]);

  useEffect(() => {
    getUserBySchoolId(form.schoolID);
  }, [form.schoolID]);

  useEffect(() => {
    if (page != 1) {
      handleSubmitForm(page);
    }
  }, [page]);

  useEffect(() => {
    if (page != 1 && table.length < 1) {
      Swal.fire({
        title: "ไม่พบข้อมูล",
      });
    }
  }, [table]);

  const getUserBySchoolId = async (schoolId: string) => {
    try {
      const response = await dispatch(GET_USER_BY_SCHOOLID({ schoolId }));
      await setUserList(
        response?.payload?.data?.map(
          (item: ResponseUserList["draftValues"]) => ({
            label: `${item?.Name} \t ${item?.LastName}\t(ID : ${item?.UserID} Username : ${item?.username})`,
            value: item?.UserID,
          })
        )
      );
      console.log(response);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const handleSubmitForm = async (page?: number) => {
    try {
      const response = await dispatch(
        GET_NOTIFICATION({
          user_id: form.userID,
          page: page?.toString() ?? "1",
        })
      ).unwrap();
      console.log("RESPONSE", response);
      setTable(response?.data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const renderTableData = (data: ResponseNotification[]) =>
    data.map((row, idx) => (
      <MinimalRow key={idx}>
        {({ index, row }: { index: number; row: ResponseNotification }) => (
          <>
            <td className="p-4 font-medium text-sm text-gray-900 dark:text-white">
              {index}
            </td>
            <td className="p-4 font-medium text-sm text-gray-900">
              {row.nMessageID}
            </td>
            <td className="p-4 font-medium text-sm text-gray-900">
              {convertTimeZoneToThai(new Date(row.dSend))}
            </td>
            <td className="p-4 font-medium text-sm text-gray-900">
              {getNotificationType(row.nType)}
            </td>
            <td className="p-4 font-medium text-sm text-gray-900">
              {getNotificationRead(row.nStatus)}
            </td>
            <td className="p-4 font-medium text-sm text-gray-900">
              {row.sTitle}
            </td>
            <td className="p-4 font-medium text-sm text-gray-900">
              {row.sMessage}
            </td>
            <td className="p-4 font-medium text-sm text-gray-900">
              {row.logo ? (
                <Image
                  src={row.logo}
                  alt="Notification Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </td>
            <td className="p-4 font-medium text-sm text-gray-900">
              {/* CURL */}
              <MinimalButton
                className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => {
                  console.log(
                    "NOTIFICATION STATE",
                    NOTIFICATION_STATE?.response?.data?.curl
                  );
                  const curlCommand = NOTIFICATION_STATE?.response?.data?.curl;
                  navigator.clipboard.writeText(curlCommand.toString());
                  Swal.fire({
                    icon: "success",
                    title: "Copied!",
                    text: "Copy CURL to clipboard.",
                    confirmButtonText: "OK",
                  });
                }}
              >
                Copy CURL
              </MinimalButton>
            </td>
          </>
        )}
      </MinimalRow>
    ));

  const renderModal = () => (
    <MinimalModal title="รายละเอียดเซิร์ฟเวอร์" onClose={() => setModal("")}>
      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-sm">
        {JSON.stringify(selectedRow, null, 2)}
      </pre>
    </MinimalModal>
  );

  return (
    <DashboardLayout>
      {isLoading && <BaseLoadingComponent />}
      {modal === "response_open" && renderModal()}

      <div className="w-full space-y-4">
        {/* หมายเหตุ */}
        <div className="grid grid-cols-1 grid-rows-1 gap-0 w-full">
          <div className="space-y-3 w-full grid-cols-2">
            <ContentCard
              title="ค้นหาการแจ้งเตือนในแอพ"
              fullWidth
              className="w-full"
            >
              {/* ห่อสองช่องด้วย grid จริง ๆ */}
              <div className="grid grid-cols-2 gap-4 w-full">
                {/* กรอก School Id */}
                <div>
                  <SearchableSelectComponent
                    label="เลือกโรงเรียน"
                    options={[
                      { label: "เลือกรายการ", value: "" },
                      ...schoolList.map((s) => ({
                        label: s.label + " (" + s.value + ")",
                        value: String(s.value),
                      })),
                    ]}
                    value={form.schoolID}
                    onChange={(event: any) => {
                      setForm({ ...form, schoolID: event });
                    }}
                    placeholder="เลือกโรงเรียน"
                  />
                </div>

                {/* กรอกรหัส User ID  */}
                <div>
                  <SearchableSelectComponent
                    label="กรอกรหัส User ID ที่ต้องการค้นหา"
                    options={[
                      { label: "เลือกรายการ", value: "" },
                      ...(userList ?? []).map((s) => ({
                        label: s.label,
                        value: String(s.value),
                      })),
                    ]}
                    value={form.userID}
                    onChange={(event: any) => {
                      setForm({ ...form, userID: event });
                    }}
                    placeholder="กรอกรหัส User ID"
                  />
                </div>

                <div></div>

                <div className="flex justify-end w-full">
                  <MinimalButton
                    type="button"
                    textSize="base"
                    className={` ${
                      form?.userID
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-300"
                    }`}
                    isLoading={isLoading}
                    disabled={!form?.userID}
                    onClick={async () => {
                      setPage(1);
                      await handleSubmitForm(1);
                    }}
                  >
                    ค้นหา
                  </MinimalButton>
                </div>
              </div>
            </ContentCard>
          </div>
        </div>

        <ContentCard
          title="รายงานการทำงานทุกระบบ"
          fullWidth
          className="md:col-span-2 xl:col-span-4 w-full hidden"
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

              {/* ค้นหา Device ID */}
              <div>
                <InputFieldComponent
                  label="ค้นหา Device ID"
                  placeholder="พิมพ์ Device ID"
                  icon={
                    <FiSearch className="text-gray-400 dark:text-gray-500" />
                  }
                  value={deviceIdSearch}
                  onChange={(e) => setDeviceIdSearch(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* จากวันที่ */}
              {/* <div>
                <DatePickerComponent
                  label="จากวันที่"
                  value={fromDate}
                  onChange={setFromDate}
                  className="w-full"
                />
              </div> */}

              {/* ถึงวันที่ */}
              {/* <div>
                <DatePickerComponent
                  label="ถึงวันที่"
                  value={toDate}
                  onChange={setToDate}
                  className="w-full"
                />
              </div> */}
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
          title="ตารางแสดงข้อความแจ้งเตือน"
          className="xl:col-span-4 w-full"
          hidden={table?.length < 1}
          isLoading={isLoading}
        >
          <MinimalTable
            isLoading={isLoading}
            header={columns}
            data={filteredTable}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={setRowsPerPage}
            hiddenProps={true}
          >
            {filteredTable ? renderTableData(filteredTable) : null}
          </MinimalTable>
          <div className="flex justify-between">
            <MinimalButton
              type="submit"
              textSize="base"
              className="bg-sky-500 hover:bg-sky-700 w-10 justify-center"
              isLoading={isLoading}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <FiArrowLeft />
            </MinimalButton>
            <MinimalButton
              type="submit"
              textSize="base"
              className="bg-sky-500 hover:bg-sky-700 w-10 justify-center "
              isLoading={isLoading}
              onClick={() => {
                setPage(page + 1);
              }}
            >
              <FiArrowRight />
            </MinimalButton>
          </div>
        </ContentCard>
      </div>
    </DashboardLayout>
  );
}
