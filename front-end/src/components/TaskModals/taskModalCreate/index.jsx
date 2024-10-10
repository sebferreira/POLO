import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {createTasks} from "../../../queryFn/index.js";
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

export default function ModalTasksCreate({section}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [validateErrors, setValidateErrors] = useState([]);
  const [create, setCreate] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      title: data.title,
      description: data.description,
      due_date: data.due_date ? dayjs(data.due_date).utc().format() : null,
    };
    const res = await createTasks(body, section.id_section, params.boardId);
    if (res.length > 0) {
      setValidateErrors(res);
      setCreate(false);
      return;
    }
    setValidateErrors([]);
    setCreate(true);
    navigate(0);
  });

  useEffect(() => {
    if (validateErrors) {
      const timer = setTimeout(() => {
        setValidateErrors([]);
        setCreate(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [validateErrors]);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        sx={{
          backgroundColor: "#1d2124",
          color: "#ffff",
          borderRadius: 12,
          fontSize: "16px",
          fontWeight: "bold",
          textTransform: "none",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#ffff",
            color: "#1d2124",
          },
        }}
        onClick={handleOpen}>
        Crear tarea
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={[style, {width: {xs: 250, lg: 350}, height: {xs: 400, xl: 500}}]}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textAlign: "center",
              marginBottom: "1rem",
            }}>
            Crear Tareas
          </Typography>
          <form onSubmit={onSubmit}>
            <div>
              {create && (
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    color: "#2e7d32",
                    marginTop: "0.5rem",
                  }}>
                  Tarea creada correctamente
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
                Titulo
              </Typography>
              <TextField
                fullWidth
                sx={{
                  display: "block",
                  marginBottom: {xs: "1rem", xl: "2.5rem"},
                }}
                type="text"
                fontWeight="bold"
                {...register("title", {required: true})}
                size="small"
                variant="outlined"
              />
              {errors.title && (
                <Typography
                  color="error"
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    marginTop: "0.5rem",
                  }}>
                  Task title is required
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
                Descripcion
              </Typography>
              <TextField
                fullWidth
                sx={{
                  display: "block",
                  marginBottom: {xs: "1rem", xl: "2.5rem"},
                }}
                type="text"
                fontWeight="bold"
                {...register("description", {required: true})}
                size="small"
                variant="outlined"
              />
              {errors.title && (
                <Typography
                  color="error"
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    marginTop: "0.5rem",
                  }}>
                  Task description is required
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
                Fecha de expiración
              </Typography>
              <TextField
                fullWidth
                sx={{
                  display: "block",
                  marginBottom: {xs: "1rem", xl: "2.5rem"},
                }}
                type="date"
                fontWeight="bold"
                {...register("due_date")}
                size="small"
                variant="outlined"
              />
            </div>
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
              Crear Tarea
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
