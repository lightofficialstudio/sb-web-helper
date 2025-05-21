"use client";
import React, { useState } from "react";
import DashboardLayout from "@components/layouts/backend-layout";
import ContentCard from "@components/layouts/backend/content";
import { useTranslation } from "react-i18next";
import LoadingOverlay from "@components/loading/loading-component-1";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@stores/store";
import { InputFieldComponent } from "@/components/input-field/input-field-component";
import { FormCardNfcState } from "@/stores/type";
import { submitState } from "@/stores/reducers/form-card-nfc";
import MinimalButton from "@/components/button/minimal-button-component";
import { FiCreditCard, FiHome } from "react-icons/fi";

export default function DashboardPage() {
  const { t } = useTranslation("mock");
  const dispatch = useDispatch();
  const NFCstate = useAppSelector((state) => state.formCardNfc);
  const [formState, setFormState] = useState<any>({
    nfc_card: NFCstate.draftValues.nfc_card,
    school_id: NFCstate.draftValues.school_id,
  });
  const isLoading = NFCstate.loading;

  // #region : State
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(submitState(formState));
  };
  // #endregion

  return (
    <DashboardLayout>
      {isLoading && <LoadingOverlay />}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6 w-full">
        {/* บังคับให้ card แรกอยู่เต็มความกว้างใน md และ xl */}
        <ContentCard
          title="Welcome"
          fullWidth
          className="md:col-span-2 xl:col-span-4 w-full"
        >
          <p>{t("การใช้งาน")}</p>
        </ContentCard>

        <ContentCard
          title="Input"
          fullWidth
          className="md:col-span-2 xl:col-span-4 w-full"
        >
          <form onSubmit={handleSubmitForm} className="space-y-4">
            {/* กรอก School Id */}
            <InputFieldComponent
              label="กรอกรหัสโรงเรียน"
              type="text"
              icon={<FiHome />}
              value={formState.school_id}
              onChange={(e) =>
                setFormState({ ...formState, school_id: e.target.value })
              }
              error={
                formState.school_id.length < 1 ? "กรุณากรอกรหัสโรงเรียน" : ""
              }
              placeholder="กรุณากรอกรหัสโรงเรียน"
            />
            {/* Input NFC Card */}
            <InputFieldComponent
              label="กรอกรหัส NFC Card"
              type="text"
              icon={<FiCreditCard />}
              value={formState.nfc_card}
              onChange={(e) =>
                setFormState({ ...formState, nfc_card: e.target.value })
              }
              placeholder="กรุณากรอกรหัส NFC Card"
              hint={<span className="text-xs">ตัวอย่าง 314627373</span>}
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
          className="md:col-span-2 xl:col-span-4 w-full"
        >
          <div className="space-y-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              <code>{JSON.stringify(NFCstate.draftValues, null, 2)}</code>
            </pre>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                navigator.clipboard.writeText(
                  JSON.stringify(NFCstate.draftValues, null, 2)
                );
                alert("คัดลอกข้อมูลสำเร็จแล้ว!");
              }}
            >
              Copy Response
            </button>
          </div>
        </ContentCard>
      </div>
    </DashboardLayout>
  );
}
