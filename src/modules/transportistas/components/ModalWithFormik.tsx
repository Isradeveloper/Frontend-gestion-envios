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
  ref: React.Ref<unknown>,
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

interface ModalWithFormikProps {
  modalTitle: string;
  buttonLabel: string;
  initialValues: Record<string, unknown>;
  validationSchema: Yup.AnySchema;
  onCreate: (
    values: Record<string, unknown>,
    setErrors: SetErrors,
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
        onClose={(_event, reason) => {
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
                <FormControl
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <FormLabel htmlFor="nombre">Nombre</FormLabel>
                  <Field
                    as={TextField}
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Israel Trujillo"
                    variant="outlined"
                    error={touched.nombre && Boolean(errors.nombre)}
                    helperText={<ErrorMessage name="nombre" />}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <FormLabel htmlFor="cedula">Cédula</FormLabel>
                  <Field
                    as={TextField}
                    id="cedula"
                    name="cedula"
                    type="text"
                    placeholder="123456789"
                    variant="outlined"
                    error={touched.cedula && Boolean(errors.cedula)}
                    helperText={<ErrorMessage name="cedula" />}
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                >
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
