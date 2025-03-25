import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const Logout = () => {
  const { logoutUser } = useAuth();

  useEffect(() => {
    logoutUser();
  }, []);

  return null; // No renderiza nada
};

export default Logout;
