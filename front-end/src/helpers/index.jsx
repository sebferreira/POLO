import utc from "dayjs/plugin/utc.js";
import dayjs from "dayjs";
import {Typography} from "@mui/material";
dayjs.extend(utc);

let hoy = dayjs().get("date");
let mes = dayjs().get("month") + 1;
let año = dayjs().get("year");
let fechaHoy;
if (mes >= 10) {
  fechaHoy = `${año}-${mes}-${hoy}`;
} else {
  fechaHoy = `${año}-0${mes}-${hoy}`;
}
export const verificarCompletado = (task) => {
  if (task.completed) {
    return (
      <Typography
        variant="body1"
        component="body1"
        sx={{
          fontSize: "12px",
          color: "green",
          fontWeight: 600,
        }}>
        Completado
      </Typography>
    );
  } else {
    return validarFecha(task);
  }
};

const validarFecha = (task) => {
  if (task.due_date) {
    if (task.due_date < fechaHoy) {
      return (
        <Typography
          variant="body1"
          component="body1"
          sx={{
            fontSize: "12px",
            color: "red",
            fontWeight: 600,
          }}>
          Tarea Expirada
        </Typography>
      );
    }
  }
};
