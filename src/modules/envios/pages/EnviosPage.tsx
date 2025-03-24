import GenericTableWithModal from "../../common/components/GenericTableWithModal";
import { Envio } from "../entities/envioEntity";
import { useEnvios } from "../hooks/useEnvios";
import * as Yup from "yup";
import { AsignarRuta, EstadoChip, FilterComponent } from "../components";
import ModalWithFormik from "../components/ModalWithFormik";
import { useEffect } from "react";

export const EnviosPage = () => {
  const {
    envios,
    total,
    params,
    handlePageChange,
    createEnvio,
    onChange,
    onFilter,
    onChangeDate,
    onChangeAutoComplete,
    values,
    estados,
    getEnvios,
    getEstados,
    selected,
    asignarSeleccionados,
  } = useEnvios();

  const columns = [
    { header: "ID", render: (item: Envio) => item.id },
    { header: "Codigo de seguimiento", render: (item: Envio) => item.codigo },
    { header: "Tipo de producto", render: (item: Envio) => item.tipoProducto },
    { header: "Usuario", render: (item: Envio) => item.user.name },
    { header: "Dirección", render: (item: Envio) => item.direccion },
    {
      header: "Fecha de registro",
      render: (item: Envio) => new Date(item.createdAt).toLocaleDateString(),
    },
    { header: "Alto (cm)", render: (item: Envio) => item.alto },
    { header: "Ancho (cm)", render: (item: Envio) => item.ancho },
    { header: "Largo (cm)", render: (item: Envio) => item.largo },
    {
      header: "Volumen (cm3)",
      render: (item: Envio) =>
        Number(item.alto) * Number(item.ancho) * Number(item.largo),
    },
    { header: "Peso (kg)", render: (item: Envio) => item.peso },
    {
      header: "Ruta",
      render: (item: Envio) => (item.ruta?.id ? item.ruta.id : "---"),
    },
    {
      header: "Estado",
      render: (item: Envio) => <EstadoChip estado={item.ultimoEstado} />,
    },
  ];

  const validationSchema = Yup.object({
    direccion: Yup.string().required("La dirección es obligatoria"),
    alto: Yup.number()
      .required("El alto es obligatorio")
      .moreThan(0, "El alto debe ser mayor que 0 cm"),
    ancho: Yup.number()
      .required("El ancho es obligatorio")
      .moreThan(0, "El ancho debe ser mayor que 0 cm"),
    largo: Yup.number()
      .required("El largo es obligatorio")
      .moreThan(0, "El largo debe ser mayor que 0 cm"),
    peso: Yup.number()
      .required("El peso es obligatorio")
      .moreThan(0, "El peso debe ser mayor que 0 kg"),
    tipoProducto: Yup.string().required("El tipo de producto es obligatorio"),
  });

  const initialValues = {
    direccion: "",
    alto: 0,
    ancho: 0,
    largo: 0,
    peso: 0,
    tipoProducto: "",
  };

  useEffect(() => {
    getEnvios(params);
  }, [params]);

  useEffect(() => {
    getEstados();
  }, []);

  return (
    <GenericTableWithModal<Envio>
      title="Envíos"
      columns={columns}
      data={envios}
      pageSize={params.size}
      total={total}
      page={params.page}
      onPageChange={handlePageChange}
      selectTable
      accion={<AsignarRuta />}
      onSelect={asignarSeleccionados}
      selected={selected}
      modal={
        <ModalWithFormik
          modalTitle="Crear envío"
          buttonLabel="Crear nuevo envío"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onCreate={createEnvio}
        />
      }
      filterComponent={
        <FilterComponent
          onChange={onChange}
          onFilter={onFilter}
          values={values}
          onChangeDate={onChangeDate}
          onChangeAutoComplete={onChangeAutoComplete}
          estados={estados}
        />
      }
    ></GenericTableWithModal>
  );
};
