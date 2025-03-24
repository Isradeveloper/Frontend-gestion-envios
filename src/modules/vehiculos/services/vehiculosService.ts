import { api } from "../../../api/backend";
import { calculateTotalPages } from "../../common/utils";
import { Vehiculo, Data } from "../entities/vehiculoEntity";

export interface GetVehiculosParams {
  page: number;
  size: number;
  search?: string;
}

export const vehiculosService = {
  getVehiculos: async (params: GetVehiculosParams) => {
    const response = await api.get<Data>("/vehiculos", { params });
    if (response.status === 200) {
      const { items, total } = response.data.data;
      const totalAPaginar = calculateTotalPages(total, params.size);
      return { items, total: totalAPaginar };
    }
  },
  createVehiculo: async (vehiculo: Partial<Vehiculo>) => {
    const response = await api.post<Vehiculo>("/vehiculos", {
      placa: vehiculo.placa,
      peso_maximo: vehiculo.pesoMaximo,
      volumen_maximo: vehiculo.volumenMaximo,
    });
    if (response.status === 201) {
      return Vehiculo.fromApi(response.data);
    }
  },
};
