import { apiToken as api } from "../../../api/backend";
import { calculateTotalPages } from "../../common/utils";
import {
  Transportista,
  Data,
  TransportistaMaestro,
} from "../entities/transportistaEntity";
import { SuccessData } from "../../common/interfaces";

export interface GetTransportistasParams {
  page: number;
  size: number;
  search?: string;
}

export const transportistasService = {
  getTransportistas: async (params: GetTransportistasParams) => {
    const response = await api.get<Data>("/transportistas", { params });
    if (response.status === 200) {
      const { items, total } = response.data.data;
      const totalAPaginar = calculateTotalPages(total, params.size);
      return { items, total: totalAPaginar };
    }
  },
  createTransportista: async (transportista: Partial<Transportista>) => {
    const response = await api.post<Transportista>("/transportistas", {
      ...transportista,
    });
    if (response.status === 201) {
      return Transportista.fromApi(response.data);
    }
  },
  getMaestroTransportistas: async () => {
    const response = await api.get<SuccessData<TransportistaMaestro[]>>(
      "/transportistas/maestro"
    );
    if (response.status === 200) {
      return response.data.data;
    }
  },
};
