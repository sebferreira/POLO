import {Box, Button, Checkbox, TextField, Typography} from "@mui/material";
import ViewComfyAltIcon from "@mui/icons-material/ViewComfyAlt";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import CheckIcon from "@mui/icons-material/Check";
import EventIcon from "@mui/icons-material/Event";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {UpdateTask} from "../../../queryFn";
import {useNavigate, useParams} from "react-router-dom";
import utc from "dayjs/plugin/utc.js";
import dayjs from "dayjs";
import {verificarCompletado} from "../../../helpers";
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

export default function ModalTaskView({task}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.due_date ? task.due_date : null);
  const [completed, setCompleted] = useState(task.completed);
  const updateCompleted = (e) => {
    setCompleted(e.target.checked);
  };
  const updateDueDate = (e) => {
    setDueDate(e.target.value);
  };
  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const {handleSubmit} = useForm();
  const [validateErrors, setValidateErrors] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async () => {
    const body = {
      title,
      description,
      due_date: dueDate ? dayjs(dueDate).utc().format() : null,
      completed,
    };
    const res = await UpdateTask(task.id_task, body, params.boardId);
    setValidateErrors([]);
    if (res.length > 0) {
      setValidateErrors(res);
      return;
    }
    navigate(0);
  });
  const buttonSubmit = () => {
    if (
      title != task.title ||
      description != task.description ||
      dueDate != task.due_date ||
      completed != task.completed
    ) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{
              marginTop: "1rem",
              width: "50%",
              borderRadius: 12,
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none",
            }}>
            Guardar
          </Button>
        </div>
      );
    }
  };

  return (
    <Box sx={[style, {width: {xs: 250, lg: 400}, height: {xs: 500, xl: 600}}]}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "black",
            fontSize: "12px",
          }}>
          Creador: {task.personaCreador}
        </Typography>
      </Box>
      <form
        onSubmit={onSubmit}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
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
        <Box>
          {verificarCompletado(task)}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}>
            <ViewComfyAltIcon />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                marginLeft: "1rem",
              }}>
              Titulo
            </Typography>
          </div>
          <TextField
            id="modal-modal-title"
            type="text"
            value={title}
            onChange={updateTitle}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-input": {padding: 0},
              "& .MuiOutlinedInput-notchedOutline": {
                border: "unset",
              },
              "& :focus": {
                border: "1px solid",
                padding: "2px",
              },
              textAlign: "left",
              marginBottom: "1rem",
              color: "black",
            }}
          />
          <div
            style={{
              display: "flex",

              marginBottom: "1rem",
            }}>
            <FormatAlignLeftIcon />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                textAlign: "left",
                marginLeft: "1rem",
              }}>
              Descripcion
            </Typography>
          </div>
          <TextField
            id="modal-modal-title"
            value={description}
            onChange={updateDescription}
            rows={4}
            variant="outlined"
            multiline
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {padding: 0},
              "& .MuiOutlinedInput-notchedOutline": {
                border: "unset",
              },
              "& :focus": {
                border: "1px solid",
              },
              marginBottom: "1rem",
            }}
          />
          <div
            style={{
              display: "flex",

              marginBottom: "1rem",
            }}>
            <EventIcon />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                textAlign: "left",
                marginLeft: "1rem",
              }}>
              Fecha de expiracion
            </Typography>
          </div>
          <TextField
            id="modal-modal-title"
            value={dueDate}
            onChange={updateDueDate}
            type="date"
            variant="outlined"
            sx={{
              marginBottom: "1rem",
              width: "100%",
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}>
            <CheckIcon />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                textAlign: "left",
                marginLeft: "1rem",
              }}>
              Completar
            </Typography>
            <Checkbox
              checked={completed}
              onChange={updateCompleted}
              type="checkbox"
              variant="outlined"
              sx={{
                padding: 0,
                marginLeft: "1rem",
              }}
            />
          </div>
        </Box>
        {buttonSubmit()}
      </form>
    </Box>
  );
}
