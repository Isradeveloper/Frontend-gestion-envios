import { api } from "../../../api/backend";
import { calculateTotalPages } from "../../common/utils";
import { Envio, EnvioAPI } from "../entities/envioEntity";

export interface getEnvios {
  items: Envio[];
  total: number;
}

export interface GetEnviosParams {
  page: number;
  size: number;
  search?: string;
  estado?: string;
  fechaInicio?: string;
  fechaFin?: string;
  transportistaId?: number;
  UsuarioId?: number;
}

export interface CreateEnvioAPI {
  message: string;
  data: Envio;
}

export const enviosService = {
  getEnvios: async (params: GetEnviosParams) => {
    const response = await api.get<EnvioAPI>("/envios", { params });
    if (response.status === 200) {
      const { items, total } = response.data.data;
      const totalAPaginar = calculateTotalPages(total, params.size);
      return { items, total: totalAPaginar };
    }
  },
  createEnvio: async (envio: Partial<Envio>, userId: number) => {
    const response = await api.post<CreateEnvioAPI>("/envios", {
      ...envio,
      usuarioId: userId,
    });
    if (response.status === 200) {
      return Envio.fromApi(response.data.data);
    }
  },
};
