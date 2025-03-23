import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Envio } from "./entities/envioEntity";
import { GetEnviosParams } from "./services/enviosService";

export interface EnviosState {
  envios: Envio[];
  total: number;
  params: GetEnviosParams;
}

const initialState: EnviosState = {
  envios: [],
  total: 0,
  params: {
    page: 1,
    size: 10,
  },
};

const enviosSlice = createSlice({
  name: "envios",
  initialState,
  reducers: {
    setEnvios(state, action: PayloadAction<EnviosState>) {
      state.envios = action.payload.envios;
      state.total = action.payload.total;
      state.params = action.payload.params;
    },
  },
});

export const { setEnvios } = enviosSlice.actions;
export default enviosSlice.reducer;
