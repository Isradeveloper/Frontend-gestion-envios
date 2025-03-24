import { Chip } from "@mui/material";

export const EstadoChip = ({ enTransito }: { enTransito: boolean }) => {
  return enTransito ? (
    <Chip label="En transito" color="success" variant="outlined" />
  ) : (
    <Chip label="En espera" color="warning" variant="outlined" />
  );
};
