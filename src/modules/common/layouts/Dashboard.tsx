import { extendTheme } from "@mui/material/styles";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Outlet } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import { useAuth } from "../../auth/hooks/useAuth";
import Logout from "@mui/icons-material/Logout";

const COMMON = [
  {
    segment: "logout",
    title: "Cerrar sesión",
    icon: <Logout />,
  },
];

const NAVIGATION_ADMIN: Navigation = [
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Administrador",
  },
  {
    segment: "transportistas",
    title: "Transportistas",
    icon: <PersonIcon />,
  },
  {
    segment: "reportes",
    title: "Reportes",
    icon: <PersonIcon />,
  },
  {
    segment: "rutas",
    title: "Rutas",
    icon: <AirlineStopsIcon />,
  },
  {
    segment: "vehiculos",
    title: "Vehículos",
    icon: <AirportShuttleIcon />,
  },
];

const NAVIGATION_CLIENT: Navigation = [
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Cliente",
  },
  {
    segment: "envios",
    title: "Envíos",
    icon: <EmailIcon />,
  },
  {
    segment: "rastreo",
    title: "Rastreo de envíos",
    icon: <EmailIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function DashboardLayoutBasic() {
  const { user } = useAuth();

  return (
    <AppProvider
      navigation={
        user?.role === "cliente"
          ? [...COMMON, ...NAVIGATION_CLIENT]
          : [...COMMON, ...NAVIGATION_ADMIN, ...NAVIGATION_CLIENT]
      }
      theme={demoTheme}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "App",
        homeUrl: "/",
      }}
    >
      <DashboardLayout>
        <PageContainer style={{ maxWidth: "100%" }}>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
