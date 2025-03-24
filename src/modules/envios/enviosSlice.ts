import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Envio, EstadoMaestro } from "./entities/envioEntity";
import { GetEnviosParams } from "./services/enviosService";

export interface EnviosState {
  envios: Envio[];
  total: number;
  params: GetEnviosParams;
  estados: EstadoMaestro[];
}

const initialState: EnviosState = {
  envios: [],
  total: 0,
  params: {
    page: 1,
    size: 10,
  },
  estados: [],
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
  },
});

export const { setEnvios, setEstados } = enviosSlice.actions;
export default enviosSlice.reducer;
