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
import {authenticateCode} from "../../queryFn";
import Cookies from "js-cookie";
export default function AuthCode() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [isAuthRegistered, setIsAuthRegistered] = useState(null);
  const [authErrors, setAuthErrors] = useState(null);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const res = await authenticateCode(data);
    if (Cookies.get("userRegistered") && res.success) {
      Cookies.remove("userRegistered");
    }
    if (res.error) {
      setAuthErrors(res.error);
    }
    if (res.success) {
      setIsAuthRegistered(res.success);
    }
  });
  useEffect(() => {
    if (isAuthRegistered) navigate("/login");
  }, [isAuthRegistered, navigate]);
  useEffect(() => {
    if (authErrors) {
      const timer = setTimeout(() => {
        setAuthErrors(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  });

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
              marginBottom: "2rem",
              fontSize: {xs: "1.1rem", md: "1.5rem"},
            }}>
            Código de Autenticación
          </Typography>
          <Typography
            variant="body2"
            component="p"
            textAlign="center"
            sx={{
              marginBottom: "2rem",
              fontSize: {xs: "0.9rem", md: "1rem"},
            }}>
            Ingresa el código de 6 dígitos que te enviamos a tu gmail.
          </Typography>
          <form onSubmit={onSubmit}>
            {isAuthRegistered && (
              <Typography
                color="success"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                {isAuthRegistered}
              </Typography>
            )}
            {authErrors && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                {authErrors}
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
              Código
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
              {...register("codigo", {required: true})}
              size="small"
              variant="standard"
            />
            {errors.codigo && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                El código es necesario
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
              Autenticar
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
