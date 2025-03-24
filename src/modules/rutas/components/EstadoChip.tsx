import { Chip } from "@mui/material";

export const EstadoChip = ({ estado }: { estado: string }) => {
  return estado === "En transito" ? (
    <Chip label="En transito" color="success" variant="outlined" />
  ) : estado === "Finalizada" ? (
    <Chip label="Finalizada" color="primary" variant="outlined" />
  ) : (
    <Chip label="Pendiente" color="warning" variant="outlined" />
  );
};
