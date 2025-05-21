// reducers/userReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormCardNfcState } from "@stores/type";
import { submitUser, fetchUser } from "@stores/actions/mock-action";

const initialState: FormCardNfcState = {
  draftValues: {
    nfc_card: "",
    school_id: "",
  },
  loading: false,
  error: "",
  success: "",
};

const formCardNFCReducer = createSlice({
  name: "form-card-nfc",
  initialState,
  reducers: {
    setDraftValues: (state, action: PayloadAction<FormCardNfcState>) => {
      console.log("[setDraftValues] : ", action.payload);
      state.draftValues = {
        ...state.draftValues,
        ...action.payload,
      };
    },
    submitState: (state, action: PayloadAction<FormCardNfcState>) => {
      console.log("[submitState] : ", action.payload);
      state.draftValues = {
        ...state.draftValues,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitUser.fulfilled, (state) => {
        state.loading = false;
        state.success = "User submitted successfully";
      })
      .addCase(submitUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unknown error occurred";
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.draftValues = {
          nfc_card: action.payload.nfc_card,
          school_id: action.payload.school_id,
        };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export const { setDraftValues, submitState } = formCardNFCReducer.actions;
export default formCardNFCReducer.reducer;
