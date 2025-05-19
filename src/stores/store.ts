import { configureStore } from "@reduxjs/toolkit";
// #region : reducer
import mockReducer from "@stores/reducers/mock-reducer";
import newmanReducer from "@stores/reducers/call-newman";
import {TypedUseSelectorHook, useSelector} from "react-redux";
// #endregion

export const store = configureStore({
  reducer: {
    mockReducer: mockReducer,
    newman : newmanReducer,
  },
});

// ? : อธิบาย : store และ configureStore ใน redux toolkit
export type RootState = ReturnType<typeof store.getState>;
// ? : อธิบาย : AppDispatch ใน redux toolkit
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
