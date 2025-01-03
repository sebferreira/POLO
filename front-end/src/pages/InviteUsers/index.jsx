import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {inviteUsers} from "../../queryFn";

export default function InviteUsers() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [validateErrors, setValidateErrors] = useState([]);
  const [invited, setinvited] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [path, setPath] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    if (params.boardId) {
      const res = await inviteUsers(data, params.boardId);
      setValidateErrors([]);
      setinvited(true);
      if (res.length > 0) {
        setValidateErrors(res);
        setinvited(false);
        return;
      }
    }
  });
  const click = () => {
    sessionStorage.setItem("actualPath", `/boards/${params.boardId}`);
    sessionStorage.setItem("previousPath", `/${params.boardId}/invites`);
    setPath(`/boards/${params.boardId}`);
  };

  useEffect(() => {
    if (validateErrors) {
      const timer = setTimeout(() => {
        setValidateErrors([]);
        setinvited(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [validateErrors]);
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
          width: {xs: "15rem", md: "20rem", lg: "25rem"},
          height: {lg: "25rem"},
        }}
        style={{
          padding: "1.7rem",
          borderRadius: 12,
          color: "#000",
        }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}>
          <Typography
            variant="h5"
            component="h2"
            textAlign="center"
            fontWeight="bold"
            sx={{
              marginBottom: {xs: 2, md: 5},
              fontSize: {xs: "1.1rem", md: "1.5rem"},
            }}>
            Invitar Usuarios
          </Typography>
          <form onSubmit={onSubmit}>
            {invited && (
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  color: "#2e7d32",
                  marginTop: "0.5rem",
                }}>
                Usuario invitado correctamente
              </Typography>
            )}
            {validateErrors.map((error, i) => {
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
              Username
            </Typography>
            <TextField
              fullWidth
              sx={{
                display: "block",
                marginBottom: {xs: "0.5rem", md: "1rem"},
              }}
              type="text"
              fontWeight="bold"
              {...register("username", {required: true})}
              size="small"
              variant="outlined"
            />
            {errors.username && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                Username to invite is required
              </Typography>
            )}
            <Button
              variant="contained"
              size="medium"
              style={{
                marginTop: "2.5rem",
                width: "100%",
                backgroundColor: "rgb(24 32 68)",
                color: "#fff",
                borderRadius: 12,
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
              type="submit">
              Invitar
            </Button>
          </form>
          <Typography
            variant="subtitle1"
            component="p"
            textAlign="center"
            fontWeight="bold"
            sx={{
              marginTop: "1rem",
              color: "black",
            }}>
            <Link
              style={{
                textDecoration: "none",
                textTransform: "none",
              }}
              onClick={click}
              to={`/boards/${params.boardId}`}>
              <Typography
                sx={{
                  color: "rgb(24 32 68)",
                  "&:hover": {
                    color: "#010206",
                  },
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}>
                Ir al tablero
              </Typography>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
