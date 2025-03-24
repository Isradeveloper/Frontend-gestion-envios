import { api } from "../../../api/backend";
import { SuccessData } from "../../common/interfaces";
import { calculateTotalPages } from "../../common/utils";
import { Envio, EnvioAPI, EstadoMaestro } from "../entities/envioEntity";

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
  getEstados: async () => {
    const response = await api.get<SuccessData<EstadoMaestro[]>>("/estados");
    if (response.status === 200) {
      return response.data.data.map((estado) => ({
        id: estado.id,
        name: estado.name,
      }));
    }
  },
};
