"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@components/layouts/backend-layout";
import ContentCard from "@components/layouts/backend/content";
import { useTranslation } from "react-i18next";
import LoadingOverlay from "@components/loading/loading-component-1";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@stores/store";
import { InputFieldComponent } from "@/components/input-field/input-field-component";
import MinimalButton from "@/components/button/minimal-button-component";
import { FiCreditCard, FiHome, FiUser } from "react-icons/fi";
import { CallAPI } from "@/stores/actions/call-cancel-sales";
import Swal from "sweetalert2";
import { CancelSalesState } from "@stores/type";

export default function Page() {
  const { t } = useTranslation("mock");
  const dispatch = useDispatch<AppDispatch>();
  const ReduxStateCancelSales = useAppSelector(
    (state) => state.callCancelSales
  );
  const [formState, setFormState] = useState<CancelSalesState["draftValues"]>({
    SchoolID: "",
    sID: "",
    sID2: "",
    sSellID: "",
  });
  const isLoading = ReduxStateCancelSales.loading;
  const [modal, setModal] = useState<string>("");

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

  // #region : State
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { SchoolID, sID, sID2, sSellID } = formState;
    if (
      SchoolID.length < 1 ||
      sID.length < 1 ||
      sID2.length < 1 ||
      sSellID.length < 1
    ) {
      return setModal("error");
    }
    try {
      await dispatch(
        CallAPI({
          draftValues: formState,
        })
      ).unwrap(); // <== ดึงผลลัพธ์ออก หรือ throw error
      setModal("success");
    } catch (error: any) {
      console.error("API error:", error);

      // คุณสามารถแสดง error จาก response จริงได้ เช่น message
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message || "ไม่สามารถดำเนินการได้",
        confirmButtonText: "ตกลง",
      });
    }
  };

  // #endregion

  return (
    <DashboardLayout>
      {isLoading && <LoadingOverlay />}

      <div className="w-full space-y-4">
        <ContentCard
          title="Cancel Sales เกิน 7 วัน"
          fullWidth
          className="md:col-span-2 xl:col-span-4 w-full"
        >
          <form onSubmit={handleSubmitForm} className="space-y-4">
            {/* กรอก School Id */}
            <InputFieldComponent
              label="กรอกรหัสโรงเรียน"
              type="text"
              required
              icon={<FiHome />}
              value={formState.SchoolID}
              onChange={(e) =>
                setFormState({ ...formState, SchoolID: e.target.value })
              }
              error={
                formState?.SchoolID.length < 1 ? "กรุณากรอกรหัสโรงเรียน" : ""
              }
              hint="รหัสโรงเรียน หาได้จาก https://adminsystem.schoolbright.co/"
              placeholder="กรุณากรอกรหัสโรงเรียน"
            />
            {/* Input NFC Card */}
            <InputFieldComponent
              label="กรอกรหัส User ID (ของผู้ซื้อสินค้า)"
              type="text"
              required
              icon={<FiUser />}
              value={formState?.sID}
              onChange={(e) =>
                setFormState({ ...formState, sID: e.target.value })
              }
              error={formState.sID.length < 1 ? "กรุณากรอกรหัส User ID" : ""}
              hint="รหัส User ID (ของผู้ซื้อสินค้า) หาได้จาก Bypass Admin โรงเรียนนั้น ๆ"
              placeholder="กรุณากรอกรหัส User ID"
            />
            {/* Input NFC Card */}
            <InputFieldComponent
              label="กรอกรหัส User ID (ของผู้ขายสินค้า)"
              type="text"
              required
              icon={<FiCreditCard />}
              value={formState.sID2}
              onChange={(e) =>
                setFormState({ ...formState, sID2: e.target.value })
              }
              error={formState.sID2.length < 1 ? "กรุณากรอกรหัส User ID" : ""}
              placeholder="กรุณากรอกรหัส User ID"
            />
            {/* Input NFC Card */}
            <InputFieldComponent
              label="รหัส Transaction Id (sSellID)"
              type="text"
              required
              icon={<FiCreditCard />}
              value={formState.sSellID}
              onChange={(e) =>
                setFormState({ ...formState, sSellID: e.target.value })
              }
              error={
                formState.sSellID.length < 1
                  ? "กรุณากรอกรหัส Transaction ID"
                  : ""
              }
              placeholder="กรุณากรอกรหัส Transaction ID"
            />

            {/* ปุ่ม ยืนยัน / ยกเลิก */}
            <div className="flex items-center gap-4">
              <MinimalButton
                type="submit"
                textSize="base"
                className="bg-green-500 hover:bg-green-600"
                isLoading={isLoading}
              >
                ยืนยัน
              </MinimalButton>

              <MinimalButton
                type="button"
                textSize="base"
                className="bg-red-500 hover:bg-red-600"
                isLoading={false}
              >
                ยกเลิก
              </MinimalButton>
            </div>
          </form>
        </ContentCard>

        {/* Reponse From Server */}
        <ContentCard
          title="Response"
          fullWidth
          className={`md:col-span-2 xl:col-span-4 w-full overflow-hidden ${
            ReduxStateCancelSales.response.data ? "block" : "hidden"
          }`}
        >
          <div className="space-y-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>
                {JSON.stringify(
                  ReduxStateCancelSales.response.data?.data,
                  null,
                  2
                )}
              </code>
            </pre>
            <div className="flex flex-col md:flex-row gap-4">
              {/* COPY RESPONSE */}
              <MinimalButton
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(
                      ReduxStateCancelSales.response.data?.data,
                      null,
                      2
                    )
                  );
                  Swal.fire({
                    icon: "success",
                    title: "Copied!",
                    text: "Response copied to clipboard.",
                    confirmButtonText: "OK",
                  });
                }}
              >
                Copy Response
              </MinimalButton>

              {/* CURL */}
              <MinimalButton
                className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => {
                  const curlCommand = ReduxStateCancelSales.response.data?.curl;
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
            </div>
          </div>
        </ContentCard>

        {/* หมายเหตุ */}
        <div className="grid grid-cols-2 grid-rows-2 gap-6 w-full">
          <ContentCard
            title="หมายเหตุ (1)"
            fullWidth
            className="w-full col-span-1 row-span-2"
          >
            <p className="text-sm text-red-500">
              {t(
                "กรณีที่บัตร NFC ไม่ถูกต้อง หรือไม่พบข้อมูลในระบบ จะมีการแสดงผลลัพธ์เป็น JSON ที่มี status เป็น 'not have number id'"
              )}
            </p>
          </ContentCard>
          <ContentCard
            title="หมายเหตุ (2)"
            fullWidth
            className="w-full col-span-1 row-span-2"
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
