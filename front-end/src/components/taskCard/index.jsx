import {Box, Card, CardContent, Typography} from "@mui/material";
import TaskMenu from "../Menu/taskMenu.jsx";
import {verificarCompletado} from "../../helpers/index.jsx";

export default function TaskCard({tasks}) {
  return (
    <>
      {tasks.length > 0 &&
        tasks.map((task) => (
          <Card
            key={task.id_task}
            sx={{
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              marginTop: "0.7rem",
              boxSizing: "border-box",
              borderRadius: "5px",
              padding: "0.2rem",
              color: "#fff",
              backgroundColor: "#ffff",
              width: "90%",
            }}>
            <CardContent
              style={{
                padding: "5px",
              }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#172b4d",
                }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 400,
                      overflow: "auto",
                    }}>
                    {task.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {xs: "0.6rem", sm: "0.7rem"},
                      color: "#6a6b6b",
                      fontWeight: 500,
                    }}>
                    Persona Asignada:{" "}
                    {task.personaAsignada ? task.personaAsignada : "ninguna"}
                  </Typography>
                  <img src={`${task.image}.jpg`} alt="imagenTask" />
                  {verificarCompletado(task)}
                </Box>
                <TaskMenu task={task} />
              </Box>
            </CardContent>
          </Card>
        ))}
    </>
  );
}
