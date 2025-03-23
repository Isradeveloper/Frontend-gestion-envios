import { AxiosError } from "axios";
import { showAlert } from "../commonSlice";
import { AppDispatch } from "../../../store";
import { FormikErrors } from "formik/dist/types";

interface ErrorFormatted {
  message: string;
  status: number;
  type: "axios" | "unknown" | "validation";
  errors?: Record<string, string[]>;
}

export const handleErrors = (error: unknown): ErrorFormatted => {
  if (error instanceof AxiosError) {
    // Verificar conexión a internet
    if (!navigator.onLine) {
      return {
        message: "Error de conexión: No tienes conexión a internet.",
        status: 0,
        type: "axios",
      };
    }

    // Manejo de timeout en la solicitud
    if (error.code === "ECONNABORTED") {
      return {
        message:
          "Error de conexión: La solicitud tardó demasiado en responder.",
        status: 0,
        type: "axios",
      };
    }

    // Error de red genérico
    if (error.message.includes("Network Error")) {
      return {
        message:
          "Error de conexión: No se pudo establecer comunicación con el servidor.",
        status: 0,
        type: "axios",
      };
    }

    // Si hay una respuesta del servidor
    if (error.response) {
      const { status, data } = error.response;

      // Error de validación
      if (
        status === 400 &&
        data?.message === "Validation error" &&
        data?.errors
      ) {
        return {
          message: "Error de validación",
          status: 400,
          type: "validation",
          errors: data.errors,
        };
      }

      return {
        message: `${status}: ${data?.message || "Respuesta no disponible"}`,
        status,
        type: "axios",
      };
    }

    // Si no hay respuesta del servidor
    if (error.request) {
      return {
        message: "No se recibió respuesta del servidor.",
        status: 0,
        type: "axios",
      };
    }

    // Otro tipo de error de Axios
    return {
      message: `Error en la solicitud: ${error.message}`,
      status: 0,
      type: "axios",
    };
  }

  // Manejo de errores genéricos en JS
  if (error instanceof Error) {
    return {
      message: error.message,
      status: 0,
      type: "unknown",
    };
  }

  // Error desconocido
  return {
    message: "Error desconocido",
    status: 0,
    type: "unknown",
  };
};

interface onErrorProps {
  dispatch: AppDispatch;
  error: unknown;
  setValidationErrors?: (errors: Record<string, string[]>) => void;
  setErrors?: SetErrors;
}

export interface SetErrors {
  (errors: FormikErrors<Record<string, string[]>>): void;
}

export const onError = ({
  dispatch,
  error,
  setValidationErrors,
  setErrors,
}: onErrorProps) => {
  const errorFormatted = handleErrors(error);

  if (errorFormatted.type === "validation") {
    const errors = errorFormatted.errors ?? {};

    setValidationErrors?.(errors);
    setErrors?.(
      Object.fromEntries(
        Object.entries(errors).map(([field, messages]) => [
          field,
          messages.join(", "),
        ])
      )
    );
  } else {
    setValidationErrors?.({});
  }

  dispatch(showAlert({ message: errorFormatted.message, severity: "error" }));
};
