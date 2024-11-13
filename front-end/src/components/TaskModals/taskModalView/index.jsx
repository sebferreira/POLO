import {Box, Button, Checkbox, TextField, Typography} from "@mui/material";
import ViewComfyAltIcon from "@mui/icons-material/ViewComfyAlt";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import CheckIcon from "@mui/icons-material/Check";
import EventIcon from "@mui/icons-material/Event";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {UpdateTask} from "../../../queryFn";
import {UpdateImageTask} from "../../../queryFn"; // Asegúrate de que la ruta sea correcta

import {useNavigate, useParams} from "react-router-dom";
import utc from "dayjs/plugin/utc.js";
import dayjs from "dayjs";
import {verificarCompletado} from "../../../helpers";
import ColorizeIcon from "@mui/icons-material/Colorize";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
  const [color, setColor] = useState(task.color ? task.color : "#FFFFFF");
  const [dueDate, setDueDate] = useState(task.due_date ? task.due_date : null);
  const [completed, setCompleted] = useState(task.completed);
  const [image, setImage] = useState(null); // Estado para la imagen

  const updateCompleted = (e) => {
    setCompleted(e.target.checked);
  };
  const updateDueDate = (e) => {
    setDueDate(e.target.value);
  };
  const updateDescription = (e) => {
    setDescription(e.target.value);
  };
  const updateColor = (e) => {
    setColor(e.target.value);
  };
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const {handleSubmit} = useForm();
  const [validateErrors, setValidateErrors] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async () => {
    if (color === "#ffffff") {
      setValidateErrors(["El color #FFFFFF no se puede elegir"]);
      return;
    }
    const body = {
      title,
      description,
      color,
      due_date: dueDate ? dayjs(dueDate).utc().format() : null,
      completed,
    };
    const res = await UpdateTask(task.id_task, body, params.boardId);
    setValidateErrors([]);
    if (res.length > 0) {
      setValidateErrors(res);
      return;
    }
    if (image) {
      const formData = new FormData();
      formData.append("TaskImage", image);
      const imageRes = await UpdateImageTask(
        task.id_task,
        formData,
        params.boardId
      );
      if (imageRes.length > 0) {
        setValidateErrors(imageRes);
        return;
      }
    }
    navigate(0);
  });
  const buttonSubmit = () => {
    if (
      title !== task.title ||
      description !== task.description ||
      color !== task.color ||
      dueDate !== task.due_date ||
      completed !== task.completed ||
      image
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
              marginBottom: {xs: "1rem", lg: "0"},
            }}>
            Guardar
          </Button>
        </div>
      );
    }
  };
  useEffect(() => {
    if (validateErrors.length > 0) {
      const timer = setTimeout(() => {
        setValidateErrors([]);
      }, 4000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [validateErrors]);

  return (
    <Box
      sx={[
        style,
        {
          width: {xs: 250, lg: 400},
          height: {xs: 590, lg: 700},
          overflowX: {xs: "hidden", lg: "visible"},
        },
      ]}>
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
              "&:hover": {
                backgroundColor: "#dddddf",
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
              "&:hover": {
                backgroundColor: "#dddddf",
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
              textAlign: "left",
              marginBottom: "1rem",
            }}>
            <ColorizeIcon />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                textAlign: "left",
                marginLeft: "1rem",
              }}>
              Color
            </Typography>
          </div>
          <TextField
            id="modal-modal-title"
            value={color}
            onChange={updateColor}
            variant="outlined"
            type="color"
            sx={{
              width: "4rem",
              padding: "0rem",
              "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                padding: ".3rem",
              },
              marginBottom: "1rem",
            }}
          />
          <div
            style={{
              display: "flex",
              textAlign: "left",
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
              "&:hover": {
                backgroundColor: "#dddddf",
              },
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
                "&:hover": {
                  backgroundColor: "#dddddf",
                },
              }}
            />
          </div>
          {/*  <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "1rem",
            }}>
            <label
              htmlFor="imageUpload"
              style={{
                cursor: "pointer",
                backgroundColor: "transparent", // Sin fondo
                color: "black", // Color negro
                padding: "0.5rem",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
              }}>
              <i
                className="fas fa-paperclip"
                style={{marginRight: "0.5rem"}}></i>
              Cargar una imagen
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{display: "none"}}
            />

            {task.image && (
              <img
                src={`https://poloweb-api.vercel.app/${task.image}`}
                alt="Task"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  marginTop: "1rem",
                }}
              />
            )}
          </div> */}
        </Box>
        {validateErrors.map((error, i) => {
          return (
            <Typography
              color="error"
              variant="body2"
              sx={{
                textAlign: "center",
                marginTop: "0.5rem",
              }}
              fontWeight="bold"
              key={i}>
              {error}
            </Typography>
          );
        })}
        {buttonSubmit()}
      </form>
    </Box>
  );
}
