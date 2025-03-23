import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEnvios } from "../hooks/useEnvios";
import { Envio } from "../entities/envioEntity";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";
import { Slide } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = Yup.object({
  direccion: Yup.string().required("La dirección es obligatoria"),
  alto: Yup.number()
    .required("El alto es obligatorio")
    .moreThan(0, "El alto debe ser mayor que 0 cm"),
  ancho: Yup.number()
    .required("El ancho es obligatorio")
    .moreThan(0, "El ancho debe ser mayor que 0 cm"),
  largo: Yup.number()
    .required("El largo es obligatorio")
    .moreThan(0, "El largo debe ser mayor que 0 cm"),
  peso: Yup.number()
    .required("El peso es obligatorio")
    .moreThan(0, "El peso debe ser mayor que 0 kg"),
  tipoProducto: Yup.string().required("El tipo de producto es obligatorio"),
});

export default function EnviosList() {
  const {
    envios,
    total,
    params,
    values,
    handlePageChange,
    onChange,
    onChangeAutoComplete,
    onChangeDate,
    onFilter,
    createEnvio,
  } = useEnvios();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
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
        <DialogTitle>{"Crear un nuevo envío"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              direccion: "",
              alto: 0,
              ancho: 0,
              largo: 0,
              peso: 0,
              tipoProducto: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors, resetForm }) => {
              await createEnvio(values, setErrors);
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

      <Typography variant="h4" gutterBottom>
        Envíos
      </Typography>

      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        mt={2}
        position="sticky"
        bottom={0}
        pb={5}
        zIndex={1}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          size="large"
          onClick={handleOpen}
        >
          Registrar nuevo envío
        </Button>
      </Box>

      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        mt={2}
        position="sticky"
        bottom={0}
        pb={5}
        gap={2}
        zIndex={1}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Desde"
            sx={{ width: "150px" }}
            name="fechaInicio"
            onChange={(value) => onChangeDate(value!, "fechaInicio")}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Hasta"
            sx={{ width: "150px" }}
            name="fechaFin"
            onChange={(value) => onChangeDate(value!, "fechaFin")}
          />
        </LocalizationProvider>

        <Autocomplete
          options={["En transito", "En espera"]}
          sx={{ width: 300 }}
          onChange={(event: React.SyntheticEvent, newValue: string | null) => {
            onChangeAutoComplete(event, newValue, "estado");
          }}
          renderInput={(params) => (
            <TextField {...params} label="Filtro" size="medium" />
          )}
        />

        <TextField
          id="search"
          label="Buscar"
          name="search"
          type="search"
          variant="outlined"
          sx={{ width: "300px" }}
          size="medium"
          value={values.search}
          onChange={onChange}
        />

        <IconButton
          aria-label="filter"
          size="large"
          color="primary"
          onClick={onFilter}
        >
          <FilterAltIcon fontSize="inherit" />
        </IconButton>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Codigo de seguimiento
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Tipo de producto
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Usuario
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Dirección
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Fecha de creación
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Peso (Kg)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Alto (cm)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Ancho (cm)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Largo (cm)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Estado
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {envios.map((envio: Envio) => (
              <TableRow
                key={envio.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{envio.id}</TableCell>
                <TableCell align="center">{envio.codigo}</TableCell>
                <TableCell align="center">{envio.tipoProducto}</TableCell>
                <TableCell align="center">{envio.user.name}</TableCell>
                <TableCell align="center">{envio.direccion}</TableCell>
                <TableCell align="center">
                  {new Date(envio.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{envio.peso}</TableCell>
                <TableCell align="center">{envio.alto}</TableCell>
                <TableCell align="center">{envio.ancho}</TableCell>
                <TableCell align="center">{envio.largo}</TableCell>
                <TableCell align="center">
                  {envio.ultimoEstado == "En transito" ? (
                    <Chip
                      label="En transito"
                      color="primary"
                      variant="outlined"
                    />
                  ) : (
                    <Chip
                      label="En espera"
                      color="warning"
                      variant="outlined"
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={2}
        position="sticky"
        bottom={0}
        p={2}
        zIndex={1}
        borderTop="1px solid #e0e0e0"
        bgcolor={(theme) =>
          theme.palette.mode === "dark" ? "#333" : "#f5f5f5"
        }
      >
        <Pagination
          count={total}
          size="large"
          color="primary"
          page={params.page}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
}
