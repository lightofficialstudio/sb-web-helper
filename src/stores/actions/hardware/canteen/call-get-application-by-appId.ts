import {createAsyncThunk} from "@reduxjs/toolkit";
import {callBackendAPI, CallBackendAPIProps} from "@services/api-gateway";
import {API_METHOD} from "@/services/api-method";

const API_ENDPOINT = `/api/v1/hardware/canteen/version`;
export const CallAPI = createAsyncThunk(
    API_METHOD.GET + API_ENDPOINT,
    async (request: { app_id: string }) => {
        const payload: CallBackendAPIProps = {
            method: API_METHOD.GET,
            endpoint: API_ENDPOINT + `/${request.app_id}`,
            data: {},
            extendHeader: {},
            backendUrl: "",
        };
        const response = await callBackendAPI(payload);
        return response;
    }
);
