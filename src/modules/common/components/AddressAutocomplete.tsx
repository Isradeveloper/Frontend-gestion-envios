import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { GeocodeResponse } from "../interfaces/geocode";
import { FormLabel } from "@mui/material";
import { apiToken } from "../../../api/backend";

interface AutocompleteProps {
  onSelect: (place: GeocodeResponse) => void;
}

export const AddressAutocomplete = ({ onSelect }: AutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeocodeResponse[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const fetchAddresses = async () => {
      try {
        const response = await apiToken.get<GeocodeResponse[]>(
          `/geocode?address=${encodeURIComponent(debouncedQuery)}`
        );
        if (response.status === 200) {
          const data: GeocodeResponse[] = response.data;
          setSuggestions(data);
          setShowDropdown(true);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [debouncedQuery]);

  const handleSelect = (place: GeocodeResponse) => {
    setQuery(place.display_name);
    setSuggestions([]);
    setShowDropdown(false);
    onSelect(place);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <FormLabel htmlFor="direccion">Dirección</FormLabel>
      <TextField
        id="direccion"
        name="direccion"
        fullWidth
        sx={{ mb: 2 }}
        placeholder="Escribe una dirección..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      {showDropdown && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            width: "100%",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            listStyle: "none",
            padding: 0,
            margin: 0,
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f0f0f0")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
