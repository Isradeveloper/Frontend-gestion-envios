import { Routes, Route, Navigate } from "react-router-dom";
import authRoutes from "./modules/auth/Routes";
import DashboardLayoutBasic from "./modules/common/layouts/Dashboard";
import { useSelector } from "react-redux";
import { AuthState } from "./modules/auth/authSlice";
import { JSX } from "react";

// Redirige a home si el usuario ya está autenticado
const AuthRedirect = ({ children }: { children: JSX.Element }) => {
  const { user } = useSelector((state: { auth: AuthState }) => state.auth);
  return user ? <Navigate to="/" replace /> : children;
};

// Ruta protegida para autenticados
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, status } = useSelector(
    (state: { auth: AuthState }) => state.auth
  );
  return !user || status === "unauthenticated" ? (
    <Navigate to="/login" replace />
  ) : (
    children
  );
};

function App() {
  return (
    <Routes>
      {/* Rutas de autenticación protegidas para usuarios autenticados */}
      {authRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<AuthRedirect>{element}</AuthRedirect>}
        />
      ))}

      {/* Ruta protegida para el dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayoutBasic />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
