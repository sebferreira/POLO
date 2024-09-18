import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {updateInChargeTask} from "../../../queryFn/index.js";
import {useNavigate, useParams} from "react-router-dom";
import utc from "dayjs/plugin/utc.js";
import dayjs from "dayjs";
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

export default function TaskModalUpdateAsign({task, users}) {
  const {register, handleSubmit} = useForm();
  const [validateErrors, setValidateErrors] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    const taskChanged = await updateInChargeTask(
      data.username,
      params.boardId,
      task.id_task
    );
    if (taskChanged) {
      navigate(0);
    }
  });

  useEffect(() => {
    if (validateErrors) {
      const timer = setTimeout(() => {
        setValidateErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [validateErrors]);
  return (
    <>
      <Box sx={[style, {width: {xs: 250, lg: 350}, height: 200}]}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            textAlign: "center",
            marginBottom: "1rem",
          }}>
          Asignar Responsable
        </Typography>
        <form onSubmit={onSubmit}>
          <div>
            <Typography
              variant="h6"
              component="label"
              textAlign="center"
              sx={{
                margin: 0,
                fontSize: {xs: "1rem", md: "1.2rem"},
              }}>
              Usuarios Disponibles
            </Typography>
            <FormControl
              size="small"
              fullWidth
              sx={{
                marginBottom: {xs: "0.5rem", md: "1rem"},
              }}>
              <InputLabel id="demo-simple-select-label">Elija aquí</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="sport"
                {...register("username", {required: true})}>
                {users.map((user) => (
                  <MenuItem value={user.username} key={user.username}>
                    {user.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              size="medium"
              style={{
                marginTop: "1rem",
                width: "100%",
                backgroundColor: "#3181FA",
                borderRadius: 12,
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
              type="submit">
              Asignar Tarea
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
}
