import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import dayjs from "dayjs";
import { GetEnviosParams } from "../services/enviosService";
import { EstadoMaestro } from "../entities/envioEntity";

interface FilterProps {
  onChangeDate: (value: dayjs.Dayjs | null, name: string) => void;
  onChangeAutoComplete: (
    event: React.SyntheticEvent,
    newValue: string | null,
    name: string
  ) => void;
  values: Partial<GetEnviosParams>;
  onFilter: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  estados: EstadoMaestro[];
}

export const FilterComponent = ({
  onChangeDate,
  onChangeAutoComplete,
  estados,
  values,
  onChange,
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
        options={estados.map((estado) => estado.name)}
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
  );
};
