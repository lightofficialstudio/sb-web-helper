import { createAsyncThunk } from "@reduxjs/toolkit";
import { callBackendAPI } from "@services/api-gateway";
import { FormCardNfcState } from "@stores/type";

// สร้าง async action สำหรับส่งข้อมูลผู้ใช้ไปยัง API
export const submitUser = createAsyncThunk(
  "/api/v1/",
  async (data: FormCardNfcState) => {
    const response = await callBackendAPI("POST", "api/user", data);
    return response;
  }
);
