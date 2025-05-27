import { createAsyncThunk } from "@reduxjs/toolkit";
import { callBackendAPI, CallBackendAPIProps } from "@services/api-gateway";
import { API_METHOD } from "@/services/api-method";
import { CallPostOnlineDevice } from "@stores/type";

// สร้าง async action สำหรับส่งข้อมูลผู้ใช้ไปยัง API
const API_ENDPOINT = `/api/v1/hardware/check-offline`;
export const CallAPI = createAsyncThunk(
  API_ENDPOINT,
  async (request: CallPostOnlineDevice["draftValues"]) => {
    const payload: CallBackendAPIProps = {
      method: API_METHOD.POST,
      endpoint: API_ENDPOINT,
      data: request,
      extendHeader: {},
      backendUrl: "",
    };
    const response = await callBackendAPI(payload);
    return response;
  }
);
