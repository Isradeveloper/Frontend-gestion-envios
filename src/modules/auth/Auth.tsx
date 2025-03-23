import { Route } from "react-router-dom";
import SignIn from "./pages/Login";

const authRoutes = [
  <Route key="signin" path="/signin" element={<SignIn />} />,
];

export default authRoutes;