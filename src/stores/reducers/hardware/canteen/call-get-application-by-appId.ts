import {createSlice , PayloadAction} from "@reduxjs/toolkit";
import {CallAPI} from "@stores/actions/hardware/canteen/call-get-application-by-appId";
import {RequestApplicationVersionList} from "@stores/type";

const initialState: RequestApplicationVersionList = {
    draftValues: {
        app_id: ""
    },
    loading: false,
    error: "",
    success: "",
    response: {
        data: {
            status: "",
            data: []
        }

    },
};

const Slice = createSlice({
    name: "CallGetHardwareApplicationByAppIdSlice",
    initialState,
    reducers: {
        setDraftValues: (
            state,
            action: PayloadAction<RequestApplicationVersionList["draftValues"]>
          ) => {
            return {
              ...state,
              draftValues: {
                ...state.draftValues,
                ...action.payload,
              },
            };
          }
    },
    extraReducers: (builder) => {
        builder
            .addCase(CallAPI.pending, (state) => {
                state.loading = true;
            })
            .addCase(CallAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.response = action.payload;
                state.success = "successfully";
            })
            .addCase(CallAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "An unknown error occurred";
            });
    },
});

export const {setDraftValues} = Slice.actions;
export default Slice.reducer;
