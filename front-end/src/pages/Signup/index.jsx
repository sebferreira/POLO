import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/AuthContext";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {signup, isAuthRegistered, registerErrors} = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const onClick = (e) => {
    if (isAuthRegistered && registerErrors.length <= 0 && !loading) {
      let boton = e.target;
      boton.disabled = true;
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(false);
    signup(data);
  });

  useEffect(() => {
    if (isAuthRegistered) navigate("/auth");
  }, [isAuthRegistered, navigate]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing={2}>
      <Card
        sx={{
          mt: {xs: "3rem", xl: "10rem"},
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
              marginBottom: {xs: 2, md: 3},
              fontSize: {xs: "1.1rem", md: "1.5rem"},
            }}>
            Registrarse
          </Typography>
          <form onSubmit={onSubmit}>
            {registerErrors.map((error, i) => {
              return (
                <Typography
                  color="error"
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    marginTop: "0.5rem",
                  }}
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
                marginBottom: {xs: "0.5rem", md: "1rem"},
                "& .css-953pxc-MuiInputBase-root-MuiInput-root": {
                  color: "white",
                  "&:before": {
                    borderBottom: "1px solid  #fff",
                  },
                  "&:after": {
                    borderBottom: "1px solid  #fff",
                  },
                },
              }}
              type="text"
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
                El nombre de usuario es necesario
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
              Email
            </Typography>
            <TextField
              fullWidth
              sx={{
                display: "block",
                marginBottom: {xs: "0.5rem", md: "1rem"},
                "& .css-953pxc-MuiInputBase-root-MuiInput-root": {
                  color: "white",
                  "&:before": {
                    borderBottom: "1px solid  #fff",
                  },
                  "&:after": {
                    borderBottom: "1px solid  #fff",
                  },
                },
              }}
              type="email"
              {...register("email", {required: true})}
              size="small"
              variant="standard"
            />
            {errors.email && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                El Email es necesario
              </Typography>
            )}
            <Typography
              variant="h6"
              component="label"
              textAlign="center"
              htmlFor="password"
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
                  color: "white",
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
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                La contraseña es necesaria
              </Typography>
            )}
            <Typography
              variant="h6"
              component="label"
              textAlign="center"
              htmlFor="confirmPassword"
              sx={{
                margin: 0,
                fontSize: {xs: "1rem", md: "1.2rem"},
              }}>
              Confirmar Contraseña
            </Typography>
            <TextField
              fullWidth
              sx={{
                display: "block",
                marginBottom: {xs: "0.5rem", md: "1rem"},
                "& .css-953pxc-MuiInputBase-root-MuiInput-root": {
                  color: "white",
                  "&:before": {
                    borderBottom: "1px solid  #fff",
                  },
                  "&:after": {
                    borderBottom: "1px solid  #fff",
                  },
                },
              }}
              type="password"
              {...register("confirmPassword", {required: true})}
              size="small"
              variant="standard"
            />
            {errors.confirmPassword && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                Es necesario confirmar la contraseña
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
              onClick={onClick}
              type="submit">
              Registrarse
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
            <Link to="/login" style={{textDecoration: "none"}}>
              <Typography
                sx={{
                  color: "#fff",
                  "&:hover": {
                    color: "#010206",
                  },
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}>
                ¿Ya tienes una cuenta? <br />
                Iniciar Sesion.
              </Typography>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
