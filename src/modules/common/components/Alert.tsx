// components/GlobalSnackbar.js
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { hideAlert, CommonState } from "../commonSlice";

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity, duration } = useSelector(
    (state: { common: CommonState }) => state.common.alert
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={duration}
      onClose={(_, reason) => {
        if (reason === "timeout") {
          dispatch(hideAlert());
        }
      }}
    >
      <Alert severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
