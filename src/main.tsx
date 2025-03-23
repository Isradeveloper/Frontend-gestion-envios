import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import GlobalSnackbar from "./modules/common/components/Alert.tsx";
import { CustomBackdrop } from "./modules/common/components/Backdrop.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <GlobalSnackbar />
        <CustomBackdrop />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
