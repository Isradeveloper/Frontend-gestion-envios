import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/authSlice";
import commonReducer from "./modules/common/commonSlice";
import enviosReducer from "./modules/envios/enviosSlice";
import transportistasReducer from "./modules/transportistas/transportistasSlice";
import vehiculosReducer from "./modules/vehiculos/vehiculosSlice";
import rutasReducer from "./modules/rutas/rutasSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    envios: enviosReducer,
    transportistas: transportistasReducer,
    vehiculos: vehiculosReducer,
    rutas: rutasReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
