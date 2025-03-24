import { useDispatch } from "react-redux";
import { useState } from "react";
import { enviosService, GetEnviosParams } from "../services/enviosService";
import {
  EnviosState,
  setEnvios,
  setEstados,
  setEstadosPorCode,
  setSelected,
} from "../enviosSlice";
import { onError, SetErrors } from "../../common/utils";
import {
  showBackdrop,
  hideBackdrop,
  showAlert,
} from "../../common/commonSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { AuthState } from "../../auth/authSlice";
import { rutasService } from "../../rutas/services/rutasService";
import { setRutasPendientes } from "../../rutas/rutasSlice";
import { Envio } from "../entities/envioEntity";

export const useEnvios = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState<Partial<GetEnviosParams>>({
    search: "",
    estado: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setParams((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeAutoComplete = (
    event: React.SyntheticEvent,
    newValue: string | null,
    name: string
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

  const onFilter = () => {
    setParams((prev) => ({
      ...prev,
      ...values,
      page: 1,
    }));
  };

  const [params, setParams] = useState<GetEnviosParams>({
    page: 1,
    size: 10,
    search: "",
    estado: "",
    fechaInicio: "",
    fechaFin: "",
    transportistaId: undefined,
    UsuarioId: undefined,
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});

  const { envios, total, estados, selected, estadosPorCode } = useSelector(
    (state: { envios: EnviosState }) => state.envios
  );

  const { user } = useSelector((state: { auth: AuthState }) => state.auth);

  const getEnvios = async (params: GetEnviosParams) => {
    try {
      dispatch(showBackdrop());

      const response = await enviosService.getEnvios(params);

      if (!response || !response.items) {
        throw new Error("No se pudieron obtener los envíos.");
      }

      dispatch(
        setEnvios({
          envios: response.items,
          total: response.total,
          params,
        })
      );

      return response;
    } catch (err) {
      onError({
        dispatch,
        error: err,
        setValidationErrors,
      });
      throw err;
    } finally {
      dispatch(hideBackdrop());
    }
  };

  const getRutasPendientes = async () => {
    try {
      dispatch(showBackdrop());

      const response = await rutasService.getRutasPendientes();

      if (!response) {
        throw new Error("No se pudieron obtener las rutas.");
      }

      dispatch(setRutasPendientes(response));
      dispatch(
        showAlert({
          message: "Rutas obtenidas exitosamente",
          severity: "success",
        })
      );

      return response;
    } catch (err) {
      onError({
        dispatch,
        error: err,
        setValidationErrors,
      });
      throw err;
    } finally {
      dispatch(hideBackdrop());
    }
  };

  const getEstados = async () => {
    try {
      dispatch(showBackdrop());
      const estados = await enviosService.getEstados();
      if (!estados) {
        throw new Error("No se pudieron obtener los estados.");
      }
      dispatch(setEstados(estados));
    } catch (err) {
      onError({
        dispatch,
        error: err,
        setValidationErrors,
      });
    } finally {
      dispatch(hideBackdrop());
    }
  };

  const createEnvio = async (
    envio: Record<string, unknown>,
    setErrors?: SetErrors
  ) => {
    try {
      dispatch(showBackdrop());

      if (!user) {
        throw new Error("No se pudo crear el envío.");
      }

      const response = await enviosService.createEnvio(envio, user.id);

      if (!response) {
        throw new Error("No se pudo crear el envío.");
      }

      dispatch(
        showAlert({
          message: `Envío creado exitosamente tu codigo de seguimiento es ${response.codigo} `,
          severity: "success",
          duration: 10000,
        })
      );

      await getEnvios(params);
    } catch (err) {
      onError({
        dispatch,
        error: err,
        setValidationErrors,
        setErrors,
      });
      throw err;
    } finally {
      dispatch(hideBackdrop());
    }
  };

  const asignarSeleccionados = (selected: Envio[]) => {
    dispatch(setSelected(selected));
  };

  const asignarRuta = async (
    enviosIds: number[],
    rutaId: number,
    setErrors?: SetErrors
  ) => {
    try {
      dispatch(showBackdrop());

      const response = await enviosService.asignarRuta(enviosIds, rutaId);
      if (!response) throw new Error("No se pudo crear la ruta.");
      dispatch(
        showAlert({
          message: "Ruta asignada exitosamente",
          severity: "success",
        })
      );
      await getEnvios(params);
      asignarSeleccionados([]);
    } catch (err) {
      onError({ dispatch, error: err, setValidationErrors, setErrors });
    } finally {
      dispatch(hideBackdrop());
    }
  };

  const getEstadosPorCode = async (codigo: string) => {
    try {
      dispatch(showBackdrop());
      const estados = await enviosService.getEstadosByCode(codigo);
      if (!estados) {
        throw new Error("No se pudieron obtener los estados.");
      }
      dispatch(setEstadosPorCode({ code: codigo, estados }));

      dispatch(
        showAlert({
          message: `Historial para el envío ${codigo} obtenido exitosamente`,
          severity: "success",
        })
      );

      return estados;
    } catch (err) {
      onError({
        dispatch,
        error: err,
        setValidationErrors,
      });
    } finally {
      dispatch(hideBackdrop());
    }
  };

  return {
    validationErrors,
    envios,
    total,
    params,
    values,
    estados,
    selected,
    estadosPorCode,
    setParams,
    setValues,
    getEnvios,
    onFilter,
    handlePageChange,
    onChange,
    onChangeAutoComplete,
    onChangeDate,
    createEnvio,
    getRutasPendientes,
    getEstados,
    asignarRuta,
    asignarSeleccionados,
    getEstadosPorCode,
  };
};
