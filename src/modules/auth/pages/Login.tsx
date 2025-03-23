import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AppTheme from "../../common/theme/AppTheme";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { useAuth } from "../hooks/useAuth";
import { CustomCard, CustomContainer } from "../components";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
});

export default function Login(props: { disableCustomTheme?: boolean }) {
  const { loginUser } = useAuth();

  return (
    <>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <CustomContainer direction="column" justifyContent="space-between">
          <CustomCard variant="outlined">
            <Typography component="h1" variant="h4">
              Iniciar sesión
            </Typography>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setErrors }) => {
                await loginUser(values, setErrors);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                    <Field
                      as={TextField}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      variant="outlined"
                      error={touched.email && Boolean(errors.email)}
                      helperText={<ErrorMessage name="email" />}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <FormLabel htmlFor="password">Contraseña</FormLabel>
                    <Field
                      as={TextField}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••"
                      variant="outlined"
                      error={touched.password && Boolean(errors.password)}
                      helperText={<ErrorMessage name="password" />}
                    />
                  </FormControl>
                  <Button type="submit" fullWidth variant="contained">
                    Iniciar sesión
                  </Button>
                </Form>
              )}
            </Formik>
            <Divider />
            <Typography sx={{ textAlign: "center" }}>
              ¿No tienes una cuenta?{" "}
              <Link component={NavLink} to="/register" variant="body2">
                Regístrate
              </Link>
            </Typography>
          </CustomCard>
        </CustomContainer>
      </AppTheme>
    </>
  );
}
