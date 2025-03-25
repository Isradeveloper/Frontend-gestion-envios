import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommonState {
  alert: {
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
    duration?: number;
  };
  backdrop: {
    open: boolean;
  };
}

const initialState: CommonState = {
  alert: {
    open: false,
    message: "",
    severity: "success",
    duration: 4000,
  },
  backdrop: {
    open: false,
  },
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    showAlert(
      state,
      action: PayloadAction<{
        message: string;
        severity: "success" | "error" | "warning" | "info";
        duration?: number;
      }>
    ) {
      state.alert.open = true;
      state.alert.message = action.payload.message;
      state.alert.severity = action.payload.severity;
      state.alert.duration = action.payload.duration || 4000;
    },
    hideAlert(state) {
      state.alert.open = false;
    },
    showBackdrop(state) {
      state.backdrop.open = true;
    },
    hideBackdrop(state) {
      state.backdrop.open = false;
    },
  },
});

export const { showAlert, hideAlert, showBackdrop, hideBackdrop } =
  commonSlice.actions;
export default commonSlice.reducer;
