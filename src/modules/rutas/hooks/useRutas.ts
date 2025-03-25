import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { GetRutasParams, rutasService } from "../services/rutasService";
import { onError, SetErrors } from "../../common/utils";
import {
  showBackdrop,
  hideBackdrop,
  showAlert,
} from "../../common/commonSlice";
import { setRutas, RutasState } from "../rutasSlice";
import { transportistasService } from "../../transportistas/services/transportistasService";
import {
  setMaestroTransportistas,
  TransportistasState,
} from "../../transportistas/transportistasSlice";
import { vehiculosService } from "../../vehiculos/services/vehiculosService";
import {
  setMaestroVehiculos,
  VehiculosState,
} from "../../vehiculos/vehiculosSlice";
import dayjs from "dayjs";

export const useRutas = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState<Partial<GetRutasParams>>({ search: "" });
  const [params, setParams] = useState<GetRutasParams>({
    page: 1,
    size: 10,
    search: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});
  const { rutas, total } = useSelector(
    (state: { rutas: RutasState }) => state.rutas,
  );
  const { maestroVehiculos } = useSelector(
    (state: { vehiculos: VehiculosState }) => state.vehiculos,
  );
  const { maestroTransportistas } = useSelector(
    (state: { transportistas: TransportistasState }) => state.transportistas,
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setParamsSafely({ ...params, page: value });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onFilter = () => {
    setParamsSafely({ ...params, ...values, page: 1 });
  };

  const setParamsSafely = (newParams: GetRutasParams) => {
    setParams((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(newParams)) return prev;
      return newParams;
    });
  };

  const getRutas = async (params: GetRutasParams) => {
    try {
      dispatch(showBackdrop());
      const response = await rutasService.getRutas(params);
      if (!response || !response.items)
        throw new Error("No se pudieron obtener las rutas.");
      dispatch(
        setRutas({ rutas: response.items, total: response.total, params }),
      );
    } catch (err) {
      onError({ dispatch, error: err, setValidationErrors });
    } finally {
      dispatch(hideBackdrop());
    }
  };

  const createRuta = async (
    ruta: Record<string, unknown>,
    setErrors?: SetErrors,
  ) => {
    try {
      dispatch(showBackdrop());

      const response = await rutasService.createRuta(ruta);
      if (!response) throw new Error("No se pudo crear la ruta.");
      dispatch(
        showAlert({ message: "Ruta creada exitosamente", severity: "success" }),
      );
      getRutas(params);
    } catch (err) {
      onError({ dispatch, error: err, setValidationErrors, setErrors });
    } finally {
      dispatch(hideBackdrop());
    }
  };

  const changeEstado = async (id: number, estado: string) => {
    try {
      dispatch(showBackdrop());
      const response = await rutasService.changeEstado(id, estado);
      if (!response)
        throw new Error("No se pudo cambiar el estado de la ruta.");
      dispatch(
        showAlert({
          message: "Estado de la ruta cambiado exitosamente",
          severity: "success",
        }),
      );
      getRutas(params);
    } catch (err) {
      onError({ dispatch, error: err, setValidationErrors });
    } finally {
      dispatch(hideBackdrop());
    }
  };

  const getMaestros = async () => {
    try {
      dispatch(showBackdrop());
      const transportistas =
        await transportistasService.getMaestroTransportistas();
      if (!transportistas)
        throw new Error("No se pudieron obtener los transportistas.");
      dispatch(
        setMaestroTransportistas({ maestroTransportistas: transportistas }),
      );
      const vehiculos = await vehiculosService.getMaestroVehiculos();
      if (!vehiculos) throw new Error("No se pudieron obtener los vehículos.");
      dispatch(setMaestroVehiculos({ maestroVehiculos: vehiculos }));
    } catch (err) {
      onError({ dispatch, error: err, setValidationErrors });
    } finally {
      dispatch(hideBackdrop());
    }
  };

  const onChangeAutoComplete = (
    _event: React.SyntheticEvent,
    newValue: string | null,
    name: string,
  ) => {
    setValues((prev) => ({
      ...prev,
      [name]: newValue || "",
    }));
  };

  const onChangeDate = (value: dayjs.Dayjs | null, name: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: value?.format("YYYY-MM-DD") || "",
    }));
  };

  return {
    validationErrors,
    rutas,
    total,
    params,
    values,
    maestroTransportistas,
    maestroVehiculos,
    setParams,
    setValues,
    getRutas,
    onFilter,
    onChangeDate,
    onChangeAutoComplete,
    handlePageChange,
    onChange,
    createRuta,
    changeEstado,
    getMaestros,
  };
};
