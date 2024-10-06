import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {createSections} from "../../../queryFn/index.js";
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

export default function ModalSections() {
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

  const params = useParams();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    if (params.boardId) {
      const res = await createSections(data, params.boardId);

      if (res.length > 0) {
        setValidateErrors(res);
        setCreate(false);
        return;
      }
      setValidateErrors([]);
      setCreate(true);
      navigate(0);
    }
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
        sx={{
          marginTop: "2.5rem",
          marginRight: "2rem",
          backgroundColor: "#fff",
          color: "#3181FA",
          borderRadius: 2,
          minWidth: "15rem",
          fontSize: "16px",
          fontWeight: "bold",
          textTransform: "none",
          cursor: "pointer",
          "&:hover": {
            color: "#fff",
          },
        }}
        onClick={handleOpen}>
        + Añade una Sección
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={[style, {width: {xs: 250, lg: 350}}]}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textAlign: "center",
              marginBottom: "1rem",
            }}>
            Crear Sección
          </Typography>
          <form onSubmit={onSubmit}>
            {create && (
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  color: "#2e7d32",
                  marginTop: "0.5rem",
                }}>
                Seccion creada correctamente
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
              Titulo de la Sección
            </Typography>
            <TextField
              fullWidth
              sx={{
                display: "block",
                marginBottom: "1rem",
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
                Section title is required
              </Typography>
            )}
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
              Crear Sección
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
