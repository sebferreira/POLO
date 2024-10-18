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
import {updatePositionSection} from "../../../queryFn/index.js";
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

export default function SectionModalUpdatePosicion({section, sections}) {
  const {register, handleSubmit} = useForm();
  const [validateErrors, setValidateErrors] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const positionArray = [];
  sections.map((sectionInBoard) => {
    if (section.id_section !== sectionInBoard.id_section) {
      positionArray.push(sectionInBoard.posicion);
    }
  });
  console.log(positionArray);
  const onSubmit = handleSubmit(async (data) => {
    if (!data.posicionNueva) {
      setValidateErrors("Debe seleccionar una posición");
      return;
    }
    const sectionChanged = await updatePositionSection(
      data,
      section.id_section,
      params.boardId
    );
    if (sectionChanged) {
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
  console.log(positionArray);
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
          Nueva posicion
        </Typography>
        <form onSubmit={onSubmit}>
          <div>
            {positionArray.length < 1 && (
              <Typography
                variant="h6"
                component="p"
                textAlign="center"
                sx={{
                  marginTop: "1rem",
                  color: "error.main",
                }}>
                Actualmente hay pocas secciones, no puedes mover la seccion.
              </Typography>
            )}
            {positionArray.length >= 1 && (
              <>
                <Typography
                  variant="h6"
                  component="label"
                  textAlign="center"
                  sx={{
                    margin: 0,
                    fontSize: {xs: "1rem", md: "1.2rem"},
                  }}>
                  Posiciones disponibles
                </Typography>
                <FormControl
                  size="small"
                  fullWidth
                  sx={{
                    marginBottom: {xs: "0.5rem", md: "1rem"},
                  }}>
                  <InputLabel id="demo-simple-select-label">
                    Elija aquí
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Posicion"
                    {...register("posicionNueva", {required: true})}>
                    {positionArray.map((posicion) => {
                      return (
                        <MenuItem value={posicion} key={posicion}>
                          {posicion}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  size="medium"
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                    backgroundColor: "#1d2124",
                    borderRadius: 12,
                    fontSize: "16px",
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                  type="submit">
                  Cambiar posicion
                </Button>
              </>
            )}
          </div>
        </form>
      </Box>
    </>
  );
}
