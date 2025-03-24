import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import {
  GetVehiculosParams,
  vehiculosService,
} from "../services/vehiculosService";
import { onError, SetErrors } from "../../common/utils";
import {
  showBackdrop,
  hideBackdrop,
  showAlert,
} from "../../common/commonSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setVehiculos, VehiculosState } from "../vehiculosSlice";

export const useVehiculos = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState<Partial<GetVehiculosParams>>({
    search: "",
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

  const onFilter = () => {
    setParams((prev) => ({
      ...prev,
      ...values,
      page: 1,
    }));
  };

  const [params, setParams] = useState<GetVehiculosParams>({
    page: 1,
    size: 10,
    search: "",
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});

  const { vehiculos, total } = useSelector(
    (state: { vehiculos: VehiculosState }) => state.vehiculos
  );

  const getVehiculos = useCallback(
    async (params: GetVehiculosParams) => {
      try {
        dispatch(showBackdrop());

        const response = await vehiculosService.getVehiculos(params);

        if (!response || !response.items) {
          throw new Error("No se pudieron obtener los vehículos.");
        }

        dispatch(
          setVehiculos({
            vehiculos: response.items,
            total: response.total,
            params,
          })
        );
        dispatch(
          showAlert({
            message: "Envíos obtenidos exitosamente",
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
    },
    [dispatch]
  );

  const createVehiculo = async (
    vehiculo: Record<string, unknown>,
    setErrors?: SetErrors
  ) => {
    try {
      dispatch(showBackdrop());

      const response = await vehiculosService.createVehiculo(vehiculo);

      if (!response) {
        throw new Error("No se pudo crear el vehiculo.");
      }

      dispatch(
        showAlert({
          message: "Vehiculo creado exitosamente",
          severity: "success",
        })
      );

      getVehiculos(params);
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

  useEffect(() => {
    getVehiculos(params);
  }, [getVehiculos, params]);

  return {
    validationErrors,
    vehiculos,
    total,
    params,
    values,
    setParams,
    setValues,
    getVehiculos,
    onFilter,
    handlePageChange,
    onChange,
    createVehiculo,
  };
};
