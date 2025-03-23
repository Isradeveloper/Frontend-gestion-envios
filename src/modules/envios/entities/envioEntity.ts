export interface EnvioAPI {
  message: string;
  data: Data;
}

export interface Data {
  items: Envio[];
  total: number;
}

export interface Ruta {
  id: number;
  origen: string;
  destino: string;
  estado: Estado;
  fechaInicio: Date;
  fechaFin: null;
  transportista: EnvioTransportista;
  vehiculo: EnvioVehiculo;
}

export enum Estado {
  EnEspera = "En espera",
  EnTransito = "En transito",
}

export interface EnvioTransportista {
  id: number;
  nombre: string;
  cedula: string;
}

export interface EnvioVehiculo {
  id: number;
  placa: string;
  pesoMaximo: string;
  volumenMaximo: string;
}

export interface EnvioUser {
  id: number;
  name: string;
  email: string;
}

export class Envio {
  constructor(
    public readonly id: number,
    public readonly createdAt: Date,
    public readonly user: EnvioUser,
    public readonly direccion: string,
    public readonly alto: string,
    public readonly ancho: string,
    public readonly largo: string,
    public readonly peso: string,
    public readonly ultimoEstado: Estado,
    public readonly ruta: Ruta | null,
    public readonly codigo: string,
    public readonly tipoProducto: string
  ) {}

  static fromApi(data: Envio) {
    return new Envio(
      data.id,
      data.createdAt,
      data.user,
      data.direccion,
      data.alto,
      data.ancho,
      data.largo,
      data.peso,
      data.ultimoEstado,
      data.ruta,
      data.codigo,
      data.tipoProducto
    );
  }
}
