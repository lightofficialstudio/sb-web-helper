"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@components/layouts/backend-layout";
import ContentCard from "@components/layouts/backend/content";
import { useTranslation } from "react-i18next";
import LoadingOverlay from "@components/loading/loading-component-1";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, useAppSelector } from "@stores/store";
import { InputFieldComponent } from "@/components/input-field/input-field-component";
import { FormCardNfcState } from "@/stores/type";
import { submitState } from "@/stores/reducers/form-card-nfc";
import MinimalButton from "@/components/button/minimal-button-component";
import { FiCreditCard, FiHome } from "react-icons/fi";
import { CallAPI } from "@/stores/actions/form-card-nfc-action";
import MinimalModal from "@/components/modal/minimal-modal-component";
import Swal from "sweetalert2";

export default function DashboardPage() {
  const { t } = useTranslation("mock");
  const dispatch = useDispatch<AppDispatch>();
  const NFCstate = useAppSelector((state) => state.formCardNfc);
  const [formState, setFormState] = useState<any>({
    nfc_card: NFCstate.draftValues.nfc_card,
    school_id: NFCstate.draftValues.school_id,
  });
  const isLoading = NFCstate.loading;
  const [modal, setModal] = useState<string>("");

  useEffect(() => {
    if (modal === "error") {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบ",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        confirmButtonText: "ตกลง",
      }).then(() => {
        setModal("");
      });
    }
  }, [modal]);

  // #region : State
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.nfc_card || !formState.school_id) {
      return setModal("error");
    }
    await dispatch(
      CallAPI({
        draftValues: formState,
      })
    );
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
          <p>
            {t(
              "หากได้คำตอบแบบนี้ แปลว่าหาบัตรไม่เจอ ถ้าได้เคสจากโรงเรียนแล้วค้นหาไม่เจอ แต่เจอใน System ให้แจ้ง Dev.Vimal"
            )}
          </p>
          <code>
            {JSON.stringify(
              {
                status: "not have number id",
                data: {},
              },
              null,
              2
            )}
          </code>
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
              error={
                formState.nfc_card.length < 1 ? "กรุณากรอกรหัส NFC Card" : ""
              }
              placeholder="กรุณากรอกรหัส NFC Card"
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
              <code>{JSON.stringify(NFCstate.response.data, null, 2)}</code>
            </pre>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                navigator.clipboard.writeText(
                  JSON.stringify(NFCstate.response.data, null, 2)
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
            </button>
          </div>
        </ContentCard>
      </div>
    </DashboardLayout>
  );
}
