export interface Data {
  message: string;
  data: {
    items: Ruta[];
    total: number;
  };
}

interface TransportistaRuta {
  id: number;
  nombre: string;
  cedula: string;
}

interface VehiculoRuta {
  id: number;
  placa: string;
  pesoMaximo: number;
  volumenMaximo: number;
}

export class Ruta {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly transportista: TransportistaRuta,
    public readonly vehiculo: VehiculoRuta,
    public readonly estado: string,
    public readonly origen: string,
    public readonly destino: string,
    public readonly active: boolean,
    public readonly createdAt: Date,
    public readonly fechaInicio: Date | null,
    public readonly fechaFin: Date | null
  ) {}

  public static fromApi(data: Ruta): Ruta {
    return new Ruta(
      data.id,
      data.nombre,
      data.transportista,
      data.vehiculo,
      data.estado,
      data.origen,
      data.destino,
      data.active,
      new Date(data.createdAt),
      data.fechaInicio ? new Date(data.fechaInicio) : null,
      data.fechaFin ? new Date(data.fechaFin) : null
    );
  }
}
