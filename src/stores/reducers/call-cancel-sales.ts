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

const Slice = createSlice({
  name: "callCancelSales",
  initialState,
  reducers: {},
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

export default Slice.reducer;
