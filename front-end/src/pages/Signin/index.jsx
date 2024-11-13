import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/AuthContext";
import {useEffect} from "react";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {signin, loginErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tables");
    }
  }, [isAuthenticated, navigate]);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={2}>
      <Card
        sx={{
          mt: {xs: "3rem", md: "5rem", xl: "10rem"},
          width: {xs: "15rem", md: "15rem", lg: "25rem"},
        }}
        style={{
          padding: "1.7rem",
          backgroundColor: "#c0c0c036",
          backdropFilter: "blur(5px)",
          border: "solid 1px #FFFF",
          borderRadius: 12,
          color: "#FFFF",
        }}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            textAlign="center"
            fontWeight="bold"
            sx={{
              marginBottom: {xs: 2, md: 5},
              fontSize: {xs: "1.1rem", md: "1.5rem"},
            }}>
            Iniciar Sesion
          </Typography>
          <form onSubmit={onSubmit}>
            {loginErrors.map((error, i) => {
              return (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{
                    marginTop: "0.5rem",
                  }}
                  fontWeight="bold"
                  key={i}>
                  {error}
                </Typography>
              );
            })}
            <Typography
              variant="h6"
              component="label"
              textAlign="center"
              sx={{
                margin: 0,
                fontSize: {xs: "1rem", md: "1.2rem"},
              }}>
              Nombre de usuario
            </Typography>
            <TextField
              fullWidth
              sx={{
                display: "block",
                marginBottom: "2rem",
                "& .css-953pxc-MuiInputBase-root-MuiInput-root": {
                  "&:before": {
                    borderBottom: "1px solid  #fff",
                  },
                  "&:after": {
                    borderBottom: "1px solid  #fff",
                  },
                },
              }}
              type="text"
              fontWeight="bold"
              {...register("username", {required: true})}
              size="small"
              variant="standard"
            />
            {errors.username && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                El nombre de usuario es requerido
              </Typography>
            )}

            <Typography
              variant="h6"
              component="label"
              textAlign="center"
              sx={{
                margin: 0,
                fontSize: {xs: "1rem", md: "1.2rem"},
              }}>
              Contraseña
            </Typography>
            <TextField
              fullWidth
              sx={{
                display: "block",
                marginBottom: {xs: "0.5rem", md: "1rem"},
                "& .css-953pxc-MuiInputBase-root-MuiInput-root": {
                  "&:before": {
                    borderBottom: "1px solid  #fff",
                  },
                  "&:after": {
                    borderBottom: "1px solid  #fff",
                  },
                },
              }}
              type="password"
              {...register("password", {required: true})}
              size="small"
              variant="standard"
            />
            {errors.password && (
              <Typography
                color="error"
                fontWeight="bold"
                variant="body2"
                sx={{
                  marginTop: "0.5rem",
                }}>
                La contraseña es requerida
              </Typography>
            )}
            <Button
              variant="contained"
              size="medium"
              style={{
                marginTop: "1rem",
                width: "100%",
                backgroundColor: "#fff",
                color: "#010206",
                borderRadius: 12,
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
              type="submit">
              Iniciar Sesion
            </Button>
          </form>
          <Typography
            variant="body2"
            component="p"
            textAlign="center"
            fontWeight="bold"
            sx={{
              marginTop: "1rem",
              color: "black",
            }}>
            <Link to="/register" style={{textDecoration: "none"}}>
              <Typography
                sx={{
                  color: "#fff",
                  "&:hover": {
                    color: "#010206",
                  },
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}>
                ¿No tienes una cuenta?
                <br /> Registrate.
              </Typography>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
