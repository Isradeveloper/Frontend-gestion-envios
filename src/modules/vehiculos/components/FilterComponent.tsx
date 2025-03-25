import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { GetVehiculosParams } from "../services/vehiculosService";

interface FilterProps {
  values: Partial<GetVehiculosParams>;
  onFilter: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterComponent = ({
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
