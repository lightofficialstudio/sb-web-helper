"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@components/layouts/backend-layout";
import ContentCard from "@components/layouts/backend/content";
import { useTranslation } from "react-i18next";
import LoadingOverlay from "@components/loading/loading-component-1";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@stores/store";
import MinimalButton from "@/components/button/minimal-button-component";
import { CallAPI } from "@/stores/actions/hardware/call-get-register-device";
import Swal from "sweetalert2";
import { SearchableSelectComponent } from "@/components/input-field/searchable-select-component";
import { ResponseCardComponent } from "@/components/card/curl-card-component";
import MethodBadge from "@components/badge/method-badge-component";
import { MinimalRow } from "@components/table/minimal-row-component";
import StatusBadge from "@components/badge/status-badge-component";
import { CallGetRegisterDeviceState } from "@stores/type";
import MinimalTable from "@components/table/minimal-table-component";
import { findSchoolName } from "@helpers/find-school-id";
import { convertTimeZoneToThai } from "@helpers/convert-time-zone-to-thai";
import { InputFieldComponent } from "@components/input-field/input-field-component";
import DatePickerComponent from "@components/input-field/date-picker-component";

const columns = [
  { key: "ID", label: "ID" },
  { key: "DeviceID", label: "รหัสอุปกรณ์ (Device ID)" },
  { key: "NeedToUpdate", label: "สถานะอัพเดทอุปกรณ์" },
  { key: "SchoolID", label: "โรงเรียน" },
  { key: "Tstamp", label: "ออนไลน์ล่าสุดเมื่อ" },
  { key: "UserID", label: "User ID" },
];

type CallGetRegisterDeviceType =
  CallGetRegisterDeviceState["draftValues"]["Array"];

export default function DashboardPage() {
  const { t } = useTranslation("mock");
  const dispatch = useDispatch<AppDispatch>();
  const SCHOOL_LIST_STATE = useAppSelector((state) => state.callSchoolList);
  const REGISTER_DEVICE_STATE = useAppSelector(
    (state) => state.callGetRegisterDevice
  );
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  // filter by selected school
  const isLoading = SCHOOL_LIST_STATE.loading || REGISTER_DEVICE_STATE.loading;
  const [modal, setModal] = useState<string>("");
  const [table, setTable] = useState<CallGetRegisterDeviceType>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [schoolList, setSchoolList] = useState<any[]>([]);
  const [fromDate, setFromDate] = useState<string>(""); // YYYY-MM-DD
  const [toDate, setToDate] = useState<string>("");
  const [deviceIdSearch, setDeviceIdSearch] = useState<string>("");

  const filteredTable = (table ?? [])
    .filter((row) =>
      deviceIdSearch
        ? row.DeviceID.toLowerCase().includes(deviceIdSearch.toLowerCase())
        : true
    )
    .filter((row) =>
      // กรองโรงเรียนเหมือนเดิม
      selectedSchool ? String(row.SchoolID) === selectedSchool : true
    )
    .filter((row) => {
      if (!fromDate && !toDate) return true;
      const ts = new Date(row.Tstamp).getTime();
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
    switch (modal) {
      case "error":
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "กรุณากรอกข้อมูลให้ครบถ้วน",
          confirmButtonText: "OK",
        });
        setModal("");
        break;
      case "success":
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "ยิง API สำเร็จ",
          confirmButtonText: "ยืนยัน",
        });
        setModal("");
        break;
      default:
        break;
    }
  }, [modal]);

  useEffect(() => {
    setSchoolList(
      SCHOOL_LIST_STATE?.response?.data?.data?.map((item: any) => ({
        label: item.SchoolName,
        value: item.SchoolID,
      })) || []
    );
  }, [SCHOOL_LIST_STATE?.response]);

  useEffect(() => {
    dispatch(CallAPI());
  }, []);

  useEffect(() => {
    const data = REGISTER_DEVICE_STATE?.response?.data?.data;
    setTable(data);
    console.log("REGISTER DEVICE", data);
  }, [REGISTER_DEVICE_STATE]);

  const renderTableData = (data: CallGetRegisterDeviceType) =>
    data.map((row, idx) => (
      <MinimalRow key={row.ID ?? idx}>
        {({
          index,
          row,
        }: {
          index: number;
          row: CallGetRegisterDeviceType[number];
        }) => (
          <>
            <td className="p-4 font-medium text-sm text-gray-900">{index}</td>
            <td className="p-4 font-medium text-sm text-gray-900">{row.ID}</td>
            <td className="p-4 font-medium text-sm text-gray-900">
              {row.DeviceID}
            </td>
            <td className="p-4 font-medium text-sm text-gray-900">
              {row.NeedToUpdate ? "อัพเดทแล้ว" : "ยังไม่ได้อัพเดท"}
            </td>
            <td className="p-4 font-medium text-sm text-gray-900">
              {findSchoolName(row.SchoolID, schoolList)} ({row.SchoolID})
            </td>
            <td className="p-4 font-medium text-sm text-gray-900">
              {convertTimeZoneToThai(new Date(row.Tstamp))}
            </td>
            <td className="p-4 font-medium text-sm text-gray-900">
              {row.UserID}
            </td>
          </>
        )}
      </MinimalRow>
    ));

  return (
    <DashboardLayout>
      {isLoading && <LoadingOverlay />}

      <div className="w-full space-y-4">
        {/* บังคับให้ card แรกอยู่เต็มความกว้างใน md และ xl */}

        <ContentCard
          title="ทดสอบการเชื่อมต่อเครื่อง Hardware"
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
                    { label: "ทั้งหมด", value: "" },
                    ...schoolList.map((s) => ({
                      label: s.label,
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
                  value={deviceIdSearch}
                  onChange={(e) => setDeviceIdSearch(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* จากวันที่ */}
              <div>
                <DatePickerComponent
                  label="จากวันที่"
                  value={fromDate}
                  onChange={setFromDate}
                  className="w-full"
                />
              </div>

              {/* ถึงวันที่ */}
              <div>
                <DatePickerComponent
                  label="ถึงวันที่"
                  value={toDate}
                  onChange={setToDate}
                  className="w-full"
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
        <ContentCard title="Tasks" className="xl:col-span-4 w-full">
          <MinimalTable
            isLoading={isLoading}
            header={columns}
            data={filteredTable}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={setRowsPerPage}
          >
            {filteredTable ? renderTableData(filteredTable) : null}
          </MinimalTable>
        </ContentCard>

        {/* หมายเหตุ */}
        <div className="grid grid-cols-2 gap-3 overflow-visible ">
          <ContentCard
            title="หมายเหตุ (1)"
            className="col-span-1 row-span-1 w-full "
          >
            <p className="text-sm text-red-500">
              {t(
                "กรณีที่บัตร NFC ไม่ถูกต้อง หรือไม่พบข้อมูลในระบบ จะมีการแสดงผลลัพธ์เป็น JSON ที่มี status เป็น 'not have number id'"
              )}
            </p>
          </ContentCard>
          <ContentCard
            title="หมายเหตุ (2)"
            className="col-span-1 row-span-1 w-full"
          >
            <p className="text-sm text-red-500">
              {t(
                "กรณีที่ไม่พบข้อมูลใน https://www.canteen.schoolbright.co แต่พบข้อมูลที่นี่ แปลว่าเป็นปัญหาที่ Memory Sharing ของระบบ Canteen Web ให้แจ้ง Vimal"
              )}
            </p>
          </ContentCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
