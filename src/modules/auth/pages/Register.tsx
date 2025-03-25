import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AppTheme from "../../common/theme/AppTheme";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import { CustomCard, CustomContainer } from "../components";
import { useAuth } from "../hooks/useAuth";

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre completo es obligatorio"),
  email: Yup.string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("La confirmación de contraseña es obligatoria"),
});

export default function Login(props: { disableCustomTheme?: boolean }) {
  const { registerUser } = useAuth();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <CustomContainer direction="column" justifyContent="space-between">
        <CustomCard variant="outlined">
          <Typography component="h1" variant="h4">
            Registrarse
          </Typography>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async ({ name, email, password }, { setErrors }) => {
              await registerUser({ name, email, password }, setErrors);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel htmlFor="name">Nombre completo</FormLabel>
                  <Field
                    as={TextField}
                    id="name"
                    name="name"
                    type="name"
                    placeholder="Jhon Doe"
                    variant="outlined"
                    error={touched.name && Boolean(errors.name)}
                    helperText={<ErrorMessage name="name" />}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                  <Field
                    as={TextField}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jhon.doe@example.com"
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
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel htmlFor="confirmPassword">
                    Confirmar contraseña
                  </FormLabel>
                  <Field
                    as={TextField}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••"
                    variant="outlined"
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={<ErrorMessage name="confirmPassword" />}
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  Registrarse
                </Button>
              </Form>
            )}
          </Formik>
          <Divider />
          <Typography sx={{ textAlign: "center" }}>
            ¿Tienes una cuenta?{" "}
            <Link component={NavLink} to="/login" variant="body2">
              Iniciar sesión
            </Link>
          </Typography>
        </CustomCard>
      </CustomContainer>
    </AppTheme>
  );
}
