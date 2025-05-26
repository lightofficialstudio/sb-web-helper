import { createAsyncThunk } from "@reduxjs/toolkit";
import { callBackendAPI, CallBackendAPIProps } from "@services/api-gateway";
import { API_METHOD } from "@/services/api-method";
import { setDraftValues } from "@/stores/reducers/call-school-list";

// สร้าง async action สำหรับส่งข้อมูลผู้ใช้ไปยัง API
export const CallAPI = createAsyncThunk("/api/v1/school", async () => {
  const payload: CallBackendAPIProps = {
    method: API_METHOD.GET,
    endpoint: `/api/v1/hardware/register-device`,
    data: {},
    extendHeader: {},
    backendUrl: "",
  };
  const response = await callBackendAPI(payload);
  return response;
});
