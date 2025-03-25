import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Envio, EstadoEnvio, EstadoMaestro } from "./entities/envioEntity";
import { GetEnviosParams } from "./services/enviosService";
import { Datum } from "./entities/reporteEntity";

export interface EnviosState {
  envios: Envio[];
  total: number;
  params: GetEnviosParams;
  estados: EstadoMaestro[];
  selected: Envio[];
  estadosPorCode: {
    code: string | null;
    estados: EstadoEnvio[];
  };
  reporte: Datum[];
}

const initialState: EnviosState = {
  envios: [],
  total: 0,
  params: {
    page: 1,
    size: 10,
  },
  estados: [],
  selected: [],
  estadosPorCode: {
    code: null,
    estados: [],
  },
  reporte: [],
};

const enviosSlice = createSlice({
  name: "envios",
  initialState,
  reducers: {
    setEnvios(
      state,
      action: PayloadAction<{
        envios: Envio[];
        total: number;
        params: GetEnviosParams;
      }>
    ) {
      state.envios = action.payload.envios;
      state.total = action.payload.total;
      state.params = action.payload.params;
    },
    setEstados(state, action: PayloadAction<EstadoMaestro[]>) {
      state.estados = action.payload;
    },
    setSelected(state, action: PayloadAction<Envio[]>) {
      state.selected = action.payload;
    },
    setEstadosPorCode(
      state,
      action: PayloadAction<{
        code: string | null;
        estados: EstadoEnvio[];
      }>
    ) {
      state.estadosPorCode = action.payload;
    },
    setReporte(state, action: PayloadAction<Datum[]>) {
      state.reporte = action.payload;
    },
  },
});

export const {
  setEnvios,
  setEstados,
  setSelected,
  setEstadosPorCode,
  setReporte,
} = enviosSlice.actions;
export default enviosSlice.reducer;
