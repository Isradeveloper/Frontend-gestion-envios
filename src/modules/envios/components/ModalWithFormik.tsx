import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Slide,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { SetErrors } from "../../common/utils";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalWithFormikProps {
  modalTitle: string;
  buttonLabel: string;
  initialValues: Record<string, unknown>;
  validationSchema: Yup.AnySchema;
  onCreate: (
    values: Record<string, unknown>,
    setErrors: SetErrors
  ) => Promise<void>;
}

const ModalWithFormik = ({
  modalTitle,
  buttonLabel,
  initialValues,
  validationSchema,
  onCreate,
}: ModalWithFormikProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        size="large"
      >
        {buttonLabel}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        disableEscapeKeyDown
        onClose={(event, reason) => {
          if (reason === "backdropClick") return;
          handleClose();
        }}
      >
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors, resetForm }) => {
              await onCreate(values, setErrors);
              resetForm();
              handleClose();
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel htmlFor="tipoProducto">Tipo de producto</FormLabel>
                  <Field
                    as={TextField}
                    id="tipoProducto"
                    name="tipoProducto"
                    type="tipoProducto"
                    placeholder="Paquete"
                    variant="outlined"
                    error={touched.tipoProducto && Boolean(errors.tipoProducto)}
                    helperText={<ErrorMessage name="tipoProducto" />}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel htmlFor="direccion">Dirección</FormLabel>
                  <Field
                    as={TextField}
                    id="direccion"
                    name="direccion"
                    type="text"
                    placeholder="123 Main St"
                    variant="outlined"
                    error={touched.direccion && Boolean(errors.direccion)}
                    helperText={<ErrorMessage name="direccion" />}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel htmlFor="alto">Alto (cm)</FormLabel>
                  <Field
                    as={TextField}
                    id="alto"
                    name="alto"
                    type="number"
                    placeholder="30"
                    variant="outlined"
                    error={touched.alto && Boolean(errors.alto)}
                    helperText={<ErrorMessage name="alto" />}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel htmlFor="ancho">Ancho (cm)</FormLabel>
                  <Field
                    as={TextField}
                    id="ancho"
                    name="ancho"
                    type="number"
                    placeholder="30"
                    variant="outlined"
                    error={touched.ancho && Boolean(errors.ancho)}
                    helperText={<ErrorMessage name="ancho" />}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel htmlFor="largo">Largo (cm)</FormLabel>
                  <Field
                    as={TextField}
                    id="largo"
                    name="largo"
                    type="number"
                    placeholder="30"
                    variant="outlined"
                    error={touched.largo && Boolean(errors.largo)}
                    helperText={<ErrorMessage name="largo" />}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel htmlFor="peso">Peso (kg)</FormLabel>
                  <Field
                    as={TextField}
                    id="peso"
                    name="peso"
                    type="number"
                    placeholder="30"
                    variant="outlined"
                    error={touched.peso && Boolean(errors.peso)}
                    helperText={<ErrorMessage name="peso" />}
                  />
                </FormControl>
                <Button type="submit" fullWidth variant="contained">
                  Crear
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalWithFormik;
