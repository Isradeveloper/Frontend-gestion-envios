import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Datum } from "../entities/reporteEntity";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: Datum[];
}

const ReporteVolumenPesoPorVehiculo = ({ data }: Props) => {
  const capacidadPorVehiculo: Record<
    string,
    {
      pesoUsado: number;
      volumenUsado: number;
      pesoMaximo: number;
      volumenMaximo: number;
    }
  > = {};

  data.forEach((d) => {
    if (d.vehiculo_placa && d.peso && d.largo && d.ancho && d.alto) {
      const volumen =
        parseFloat(d.largo) * parseFloat(d.ancho) * parseFloat(d.alto);
      const peso = parseFloat(d.peso);
      const placa = d.vehiculo_placa || "Desconocido";

      if (!capacidadPorVehiculo[placa]) {
        capacidadPorVehiculo[placa] = {
          pesoUsado: 0,
          volumenUsado: 0,
          pesoMaximo: d.peso_maximo ? parseFloat(d.peso_maximo) : 0,
          volumenMaximo: d.volumen_maximo ? parseFloat(d.volumen_maximo) : 0,
        };
      }

      capacidadPorVehiculo[placa].pesoUsado += peso;
      capacidadPorVehiculo[placa].volumenUsado += volumen;
    }
  });

  const vehiculos = Object.keys(capacidadPorVehiculo);

  const chartData = {
    labels: vehiculos,
    datasets: [
      {
        label: "Peso Usado (kg)",
        data: vehiculos.map(
          (vehiculo) => capacidadPorVehiculo[vehiculo].pesoUsado
        ),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Volumen Usado (m³)",
        data: vehiculos.map(
          (vehiculo) => capacidadPorVehiculo[vehiculo].volumenUsado
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Capacidad Utilizada de Vehículos" },
        },
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
      }}
    />
  );
};

export default ReporteVolumenPesoPorVehiculo;
