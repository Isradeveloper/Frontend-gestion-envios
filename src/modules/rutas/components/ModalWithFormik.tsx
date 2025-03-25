import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Slide,
  FormControl,
  FormLabel,
  TextField,
  Autocomplete,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { SetErrors } from "../../common/utils";
import { Box } from "@mui/material";

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
  vehiculos: { id: string; label: string }[];
  transportistas: { id: string; label: string }[];
}

const ModalWithFormik = ({
  modalTitle,
  buttonLabel,
  initialValues,
  validationSchema,
  onCreate,
  vehiculos,
  transportistas,
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
            {({ setFieldValue, errors, touched, values, resetForm }) => (
              <Form>
                <FormControl
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <FormLabel htmlFor="vehiculoId">Vehículo</FormLabel>
                  <Autocomplete
                    options={vehiculos}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) =>
                      setFieldValue("vehiculoId", value ? value.id : "")
                    }
                    value={
                      vehiculos.find((v) => v.id == values.vehiculoId) || null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        error={touched.vehiculoId && Boolean(errors.vehiculoId)}
                        helperText={<ErrorMessage name="vehiculoId" />}
                      />
                    )}
                  />
                </FormControl>

                <FormControl
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <FormLabel htmlFor="transportistaId">Transportista</FormLabel>
                  <Autocomplete
                    options={transportistas}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) =>
                      setFieldValue("transportistaId", value ? value.id : "")
                    }
                    value={
                      transportistas.find(
                        (v) => v.id == values.transportistaId,
                      ) || null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        error={
                          touched.transportistaId &&
                          Boolean(errors.transportistaId)
                        }
                        helperText={<ErrorMessage name="transportistaId" />}
                      />
                    )}
                  />
                </FormControl>

                <FormControl
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <FormLabel htmlFor="origen">Origen</FormLabel>
                  <Field
                    as={TextField}
                    id="origen"
                    name="origen"
                    type="text"
                    placeholder="Ciudad de origen"
                    variant="outlined"
                    error={touched.origen && Boolean(errors.origen)}
                    helperText={<ErrorMessage name="origen" />}
                  />
                </FormControl>

                <FormControl
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <FormLabel htmlFor="destino">Destino</FormLabel>
                  <Field
                    as={TextField}
                    id="destino"
                    name="destino"
                    type="text"
                    placeholder="Ciudad de destino"
                    variant="outlined"
                    error={touched.destino && Boolean(errors.destino)}
                    helperText={<ErrorMessage name="destino" />}
                  />
                </FormControl>

                <Box
                  display="flex"
                  gap={2}
                  flexDirection="column"
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Crear
                  </Button>

                  <Button
                    type="reset"
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      handleClose();
                      resetForm();
                      setFieldValue("vehiculoId", "");
                      setFieldValue("transportistaId", "");
                    }}
                  >
                    Cancelar
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalWithFormik;
