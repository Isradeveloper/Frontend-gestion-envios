import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { AuthState, login, logout } from "../authSlice";
import { onError, SetErrors } from "../../common/utils";
import {
  showBackdrop,
  hideBackdrop,
  showAlert,
} from "../../common/commonSlice";
import { User } from "../entities/userEntity";

interface LoginUser {
  email: string;
  password: string;
}

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});

  const { user } = useSelector((state: { auth: AuthState }) => state.auth);
  const handleAuthProcess = async (
    authFunction: () => Promise<User | undefined>,
    successMessage: string,
    setErrors?: SetErrors
  ) => {
    try {
      dispatch(showBackdrop());
      const userData = await authFunction();
      if (!userData) {
        throw new Error("No se pudo completar la operación");
      }
      dispatch(login(userData));
      navigate("/", { replace: true });
      dispatch(showAlert({ message: successMessage, severity: "success" }));

      return userData;
    } catch (err) {
      onError({ dispatch, error: err, setValidationErrors, setErrors });
      throw err;
    } finally {
      dispatch(hideBackdrop());
    }
  };

  const loginUser = async (
    { email, password }: LoginUser,
    setErrors?: SetErrors
  ) => {
    return handleAuthProcess(
      () => authService.login(email, password),
      "Inicio de sesión exitoso",
      setErrors
    );
  };

  const registerUser = async (
    { name, email, password }: RegisterUser,
    setErrors?: SetErrors
  ) => {
    return handleAuthProcess(
      () => authService.register(name, email, password),
      "Registro exitoso",
      setErrors
    );
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return { loginUser, registerUser, logoutUser, validationErrors, user };
};
