import { Chip } from "@mui/material";

export const EstadoChip = ({ estado }: { estado: string }) => {
  return estado == "En transito" ? (
    <Chip label="En transito" color="success" variant="outlined" />
  ) : estado == "Entregado" ? (
    <Chip label="Entregado" color="primary" variant="outlined" />
  ) : (
    <Chip label="En espera" color="warning" variant="outlined" />
  );
};
