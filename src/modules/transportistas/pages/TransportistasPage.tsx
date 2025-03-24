import GenericTableWithModal from "../../common/components/GenericTableWithModal";
import { Transportista } from "../entities/transportistaEntity";
import { useTransportistas } from "../hooks/useTransportistas";
import * as Yup from "yup";
import { EstadoChip, FilterComponent } from "../components";
import ModalWithFormik from "../components/ModalWithFormik";

export const TransportistasPage = () => {
  const {
    transportistas,
    total,
    params,
    values,
    handlePageChange,
    onChange,
    onFilter,
    createTransportista,
  } = useTransportistas();

  const columns = [
    { header: "ID", render: (item: Transportista) => item.id },
    { header: "Nombre", render: (item: Transportista) => item.nombre },
    { header: "Cédula", render: (item: Transportista) => item.cedula },
    {
      header: "Estado",
      render: (item: Transportista) => (
        <EstadoChip enTransito={item.enTransito} />
      ),
    },
  ];

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    cedula: Yup.string().required("La cédula es obligatoria"),
  });

  const initialValues = {
    nombre: "",
    cedula: "",
  };

  return (
    <GenericTableWithModal<Transportista>
      title="Transportistas"
      columns={columns}
      data={transportistas}
      pageSize={params.size}
      total={total}
      page={params.page}
      onPageChange={handlePageChange}
      filterComponent={<FilterComponent values={values} onChange={onChange} onFilter={onFilter} />}
      modal={
        <ModalWithFormik
          modalTitle="Crear transportista"
          buttonLabel="Crear nuevo transportista"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onCreate={createTransportista}
        />
      }
    ></GenericTableWithModal>
  );
};
