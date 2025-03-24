import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transportista } from "./entities/transportistaEntity";
import { GetTransportistasParams } from "./services/transportistasService";

export interface TransportistasState {
  transportistas: Transportista[];
  total: number;
  params: GetTransportistasParams;
}

const initialState: TransportistasState = {
  transportistas: [],
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
    setTransportistas(state, action: PayloadAction<TransportistasState>) {
      state.transportistas = action.payload.transportistas;
      state.total = action.payload.total;
      state.params = action.payload.params;
    },
  },
});

export const { setTransportistas } = transportistaSlice.actions;
export default transportistaSlice.reducer;
