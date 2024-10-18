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
import {updatePositionTask} from "../../../queryFn/index.js";
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

export default function TaskModalUpdatePosicion({task, section, sections}) {
  const {register, handleSubmit} = useForm();
  const [validateErrors, setValidateErrors] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const [sectionId, setSectionId] = useState(task.id_section);
  const [position, setPosition] = useState([]);

  const sectionsArray = [];
  sections.map((section) => {
    if (section.tasks.length > 0) {
      const obj = {
        title: section.title,
        id_section: section.id_section,
        tasks: section.tasks,
      };
      sectionsArray.push(obj);
    } else {
      const obj = {
        title: section.title,
        id_section: section.id_section,
        tasks: [{posicion: 1}],
      };
      sectionsArray.push(obj);
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!data.posicionNueva) {
      setValidateErrors("Debe seleccionar una posición");
      return;
    }
    const taskChanged = await updatePositionTask(
      data,
      task.id_task,
      sectionId,
      params.boardId
    );
    if (taskChanged) {
      navigate(0);
    }
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setValidateErrors(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    const seccionActual = sectionsArray.find(
      (section) => section.id_section === sectionId
    );
    const positionArray = [];
    let contadorFinal = 0;
    seccionActual.tasks.map((taskInSection) => {
      if (task.id_task !== taskInSection.id_task) {
        positionArray.push(taskInSection.posicion);
        contadorFinal = taskInSection.posicion + 1;
      }
    });
    const seccionNueva = sections.find(
      (section) => section.id_section === sectionId
    );
    if (sectionId !== section.id_section && seccionNueva.tasks.length > 0) {
      positionArray.push(contadorFinal);
    }
    setPosition(positionArray);
  }, [sectionId]);
  console.log(position);
  return (
    <>
      <Box sx={[style, {width: {xs: 250, lg: 350}, height: 320}]}>
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
            <Typography
              variant="h6"
              component="label"
              textAlign="center"
              sx={{
                fontSize: {xs: "1rem", md: "1.2rem"},
              }}>
              Moverse a una seccion
            </Typography>
            <FormControl
              size="small"
              fullWidth
              sx={{
                marginTop: "1rem",
                marginBottom: {xs: "0.5rem", md: "1rem"},
              }}>
              <InputLabel id="demo-simple-select-label">Elija aquí</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Secciones"
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}>
                {sections.map((section) => {
                  if (section.id_section != task.id_section) {
                    return (
                      <MenuItem
                        value={section.id_section}
                        key={section.id_section}>
                        {section.title}
                      </MenuItem>
                    );
                  } else {
                    return (
                      <MenuItem
                        value={section.id_section}
                        key={section.id_section}>
                        {section.title} (Actual)
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
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
            {position.length < 1 && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                En esta sección no puedes mover la tarea, tienes solo una, crea
                o elige otra sección.
              </Typography>
            )}
            {position.length >= 1 && (
              <FormControl
                size="small"
                fullWidth
                sx={{
                  marginTop: "1rem",
                  marginBottom: {xs: "0.5rem", md: "1rem"},
                }}>
                <InputLabel id="demo-simple-select-label">
                  Elija aquí
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Posicion"
                  {...register("posicionNueva")}>
                  {position.map((posicion) => {
                    return (
                      <MenuItem value={posicion} key={posicion}>
                        {posicion}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
            {validateErrors && (
              <Typography
                color="error"
                variant="body2"
                fontWeight="bold"
                sx={{
                  marginTop: "0.5rem",
                }}>
                {validateErrors}
              </Typography>
            )}

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
          </div>
        </form>
      </Box>
    </>
  );
}
