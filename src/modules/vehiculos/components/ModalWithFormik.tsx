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
                  <FormLabel htmlFor="placa">Placa</FormLabel>
                  <Field
                    as={TextField}
                    id="placa"
                    name="placa"
                    type="text"
                    placeholder="ABC123"
                    variant="outlined"
                    error={touched.placa && Boolean(errors.placa)}
                    helperText={<ErrorMessage name="placa" />}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <FormLabel htmlFor="pesoMaximo">Peso máximo (kg)</FormLabel>
                  <Field
                    as={TextField}
                    id="pesoMaximo"
                    name="pesoMaximo"
                    type="number"
                    placeholder="52"
                    variant="outlined"
                    error={touched.pesoMaximo && Boolean(errors.pesoMaximo)}
                    helperText={<ErrorMessage name="pesoMaximo" />}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <FormLabel htmlFor="volumenMaximo">
                    Volumen máximo (cm3)
                  </FormLabel>
                  <Field
                    as={TextField}
                    id="volumenMaximo"
                    name="volumenMaximo"
                    type="number"
                    placeholder="5000"
                    variant="outlined"
                    error={
                      touched.volumenMaximo && Boolean(errors.volumenMaximo)
                    }
                    helperText={<ErrorMessage name="volumenMaximo" />}
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
