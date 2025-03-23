import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { hideBackdrop } from "../commonSlice";
import { useDispatch } from "react-redux";

export const CustomBackdrop = () => {
  const { open } = useSelector(
    (state: { common: { backdrop: { open: boolean } } }) =>
      state.common.backdrop
  );
  const dispatch = useDispatch();

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: 99999 })}
      open={open}
      onClick={() => dispatch(hideBackdrop())}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};
