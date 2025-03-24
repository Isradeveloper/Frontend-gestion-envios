export interface Data {
  message: string;
  data: {
    items: Transportista[];
    total: number;
  };
}

export interface TransportistaMaestro {
  id: number;
  nombre: string;
  cedula: string;
}

export class Transportista {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly cedula: string,
    public readonly enTransito: boolean,
    public readonly active: boolean,
    public readonly createdAt: Date
  ) {}

  public static fromApi(data: Transportista): Transportista {
    return new Transportista(
      data.id,
      data.nombre,
      data.cedula,
      data.enTransito,
      data.active,
      new Date(data.createdAt)
    );
  }
}
