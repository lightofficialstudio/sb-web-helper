import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
// #region : reducer
import newmanReducer from "@stores/reducers/call-newman";
import formCardNfcReducer from "@stores/reducers/form-card-nfc";
import callSchoolListReducer from "@stores/reducers/call-school-list";
import callCancelSalesReducer from "@stores/reducers/call-cancel-sales";
import callGetRegisterDeviceReducer from "@stores/reducers/hardware/call-get-register-device";
// #endregion

export const store = configureStore({
  reducer: {
    newman: newmanReducer,
    formCardNfc: formCardNfcReducer,
    callCancelSales: callCancelSalesReducer,
    callSchoolList: callSchoolListReducer,
    callGetRegisterDevice: callGetRegisterDeviceReducer,
  },
});

// ? : อธิบาย : store และ configureStore ใน redux toolkit
export type RootState = ReturnType<typeof store.getState>;
// ? : อธิบาย : AppDispatch ใน redux toolkit
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
