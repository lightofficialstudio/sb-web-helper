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

export default function DashboardPage() {
  const { t } = useTranslation("mock");
  const dispatch = useDispatch<AppDispatch>();
  const SCHOOLstate = useAppSelector((state) => state.callSchoolList);

  const [show, setShow] = useState("");

  const isLoading = SCHOOLstate.loading;
  const [modal, setModal] = useState<string>("");
  const [schoolList, setSchoolList] = useState<any[]>([]);

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
      SCHOOLstate?.response?.data?.data?.map((item: any) => ({
        label: item.SchoolName,
        value: item.SchoolID,
      })) || []
    );
  }, [SCHOOLstate?.response]);

  useEffect(() => {
    dispatch(CallAPI());
  }, []);

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
          <form className="space-y-4">
            <div className="flex">
              <SearchableSelectComponent
                label="เลือกโรงเรียน"
                options={[
                  { label: "Select Option", value: "" },
                  ...schoolList.map((school) => ({
                    label: school.label + " (" + school.value + ")",
                    value: school.value,
                  })),
                ]}
                value={show}
                onChange={(val) => {
                  // setFormState({ ...formState, school_id: val });
                  setShow(val);
                }}
                placeholder="เลือกโรงเรียน"
              />
            </div>
          </form>
        </ContentCard>

        {/* Reponse From Server */}
        {/* <ResponseCardComponent
          responseData={SCHOOLstate.response.data?.data}
          curlCommand={SCHOOLstate.response.data?.curl}
        /> */}

        {/* หมายเหตุ */}
        <div className="grid grid-cols-2 gap-3 overflow-visible">
          <ContentCard
            allowOverflow
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
            allowOverflow
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
