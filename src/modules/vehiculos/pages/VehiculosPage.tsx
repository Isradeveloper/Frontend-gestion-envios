import GenericTableWithModal from "../../common/components/GenericTableWithModal";
import { Vehiculo } from "../entities/vehiculoEntity";
import { useVehiculos } from "../hooks/useVehiculos";
import * as Yup from "yup";
import { EstadoChip, FilterComponent } from "../components";
import ModalWithFormik from "../components/ModalWithFormik";

export const VehiculosPage = () => {
  const {
    vehiculos,
    total,
    params,
    values,
    handlePageChange,
    onChange,
    onFilter,
    createVehiculo,
  } = useVehiculos();

  const columns = [
    { header: "ID", render: (item: Vehiculo) => item.id },
    { header: "Placa", render: (item: Vehiculo) => item.placa },
    { header: "Peso Máximo", render: (item: Vehiculo) => item.pesoMaximo },
    {
      header: "Volumen Máximo",
      render: (item: Vehiculo) => item.volumenMaximo,
    },
    {
      header: "Estado",
      render: (item: Vehiculo) => <EstadoChip enTransito={item.enTransito} />,
    },
  ];

  const validationSchema = Yup.object({
    placa: Yup.string().required("La placa es obligatoria"),
    pesoMaximo: Yup.number()
      .required("El peso máximo es obligatorio")
      .moreThan(0, "El peso máximo debe ser mayor a 0"),
    volumenMaximo: Yup.number()
      .required("El volumen máximo es obligatorio")
      .moreThan(0, "El volumen máximo debe ser mayor a 0"),
  });

  const initialValues = {
    placa: "",
    pesoMaximo: 0,
    volumenMaximo: 0,
  };

  return (
    <GenericTableWithModal<Vehiculo>
      title="Vehículos"
      columns={columns}
      data={vehiculos}
      pageSize={params.size}
      total={total}
      page={params.page}
      onPageChange={handlePageChange}
      filterComponent={
        <FilterComponent
          values={values}
          onChange={onChange}
          onFilter={onFilter}
        />
      }
      modal={
        <ModalWithFormik
          modalTitle="Crear vehículo"
          buttonLabel="Crear nuevo vehículo"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onCreate={createVehiculo}
        />
      }
    ></GenericTableWithModal>
  );
};
