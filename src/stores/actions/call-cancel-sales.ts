import { createAsyncThunk } from "@reduxjs/toolkit";
import { callBackendAPI, CallBackendAPIProps } from "@services/api-gateway";
import { CancelSalesState } from "@stores/type";

import { API_METHOD } from "@/services/api-method";

// สร้าง async action สำหรับส่งข้อมูลผู้ใช้ไปยัง API
export const CallAPI = createAsyncThunk(
  "/api/v1/support/cancle-sales",
  async (request: CancelSalesState) => {
    console.log(
      "[Request Data] : ",
      JSON.stringify(request.draftValues, null, 2)
    );
    const payload: CallBackendAPIProps = {
      method: API_METHOD.POST,
      endpoint: `api/v1/support/cancle-sales`,
      data: request.draftValues,
      extendHeader: {},
      backendUrl: "",
    };
    const response = await callBackendAPI(payload);
    return response;
  }
);
