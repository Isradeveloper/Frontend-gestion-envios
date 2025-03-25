import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VehiculoMaestro, Vehiculo } from "./entities/vehiculoEntity";
import { GetVehiculosParams } from "./services/vehiculosService";

export interface VehiculosState {
  vehiculos: Vehiculo[];
  maestroVehiculos: VehiculoMaestro[];
  total: number;
  params: GetVehiculosParams;
}

const initialState: VehiculosState = {
  vehiculos: [],
  maestroVehiculos: [],
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
    setVehiculos(
      state,
      action: PayloadAction<{
        vehiculos: Vehiculo[];
        total: number;
        params: GetVehiculosParams;
      }>
    ) {
      state.vehiculos = action.payload.vehiculos;
      state.total = action.payload.total;
      state.params = action.payload.params;
    },
    setMaestroVehiculos(
      state,
      action: PayloadAction<{
        maestroVehiculos: VehiculoMaestro[];
      }>
    ) {
      state.maestroVehiculos = action.payload.maestroVehiculos;
    },
  },
});

export const { setVehiculos, setMaestroVehiculos } = vehiculosSlice.actions;
export default vehiculosSlice.reducer;
