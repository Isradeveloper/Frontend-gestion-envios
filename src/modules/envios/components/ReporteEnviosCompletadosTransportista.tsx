import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Datum } from "../entities/reporteEntity";
import { useRef, useEffect, useState } from "react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface Props {
  data: Datum[];
}

const ReporteEnviosCompletadosTransportista = ({ data }: Props) => {
  const transportistaCounts: Record<string, number> = {};
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  data.forEach((d) => {
    if (d.ultimo_estado === "Entregado" && d.transportista_nombre) {
      transportistaCounts[d.transportista_nombre] =
        (transportistaCounts[d.transportista_nombre] || 0) + 1;
    }
  });

  const chartData = {
    labels: Object.keys(transportistaCounts),
    datasets: [
      {
        label: "Envíos Completados",
        data: Object.values(transportistaCounts),
        backgroundColor: Object.keys(transportistaCounts).map(
          (_, index) => colors[index % colors.length]
        ),
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const chartRef = useRef<ChartJS<"bar"> | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <Bar
        key={JSON.stringify(data)} // Forzar recreación con datos nuevos
        ref={chartRef}
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          animation: false, // Desactivar animaciones iniciales
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Envíos Completados por Transportista",
            },
          },
        }}
      />
    </div>
  );
};

export default ReporteEnviosCompletadosTransportista;
