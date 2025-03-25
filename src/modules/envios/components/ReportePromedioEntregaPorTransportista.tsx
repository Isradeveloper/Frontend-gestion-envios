import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Datum } from "../entities/reporteEntity";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: Datum[];
}

const ReportePromedioEntregaPorTransportista = ({ data }: Props) => {
  // Agrupar tiempos de entrega por transportista
  const tiemposEntrega: Record<string, number[]> = {};

  data.forEach((d) => {
    if (d.fecha_entrega && d.created_at && d.transportista_nombre) {
      const start = new Date(d.created_at).getTime();
      const end = new Date(d.fecha_entrega).getTime();
      const horas = (end - start) / (1000 * 60 * 60); // Convertir a horas

      if (!tiemposEntrega[d.transportista_nombre]) {
        tiemposEntrega[d.transportista_nombre] = [];
      }
      tiemposEntrega[d.transportista_nombre].push(horas);
    }
  });

  // Calcular el promedio de horas por transportista
  const promedioPorTransportista = Object.keys(tiemposEntrega).map(
    (transportista) => {
      const tiempos = tiemposEntrega[transportista];
      const promedio = tiempos.reduce((a, b) => a + b, 0) / tiempos.length;
      return { transportista, promedio };
    }
  );

  // Preparar los datos para el gráfico
  const chartData = {
    labels: promedioPorTransportista.map((item) => item.transportista),
    datasets: [
      {
        label: "Tiempo Promedio de Entrega (horas)",
        data: promedioPorTransportista.map((item) => item.promedio),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
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
          title: {
            display: true,
            text: "Tiempo Promedio de Entrega por Transportista",
          },
        },
      }}
    />
  );
};

export default ReportePromedioEntregaPorTransportista;
