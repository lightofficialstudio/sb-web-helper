import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestNotificationReadMessage } from "@stores/type";
import { CallAPI } from "@stores/actions/mobile/call-get-notification";

const initialState: RequestNotificationReadMessage = {
  draftValues: {
    message_id: "",
    user_id: "",
  },
  loading: false,
  error: "",
  success: "",
  response: {
    SchoolID: 0,
    senderName: "",
    senderNameEN: "",
    DepartmentName: "",
    DepartmentNameEN: "",
    leaveStart: "",
    leaveEnd: "",
    letterDescription: "",
    letterType: "",
    letterTypeEN: "",
    senderJob: "",
    senderClassroom: null,
    senderClassroomEN: null,
    status: "",
    HomeNumber: "",
    Road: "",
    Tumbon: "",
    Aumpher: "",
    Province: "",
    Phone: "",
    pageStatus: "",
    Code: null,
    sendRequestDate: "",
    sendApproveDate: "",
    Season: 0,
    file: [],
    ApprovedStatus: {
      StatusCode: 0,
      TextEN: "",
      TextTH: "",
      ApprovalAmount: 0,
    },
    approveDatas: [],
    loading: false,
    error: "",
    success: "",
    response: undefined,
  },
};

const Slice = createSlice({
  name: "callGetNotification",
  initialState,
  reducers: {},
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

export default Slice.reducer;
