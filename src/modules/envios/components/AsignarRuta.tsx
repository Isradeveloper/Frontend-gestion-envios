import {
  Autocomplete,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { Button } from "@mui/material";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ErrorMessage, Form, Formik } from "formik";
import { forwardRef, ReactElement, Ref, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { RutasState } from "../../rutas/rutasSlice";
import { useEnvios } from "../hooks/useEnvios";
import { AuthState } from "../../auth/authSlice";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialValues = {
  rutaId: 0,
};

const validationSchema = Yup.object().shape({
  rutaId: Yup.number()
    .required("Ruta es requerida")
    .moreThan(0, "Ruta es requerida"),
});

export const AsignarRuta = () => {
  const [open, setOpen] = useState(false);

  const { rutasPendientes } = useSelector(
    (state: { rutas: RutasState }) => state.rutas
  );

  const { user } = useSelector((state: { auth: AuthState }) => state.auth);

  const { getRutasPendientes, asignarRuta, selected } = useEnvios();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = async () => {
    await getRutasPendientes();
    setOpen(true);
  };

  return (
    <>
      {user?.role != "admin" ? (
        <></>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="end"
            gap={2}
            alignItems="center"
            mb={5}
          >
            <Button
              size="large"
              color="secondary"
              variant="outlined"
              onClick={() => handleOpen()}
            >
              Asignar ruta
            </Button>
          </Box>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            disableEscapeKeyDown
            onClose={(event, reason) => {
              if (reason === "backdropClick") return;
              handleClose();
            }}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Asignar envíos a ruta"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setErrors, resetForm }) => {
                    await asignarRuta(
                      selected.map((s) => s.id),
                      values.rutaId,
                      setErrors
                    );
                    resetForm();
                    handleClose();
                  }}
                >
                  {({ setFieldValue, errors, touched, values, resetForm }) => (
                    <Form>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <FormLabel htmlFor="rutaId">Ruta</FormLabel>

                        <Autocomplete
                          options={rutasPendientes}
                          getOptionLabel={({ id, origen, destino }) =>
                            `${id} - ORIGEN: ${origen} - DESTINO: ${destino}`
                          }
                          onChange={(_, value) =>
                            setFieldValue("rutaId", value ? value.id : "")
                          }
                          value={
                            rutasPendientes.find(
                              (r) => r.id == values.rutaId
                            ) || null
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              error={touched.rutaId && Boolean(errors.rutaId)}
                              helperText={<ErrorMessage name="rutaId" />}
                            />
                          )}
                        />
                      </FormControl>

                      <Box display="flex" gap={2} flexDirection="column">
                        <Button type="submit" fullWidth variant="contained">
                          Crear
                        </Button>

                        <Button
                          color="error"
                          type="reset"
                          fullWidth
                          variant="contained"
                          onClick={() => {
                            handleClose();
                            resetForm();
                            setFieldValue("rutaId", "");
                          }}
                        >
                          Cancelar
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};
