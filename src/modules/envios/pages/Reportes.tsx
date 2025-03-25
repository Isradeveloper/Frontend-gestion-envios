import { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEnvios } from "../hooks/useEnvios";
import { EstadoChip } from "../components";
import ReporteEnviosPorEstado from "../components/ReporteEnviosPorEstado";
import ReporteEnviosCompletadosTransportista from "../components/ReporteEnviosCompletadosTransportista";
import ReportePromedioEntregaPorTransportista from "../components/ReportePromedioEntregaPorTransportista";
import ReporteVolumenPesoPorVehiculo from "../components/ReporteVolumenPesoPorVehiculo";
import { FilterComponentReporte } from "../components/FilterComponentReporte";
import { useRutas } from "../../rutas/hooks/useRutas";

const ReportsPage = () => {
  const {
    getReporte,
    reporte,
    onChangeAutoComplete,
    onChangeDate,
    onFilter,
    estados,
    params,
    getEstados,
  } = useEnvios();

  const { getMaestros, maestroTransportistas, maestroVehiculos } = useRutas();

  const columns: GridColDef<(typeof reporte)[number]>[] = [
    { field: "id", headerName: "ID Envio", width: 90 },
    { field: "codigo", headerName: "Código", width: 150 },
    { field: "tipo_producto", headerName: "Tipo de producto", width: 180 },
    { field: "direccion", headerName: "Dirección", width: 250 },
    {
      field: "created_at",
      headerName: "Fecha de creación",
      width: 150,
      valueGetter: (_value, row) =>
        new Date(row.created_at).toLocaleDateString(),
    },
    { field: "alto", headerName: "Alto (cm)", width: 120 },
    { field: "ancho", headerName: "Ancho (cm)", width: 120 },
    { field: "largo", headerName: "Largo (cm)", width: 120 },
    {
      field: "volumen",
      headerName: "Volumen (cm3)",
      width: 150,
      valueGetter: (_value, row) => row.alto,
    },
    { field: "peso", headerName: "Peso (kg)", width: 120 },
    {
      field: "transportista_nombre",
      headerName: "Conductor",
      width: 180,
      valueGetter: (__value, row) =>
        row.transportista_id ? row.transportista_nombre : "---",
    },
    {
      field: "vehiculo_placa",
      headerName: "Vehículo",
      width: 150,
      valueGetter: (_value, row) => row.vehiculo_placa || "---",
    },
    {
      field: "ultimo_estado",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => <EstadoChip estado={params.value} />,
    },
  ];

  useEffect(() => {
    getReporte(params);
  }, [params]);

  useEffect(() => {
    getEstados();
    getMaestros();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography
        variant="h4"
        gutterBottom
      >
        Reportes
      </Typography>

      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
        >
          <Paper style={{ padding: 16, height: "300px", position: "relative" }}>
            <ReporteEnviosPorEstado data={reporte} />
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
        >
          <Paper style={{ padding: 16, height: "300px", position: "relative" }}>
            <ReporteEnviosCompletadosTransportista data={reporte} />
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
        >
          <Paper style={{ padding: 16, height: "300px", position: "relative" }}>
            <ReportePromedioEntregaPorTransportista data={reporte} />
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
        >
          <Paper style={{ padding: 16, height: "300px", position: "relative" }}>
            <ReporteVolumenPesoPorVehiculo data={reporte} />
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
        >
          <Paper style={{ padding: 16 }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Detalles de envíos
            </Typography>

            <FilterComponentReporte
              onChangeDate={onChangeDate}
              onChangeAutoComplete={onChangeAutoComplete}
              onFilter={onFilter}
              estados={estados}
              transportistas={maestroTransportistas}
              vehiculos={maestroVehiculos}
            />

            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={reporte}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReportsPage;
