import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/authSlice";
import commonReducer from "./modules/common/commonSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
