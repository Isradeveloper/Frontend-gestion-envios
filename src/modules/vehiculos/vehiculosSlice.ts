import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vehiculo } from "./entities/vehiculoEntity";
import { GetVehiculosParams } from "./services/vehiculosService";

export interface VehiculosState {
  vehiculos: Vehiculo[];
  total: number;
  params: GetVehiculosParams;
}

const initialState: VehiculosState = {
  vehiculos: [],
  total: 0,
  params: {
    page: 1,
    size: 10,
    search: "",
  },
};

const vehiculosSlice = createSlice({
  name: "vehiculos",
  initialState,
  reducers: {
    setVehiculos(state, action: PayloadAction<VehiculosState>) {
      state.vehiculos = action.payload.vehiculos;
      state.total = action.payload.total;
      state.params = action.payload.params;
    },
  },
});

export const { setVehiculos } = vehiculosSlice.actions;
export default vehiculosSlice.reducer;
