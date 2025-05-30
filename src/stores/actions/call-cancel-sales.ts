import { createAsyncThunk } from "@reduxjs/toolkit";
import { callBackendAPI, CallBackendAPIProps } from "@services/api-gateway";
import { CancelSalesState } from "@stores/type";

import { API_METHOD } from "@/services/api-method";

const API_ENDPOINT = `/api/v1/support/cancle-sales`;

export const CallAPI = createAsyncThunk(
  API_METHOD.GET + API_ENDPOINT,
  async (request: CancelSalesState) => {
    console.log(
      "[Request Data] : ",
      JSON.stringify(request.draftValues, null, 2)
    );
    const payload: CallBackendAPIProps = {
      method: API_METHOD.POST,
      endpoint: API_ENDPOINT,
      data: request.draftValues,
      extendHeader: {},
      backendUrl: "",
    };
    const response = await callBackendAPI(payload);
    return response;
  }
);
