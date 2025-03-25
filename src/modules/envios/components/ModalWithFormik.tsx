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
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { SetErrors } from "../../common/utils";
import AddressAutocomplete from "../../common/components/AddressAutocomplete";

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
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
  const [formKey, setFormKey] = useState(Date.now());

  const handleClose = (resetForm?: () => void) => {
    setOpen(false);
    if (resetForm) resetForm(); // Resetea Formik
    setFormKey(Date.now()); // Forza la re-renderización de AddressAutocomplete
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
        disableEscapeKeyDown
        onClose={(event, reason) => {
          if (reason === "backdropClick") return;
          handleClose();
        }}
      >
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <Formik
            key={formKey} // Resetea el formulario al reabrir el modal
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors, resetForm }) => {
              await onCreate(values, setErrors);
              resetForm();
              handleClose();
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel htmlFor="tipoProducto">Tipo de producto</FormLabel>
                  <Field
                    as={TextField}
                    id="tipoProducto"
                    name="tipoProducto"
                    placeholder="Paquete"
                    variant="outlined"
                    error={touched.tipoProducto && Boolean(errors.tipoProducto)}
                    helperText={<ErrorMessage name="tipoProducto" />}
                  />
                </FormControl>

                <AddressAutocomplete
                  onSelect={(address) =>
                    setFieldValue("direccion", address.display_name)
                  }
                />
                <Typography variant="subtitle2" color="error">
                  <ErrorMessage name="direccion" />
                </Typography>

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

                {/* Ancho */}
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

                {/* Largo */}
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
          <Button onClick={() => handleClose()}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalWithFormik;
