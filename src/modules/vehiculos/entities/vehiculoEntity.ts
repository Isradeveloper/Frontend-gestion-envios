export interface Data {
  message: string;
  data: {
    items: Vehiculo[];
    total: number;
  };
}

export interface VehiculoMaestro {
  id: number;
  placa: string;
}

export class Vehiculo {
  constructor(
    public readonly id: number,
    public readonly placa: string,
    public readonly pesoMaximo: number,
    public readonly volumenMaximo: number,
    public readonly enTransito: boolean,
    public readonly active: boolean,
    public readonly createdAt: Date
  ) {}

  public static fromApi(data: Vehiculo): Vehiculo {
    return new Vehiculo(
      data.id,
      data.placa,
      data.pesoMaximo,
      data.volumenMaximo,
      data.enTransito,
      data.active,
      new Date(data.createdAt)
    );
  }
}
