import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Transportista,
  TransportistaMaestro,
} from "./entities/transportistaEntity";
import { GetTransportistasParams } from "./services/transportistasService";

export interface TransportistasState {
  transportistas: Transportista[];
  maestroTransportistas: TransportistaMaestro[];
  total: number;
  params: GetTransportistasParams;
}

const initialState: TransportistasState = {
  transportistas: [],
  maestroTransportistas: [],
  total: 0,
  params: {
    page: 1,
    size: 10,
    search: "",
  },
};

const transportistaSlice = createSlice({
  name: "transportistas",
  initialState,
  reducers: {
    setTransportistas(
      state,
      action: PayloadAction<{
        transportistas: Transportista[];
        total: number;
        params: GetTransportistasParams;
      }>
    ) {
      state.transportistas = action.payload.transportistas;
      state.total = action.payload.total;
      state.params = action.payload.params;
    },

    setMaestroTransportistas(
      state,
      action: PayloadAction<{
        maestroTransportistas: TransportistaMaestro[];
      }>
    ) {
      state.maestroTransportistas = action.payload.maestroTransportistas;
    },
  },
});

export const { setTransportistas, setMaestroTransportistas } =
  transportistaSlice.actions;
export default transportistaSlice.reducer;
