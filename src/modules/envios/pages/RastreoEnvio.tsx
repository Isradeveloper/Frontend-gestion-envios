import { useState, useEffect } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import {
  Typography,
  Box,
  Chip,
  Paper,
  Tooltip,
  TextField,
  Button,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  LocalShipping as LocalShippingIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { io } from "socket.io-client";
import { useEnvios } from "../hooks/useEnvios";
import { EstadoEnvio } from "../entities/envioEntity";

const transformEstados = (estados: EstadoEnvio[]) => {
  return estados.map((estado) => ({
    ...estado,
    ubicacion:
      estado.estado === "Entregado"
        ? estado.direccion
        : estado.estado === "En transito"
          ? "En transito"
          : "En sede logistica",
    fechaHora: new Date(estado.fecha).toLocaleString("es-CO", {
      timeZone: "America/Bogota",
    }),
  }));
};

export default function RastreoEnvio() {
  const [codigo, setCodigo] = useState<string>("");
  const [socketCodigo, setSocketCodigo] = useState<string | null>(null);
  const { estadosPorCode, getEstadosPorCode } = useEnvios();
  const [estados, setEstados] = useState<EstadoEnvio[]>([]);

  useEffect(() => {
    if (!socketCodigo) return;

    const socket = io("http://localhost:3000");

    socket.on(`envio-${socketCodigo}`, (envioActualizado: EstadoEnvio) => {
      setEstados((prev) => [...prev, envioActualizado]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socketCodigo]);

  const handleBuscar = async () => {
    if (codigo.trim() !== "") {
      const estados = await getEstadosPorCode(codigo);
      setEstados(estados || []);
      setSocketCodigo(codigo);
    }
  };

  const getEstadoDetalles = (estado: string) => {
    switch (estado) {
      case "Entregado":
        return {
          icon: <CheckCircleIcon />,
          color: "success" as const,
          bgColor: "#e8f5e9",
        };
      case "En transito":
        return {
          icon: <LocalShippingIcon />,
          color: "primary" as const,
          bgColor: "#e3f2fd",
        };
      case "En espera":
        return {
          icon: <ScheduleIcon />,
          color: "warning" as const,
          bgColor: "#ffebee",
        };
      default:
        return {
          icon: <ScheduleIcon />,
          color: "default" as const,
          bgColor: "#f5f5f5",
        };
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: "left" }}>
        Estados de Envíos
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          label="Código de Seguimiento"
          variant="outlined"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleBuscar}>
          Buscar
        </Button>
      </Box>

      <Box>
        <Timeline position="right">
          {transformEstados(estados).map((estado, index) => {
            const detalles = getEstadoDetalles(estado.estado);
            return (
              <TimelineItem key={index}>
                <TimelineOppositeContent sx={{ flex: 0.2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {estado.fechaHora}
                  </Typography>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <Tooltip title={estado.estado}>
                    <TimelineDot
                      sx={{
                        bgcolor: detalles.bgColor,
                        color: `${detalles.color}.main`,
                      }}
                    >
                      {detalles.icon}
                    </TimelineDot>
                  </Tooltip>
                  {index < estadosPorCode.estados.length - 1 && (
                    <TimelineConnector />
                  )}
                </TimelineSeparator>

                <TimelineContent>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: detalles.bgColor,
                      borderRadius: 2,
                      border: 1,
                      borderColor: `${detalles.color}.light`,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6" component="div">
                        Envío {estado.id}
                      </Typography>

                      <Chip
                        label={estado.estado}
                        color={detalles.color}
                        size="small"
                      />
                    </Box>

                    {estado.ubicacion && (
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        <strong>Ubicación:</strong> {estado.ubicacion}
                      </Typography>
                    )}
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Box>
    </>
  );
}
