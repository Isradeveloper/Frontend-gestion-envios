import { apiToken as api } from "../../../api/backend";
import { SuccessData } from "../../common/interfaces";
import { calculateTotalPages } from "../../common/utils";
import { Ruta, Data } from "../entities/rutaEntity";

export interface GetRutasParams {
  page: number;
  size: number;
  estado?: string;
  fechaInicio?: string;
  fechaFin?: string;
  idTransportista?: number;
  idVehiculo?: number;
  search?: string;
}

export interface CreateRutaI {
  vehiculoId: string;
  transportistaId: string;
  origen: string;
  destino: string;
}

export interface GetRutasPendientes {
  id: number;
  origen: string;
  destino: string;
}

export const rutasService = {
  getRutas: async (params: GetRutasParams) => {
    const response = await api.get<Data>("/rutas", { params });
    if (response.status === 200) {
      const { items, total } = response.data.data;
      const totalAPaginar = calculateTotalPages(total, params.size);
      return { items, total: totalAPaginar };
    }
  },
  createRuta: async ({
    vehiculoId,
    transportistaId,
    origen,
    destino,
  }: Partial<CreateRutaI>) => {
    const response = await api.post<Ruta>("/rutas", {
      vehiculoId: vehiculoId ? +vehiculoId : 0,
      transportistaId: transportistaId ? +transportistaId : 0,
      origen,
      destino,
    });
    if (response.status === 201) {
      return Ruta.fromApi(response.data);
    }
  },
  changeEstado: async (id: number, estado: string) => {
    const response = await api.post<Ruta>(`/rutas/change-estado`, {
      id,
      estado,
    });
    if (response.status === 200) {
      return Ruta.fromApi(response.data);
    }
  },
  getRutasPendientes: async () => {
    const response =
      await api.get<SuccessData<GetRutasPendientes[]>>("/rutas/pendientes");
    if (response.status === 200) {
      return response.data.data;
    }
  },
};
