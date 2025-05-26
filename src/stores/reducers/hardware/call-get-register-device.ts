// reducers/userReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CallGetRegisterDeviceState } from "@stores/type";
import { CallAPI } from "@stores/actions/hardware/call-get-register-device";

const initialState: CallGetRegisterDeviceState = {
  draftValues: {
    Array: [
      {
        ID: 0,
        SchoolID: 0,
        DeviceID: "",
        UserID: 0,
        NeedToUpdate: false,
        Tstamp: "",
        ResponseStatus: false,
      },
    ],
  },
  loading: false,
  error: "",
  success: "",
  response: {},
};

const Slice = createSlice({
  name: "CallGetRegisterDeviceSlice",
  initialState,
  reducers: {
    setDraftValues: (
      state,
      action: PayloadAction<CallGetRegisterDeviceState>
    ) => {
      state.draftValues = {
        ...state.draftValues,
        ...action.payload,
      };
    },
    submitState: (state, action: PayloadAction<CallGetRegisterDeviceState>) => {
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
