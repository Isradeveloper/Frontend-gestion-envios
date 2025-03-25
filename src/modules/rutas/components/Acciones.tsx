import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button } from "@mui/material";
import { Ruta } from "../entities/rutaEntity";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, Ref, useState } from "react";
import { useRutas } from "../hooks/useRutas";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Acciones = ({ item }: { item: Ruta }) => {
  const { changeEstado } = useRutas();

  const [open, setOpen] = useState(false);

  const [accion, setAccion] = useState({
    title: "",
    message: "",
    id: 0,
    estado: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (
    title: string,
    message: string,
    id: number,
    estado: string
  ) => {
    if (id === 0 || !estado) return;

    setAccion({ title, message, id, estado });
    setOpen(true);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" gap={2} alignItems="center">
        {item.estado === "En transito" ? (
          <Button
            color="error"
            variant="outlined"
            onClick={() =>
              handleOpen(
                "Finalizar ruta",
                "¿Estas seguro de finalizar esta ruta?",
                item.id,
                "Finalizada"
              )
            }
          >
            Finalizar ruta
          </Button>
        ) : item.estado === "Pendiente" ? (
          <Button
            color="success"
            variant="outlined"
            onClick={() =>
              handleOpen(
                "Empezar ruta",
                "¿Estas seguro de empezar esta ruta?",
                item.id,
                "En transito"
              )
            }
          >
            Emprezar ruta
          </Button>
        ) : (
          "---"
        )}
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{accion.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {accion.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={async () => {
              await changeEstado(accion.id, accion.estado);
              handleClose();
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
