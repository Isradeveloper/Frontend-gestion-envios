import GenericTableWithModal from "../../common/components/GenericTableWithModal";
import { Ruta } from "../entities/rutaEntity";
import { useRutas } from "../hooks/useRutas";
import * as Yup from "yup";
import { Acciones, EstadoChip, FilterComponent } from "../components";
import ModalWithFormik from "../components/ModalWithFormik";
import { useSelector } from "react-redux";
import { TransportistasState } from "../../transportistas/transportistasSlice";
import { VehiculosState } from "../../vehiculos/vehiculosSlice";
import { useEffect } from "react";

export const RutasPage = () => {
  const {
    rutas,
    total,
    params,
    values,
    handlePageChange,
    onChange,
    onFilter,
    createRuta,
    onChangeDate,
    onChangeAutoComplete,
    getMaestros,
    getRutas,
  } = useRutas();

  useEffect(() => {
    getRutas(params);
  }, [params]);

  useEffect(() => {
    getMaestros();
  }, []);

  const { maestroTransportistas } = useSelector(
    (state: { transportistas: TransportistasState }) => state.transportistas
  );

  const { maestroVehiculos } = useSelector(
    (state: { vehiculos: VehiculosState }) => state.vehiculos
  );

  const columns = [
    { header: "ID", render: (item: Ruta) => item.id },
    {
      header: "Nombre Conductor",
      render: (item: Ruta) => item.transportista.nombre,
    },
    {
      header: "Cédula Conductor",
      render: (item: Ruta) => item.transportista.cedula,
    },
    { header: "Placa", render: (item: Ruta) => item.vehiculo.placa },
    { header: "Origen", render: (item: Ruta) => item.origen },
    { header: "Destino", render: (item: Ruta) => item.destino },
    {
      header: "fechaInicio",
      render: (item: Ruta) =>
        item.fechaInicio
          ? new Date(item.fechaInicio).toLocaleDateString()
          : "---",
    },
    {
      header: "fechaFin",
      render: (item: Ruta) =>
        item.fechaFin ? new Date(item.fechaFin).toLocaleDateString() : "---",
    },
    {
      header: "Estado",
      render: (item: Ruta) => <EstadoChip estado={item.estado} />,
    },
    {
      header: "Acciones",
      render: (item: Ruta) => <Acciones item={item} />,
    },
  ];

  const validationSchema = Yup.object({
    vehiculoId: Yup.string().required("El vehiculo es obligatorio"),
    transportistaId: Yup.string().required("El transportista es obligatorio"),
    origen: Yup.string().required("El origen es obligatorio"),
    destino: Yup.string().required("El destino es obligatorio"),
  });

  const initialValues = {
    vehiculoId: "",
    transportistaId: "",
    origen: "",
    destino: "",
  };

  return (
    <GenericTableWithModal<Ruta>
      title="Rutas"
      columns={columns}
      data={rutas}
      pageSize={params.size}
      total={total}
      page={params.page}
      onPageChange={handlePageChange}
      filterComponent={
        <FilterComponent
          values={values}
          onChange={onChange}
          onFilter={onFilter}
          transportistas={maestroTransportistas}
          vehiculos={maestroVehiculos}
          onChangeDate={onChangeDate}
          onChangeAutoComplete={onChangeAutoComplete}
        />
      }
      modal={
        <ModalWithFormik
          modalTitle="Crear ruta"
          buttonLabel="Crear nueva ruta"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onCreate={createRuta}
          vehiculos={maestroVehiculos.map((vehiculo) => ({
            id: vehiculo.id.toString(),
            label: vehiculo.placa,
          }))}
          transportistas={maestroTransportistas.map((transportista) => ({
            id: transportista.id.toString(),
            label: transportista.nombre,
          }))}
        />
      }
    ></GenericTableWithModal>
  );
};
