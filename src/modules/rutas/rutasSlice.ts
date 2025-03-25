import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ruta } from "./entities/rutaEntity";
import { GetRutasParams } from "./services/rutasService";
import { GetRutasPendientes } from "./services/rutasService";

export interface RutasState {
  rutas: Ruta[];
  total: number;
  params: GetRutasParams;
  rutasPendientes: GetRutasPendientes[];
}

const initialState: RutasState = {
  rutas: [],
  total: 0,
  params: {
    page: 1,
    size: 10,
    search: "",
  },
  rutasPendientes: [],
};

const transportistaSlice = createSlice({
  name: "rutas",
  initialState,
  reducers: {
    setRutas(
      state,
      action: PayloadAction<{
        rutas: Ruta[];
        total: number;
        params: GetRutasParams;
      }>
    ) {
      state.rutas = action.payload.rutas;
      state.total = action.payload.total;
      state.params = action.payload.params;
    },
    setRutasPendientes(state, action: PayloadAction<GetRutasPendientes[]>) {
      state.rutasPendientes = action.payload;
    },
  },
});

export const { setRutas, setRutasPendientes } = transportistaSlice.actions;
export default transportistaSlice.reducer;
