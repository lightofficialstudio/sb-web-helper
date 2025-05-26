// reducers/userReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CallPostOnlineDevice } from "@stores/type";
import { CallAPI } from "@stores/actions/hardware/call-post-online-device";

const initialState: CallPostOnlineDevice = {
  draftValues: {
    SchoolID: 0,
    DeviceID: "",
    Status: "Online",
  },
  loading: false,
  error: "",
  success: "",
  response: {},
};

const Slice = createSlice({
  name: "CallPostOnlineDeviceSlice",
  initialState,
  reducers: {
    setDraftValues: (
      state,
      action: PayloadAction<CallPostOnlineDevice["draftValues"]>
    ) => {
      state.draftValues = {
        ...state.draftValues,
        ...action.payload,
      };
    },
    submitState: (
      state,
      action: PayloadAction<CallPostOnlineDevice["draftValues"]>
    ) => {
      state.draftValues = {
        ...state.draftValues,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CallAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(CallAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.response.data = action.payload;
        state.success = "successfully";
      })
      .addCase(CallAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unknown error occurred";
      });
  },
});

export const { setDraftValues, submitState } = Slice.actions;
export default Slice.reducer;
