import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Datum } from "../entities/reporteEntity";
import { useRef, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: Datum[];
}

const ReporteEnviosPorEstado = ({ data }: Props) => {
  const estadoCounts: Record<string, number> = {};
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  data.forEach((d) => {
    estadoCounts[d.ultimo_estado] = (estadoCounts[d.ultimo_estado] || 0) + 1;
  });

  const estados = Object.keys(estadoCounts);

  const chartData = {
    labels: estados,
    datasets: [
      {
        label: "Cantidad de Envíos",
        data: Object.values(estadoCounts),
        backgroundColor: estados.map(
          (_, index) => colors[index % colors.length]
        ),
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const chartRef = useRef<ChartJS<"pie"> | null>(null);

  useEffect(() => {
    const currentChart = chartRef.current;

    return () => {
      if (currentChart) {
        currentChart.destroy();
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <Pie
        ref={chartRef}
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
          },
        }}
      />
    </div>
  );
};

export default ReporteEnviosPorEstado;
