import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import dayjs from "dayjs";
import { GetRutasParams } from "../services/rutasService";
import { TransportistaMaestro } from "../../transportistas/entities/transportistaEntity";
import { VehiculoMaestro } from "../../vehiculos/entities/vehiculoEntity";

interface FilterProps {
  onChangeDate: (value: dayjs.Dayjs | null, name: string) => void;
  onChangeAutoComplete: (
    event: React.SyntheticEvent,
    newValue: string | null,
    name: string
  ) => void;
  values: Partial<GetRutasParams>;
  onFilter: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  transportistas: TransportistaMaestro[];
  vehiculos: VehiculoMaestro[];
}

export const FilterComponent = ({
  onChangeDate,
  onChangeAutoComplete,
  transportistas,
  values,
  onChange,
  onFilter,
  vehiculos,
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
          label="Iniciadas en"
          sx={{ width: "150px" }}
          name="fechaInicio"
          onChange={(value) => onChangeDate(value!, "fechaInicio")}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Finalizadas en"
          sx={{ width: "150px" }}
          name="fechaFin"
          onChange={(value) => onChangeDate(value!, "fechaFin")}
        />
      </LocalizationProvider>

      <Autocomplete<{ label: string; value: string }, false, false, false>
        options={transportistas.map(({ id, nombre, cedula }) => ({
          label: `${nombre} - ${cedula}`,
          value: id.toString(),
        }))}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => {
          onChangeAutoComplete(
            event,
            newValue?.value || null,
            "transportistaId"
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Transportista"
            variant="outlined"
            sx={{ width: "200px" }}
          />
        )}
      />

      <Autocomplete<{ label: string; value: string }, false, false, false>
        options={vehiculos.map(({ id, placa }) => ({
          label: placa,
          value: id.toString(),
        }))}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => {
          onChangeAutoComplete(event, newValue?.value || null, "vehiculoId");
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Vehiculo"
            variant="outlined"
            sx={{ width: "200px" }}
          />
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
  );
};
