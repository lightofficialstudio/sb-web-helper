import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestLoginAdmin } from "@stores/type";
import { CallAPI } from "@stores/actions/authentication/call-get-login-admin";

const initialState: RequestLoginAdmin = {
  draftValues: {
    username: "",
    password: "",
  },
  loading: false,
  error: "",
  success: "",
  response: {
    status: 0,
    data: {
      id: "",
      admin_id: 0,
      username: "",
      name: "",
      lastname: "",
      token: "",
    },
  },
};

const Slice = createSlice({
  name: "callLogin",
  initialState,
  reducers: {
    setResponse(state, action: PayloadAction<RequestLoginAdmin["response"]>) {
      state.response = action.payload;
    },
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

export const { setResponse } = Slice.actions;
export default Slice.reducer;
