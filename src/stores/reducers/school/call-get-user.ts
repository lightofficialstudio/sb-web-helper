// reducers/userReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Default } from "@stores/type";
import { CallAPI } from "@stores/actions/school/call-get-user";

const initialState: Default = {
  draftValues: {},
  loading: false,
  error: "",
  success: "",
  response: {},
};

const Slice = createSlice({
  name: "CallGetuserBySchoolId",
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
