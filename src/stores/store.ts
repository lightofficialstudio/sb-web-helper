import { configureStore } from "@reduxjs/toolkit";
// #region : reducer
import newmanReducer from "@stores/reducers/call-newman";
import formCardNfcReducer from "@stores/reducers/form-card-nfc";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import callCancelSalesReducer from "@stores/reducers/call-cancel-sales";
// #endregion

export const store = configureStore({
  reducer: {
    newman: newmanReducer,
    formCardNfc: formCardNfcReducer,
    callCancelSales: callCancelSalesReducer,
  },
});

// ? : อธิบาย : store และ configureStore ใน redux toolkit
export type RootState = ReturnType<typeof store.getState>;
// ? : อธิบาย : AppDispatch ใน redux toolkit
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
