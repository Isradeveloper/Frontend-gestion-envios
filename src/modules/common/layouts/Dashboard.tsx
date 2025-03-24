import { extendTheme } from "@mui/material/styles";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Outlet } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
const NAVIGATION: Navigation = [
  {
    segment: "envios",
    title: "Envíos",
    icon: <EmailIcon />,
  },
  {
    segment: "transportistas",
    title: "Transportistas",
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
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
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
  return (
    <AppProvider
      navigation={NAVIGATION}
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
