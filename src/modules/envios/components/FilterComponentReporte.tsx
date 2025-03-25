import { Box, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete } from "@mui/material";
import { IconButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import dayjs from "dayjs";
import { EstadoMaestro } from "../entities/envioEntity";
import { TransportistaMaestro } from "../../transportistas/entities/transportistaEntity";
import { VehiculoMaestro } from "../../vehiculos/entities/vehiculoEntity";

interface FilterProps {
  onChangeDate: (value: dayjs.Dayjs | null, name: string) => void;
  onChangeAutoComplete: (
    event: React.SyntheticEvent,
    newValue: string | null,
    name: string
  ) => void;
  transportistas: TransportistaMaestro[];
  vehiculos: VehiculoMaestro[];
  onFilter: () => void;
  estados: EstadoMaestro[];
}

export const FilterComponentReporte = ({
  onChangeDate,
  onChangeAutoComplete,
  estados,
  transportistas,
  vehiculos,
  onFilter,
}: FilterProps) => {
  return (
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
        options={vehiculos.map((vehiculo) => ({
          label: vehiculo.placa,
          value: vehiculo.id,
        }))}
        sx={{ width: 200 }}
        getOptionLabel={(option) => option.label}
        onChange={(
          event: React.SyntheticEvent,
          newValue: { label: string; value: number } | null
        ) => {
          onChangeAutoComplete(
            event,
            newValue?.value.toString() || null,
            "vehiculoId"
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label="Vehiculo" size="medium" />
        )}
      />
      <Autocomplete
        options={transportistas.map((transportista) => ({
          label: transportista.nombre,
          value: transportista.id,
        }))}
        sx={{ width: 200 }}
        getOptionLabel={(option) => option.label}
        onChange={(
          event: React.SyntheticEvent,
          newValue: { label: string; value: number } | null
        ) => {
          onChangeAutoComplete(
            event,
            newValue?.value.toString() || null,
            "transportistaId"
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label="Transportista" size="medium" />
        )}
      />

      <Autocomplete
        options={estados.map((estado) => ({
          label: estado.name,
          value: estado.id,
        }))}
        sx={{ width: 200 }}
        getOptionLabel={(option) => option.label}
        onChange={(
          event: React.SyntheticEvent,
          newValue: { label: string; value: number } | null
        ) => {
          onChangeAutoComplete(
            event,
            newValue?.value.toString() || null,
            "estado"
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label="Estado" size="medium" />
        )}
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
  );
};
