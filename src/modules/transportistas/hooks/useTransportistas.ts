import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import {
  GetTransportistasParams,
  transportistasService,
} from "../services/transportistasService";
import { onError, SetErrors } from "../../common/utils";
import {
  showBackdrop,
  hideBackdrop,
  showAlert,
} from "../../common/commonSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setTransportistas, TransportistasState } from "../transportistasSlice";

export const useTransportistas = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState<Partial<GetTransportistasParams>>({
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

  const [params, setParams] = useState<GetTransportistasParams>({
    page: 1,
    size: 10,
    search: "",
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});

  const { transportistas, total } = useSelector(
    (state: { transportistas: TransportistasState }) => state.transportistas
  );

  const getTransportistas = useCallback(
    async (params: GetTransportistasParams) => {
      try {
        dispatch(showBackdrop());

        const response = await transportistasService.getTransportistas(params);

        if (!response || !response.items) {
          throw new Error("No se pudieron obtener los transportistas.");
        }

        dispatch(
          setTransportistas({
            transportistas: response.items,
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

  const createTransportista = async (
    transportista: Record<string, unknown>,
    setErrors?: SetErrors
  ) => {
    try {
      dispatch(showBackdrop());

      const response =
        await transportistasService.createTransportista(transportista);

      if (!response) {
        throw new Error("No se pudo crear el transportista.");
      }

      dispatch(
        showAlert({
          message: "Transportista creado exitosamente",
          severity: "success",
        })
      );

      getTransportistas(params);
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
    getTransportistas(params);
  }, [getTransportistas, params]);

  return {
    validationErrors,
    transportistas,
    total,
    params,
    values,
    setParams,
    setValues,
    getTransportistas,
    onFilter,
    handlePageChange,
    onChange,
    createTransportista,
  };
};
