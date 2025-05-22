// reducers/userReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CancelSalesState } from "@stores/type";
import { CallAPI } from "@stores/actions/call-cancel-sales";

const initialState: CancelSalesState = {
  draftValues: {
    SchoolID: "",
    sID: "",
    sID2: "",
    sSellID: "",
  },
  loading: false,
  error: "",
  success: "",
  response: {},
};

const callCancelSales = createSlice({
  name: "call-cancel-sales",
  initialState,
  reducers: {
    setDraftValues: (state, action: PayloadAction<CancelSalesState>) => {
      console.log("[setDraftValues] : ", action.payload);
      state.draftValues = {
        ...state.draftValues,
        ...action.payload,
      };
    },
    submitState: (state, action: PayloadAction<CancelSalesState>) => {
      console.log("[submitState] : ", action.payload);
      state.draftValues = {
        ...state.draftValues,
        ...action.payload,
      };
      CallAPI(action.payload);
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
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export const { setDraftValues, submitState } = callCancelSales.actions;
export default callCancelSales.reducer;
