import {Box, Button, TextField, Typography} from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import {useState} from "react";
import {useForm} from "react-hook-form";
import utc from "dayjs/plugin/utc.js";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {updateUser} from "../../queryFn";

dayjs.extend(utc);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  color: "black",
};

export default function ProfileModal({username}) {
  const [contraseñaAnterior, setContraseñaAnterior] = useState("");
  const [contraseñaNueva, setContraseñaNueva] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const navigate = useNavigate();

  const updateState = (e, setState) => {
    setValidateErrors([]);
    setState(e.target.value);
  };
  const {handleSubmit} = useForm();
  const [validateErrors, setValidateErrors] = useState([]);

  const onSubmit = handleSubmit(async () => {
    if (!confirmarContraseña || !contraseñaAnterior || !contraseñaNueva) {
      setValidateErrors(["Todos los campos son obligatorios"]);
      return;
    }
    const body = {contraseñaNueva, confirmarContraseña, contraseñaAnterior};
    const res = await updateUser(username, body);
    if (res.length > 0) {
      setValidateErrors(res);
      return;
    }
    if (res) {
      setValidateErrors([]);
      navigate(0);
    }
  });

  return (
    <Box sx={[style, {width: {xs: 250, lg: 250}, height: {xs: 500, xl: 500}}]}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}>
        <PasswordIcon />
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            marginLeft: "1rem",
            color: "black",
          }}>
          Cambiar Contraseña
        </Typography>
      </div>
      <form
        onSubmit={onSubmit}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
        <Box>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}>
            <Typography
              id="modal-modal-title"
              variant="subtitle1"
              component="h3">
              Contraseña anterior
            </Typography>
          </div>
          <TextField
            id="modal-modal-title"
            type="password"
            value={contraseñaAnterior}
            onChange={() => {
              updateState(event, setContraseñaAnterior);
            }}
            variant="outlined"
            size="small"
            sx={{width: "100%", marginBottom: "1rem", color: "black"}}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}>
            <Typography
              id="modal-modal-title"
              variant="subtitle1"
              component="h3">
              Contraseña Nueva
            </Typography>
          </div>
          <TextField
            id="modal-modal-title"
            type="password"
            size="small"
            value={contraseñaNueva}
            onChange={() => {
              updateState(event, setContraseñaNueva);
            }}
            variant="outlined"
            sx={{
              width: "100%",
              textAlign: "left",
              marginBottom: "1rem",
              color: "black",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}>
            <Typography
              id="modal-modal-title"
              variant="subtitle1"
              component="h3">
              Confirmar Contraseña
            </Typography>
          </div>
          <TextField
            id="modal-modal-title"
            type="password"
            size="small"
            value={confirmarContraseña}
            onChange={() => {
              updateState(event, setConfirmarContraseña);
            }}
            variant="outlined"
            sx={{
              width: "100%",
              textAlign: "left",
              marginBottom: "1rem",
              color: "black",
            }}
          />
          <Button
            type="submit"
            variant="outlined"
            color="success"
            sx={{
              marginTop: "1rem",
              width: "100%",
            }}>
            Cambiar Contraseña
          </Button>
        </Box>
      </form>
    </Box>
  );
}
