import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/authSlice";
import commonReducer from "./modules/common/commonSlice";
import enviosReducer from "./modules/envios/enviosSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    envios: enviosReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
