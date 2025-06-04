import { createAsyncThunk } from "@reduxjs/toolkit";
import { callBackendAPI, CallBackendAPIProps } from "@services/api-gateway";
import { API_METHOD } from "@/services/api-method";
import { RequestGetUserBySchoolId } from "@/types/device-daily-status.types";
import { RequestLogin, RequestLoginAdmin } from "@/stores/type";

// สร้าง async action สำหรับส่งข้อมูลผู้ใช้ไปยัง API
const API_ENDPOINT = `/api/v1/admin/authentication/sign-in`;
export const CallAPI = createAsyncThunk(
  API_METHOD.POST + API_ENDPOINT,
  async (request: RequestLoginAdmin["draftValues"]) => {
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
