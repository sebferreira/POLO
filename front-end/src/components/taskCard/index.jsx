import {Box, Card, CardContent, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {getAllSectionTasks} from "../../queryFn/index.js";

export default function TaskCard({section}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const res = await getAllSectionTasks(section.tasks);
      console.log(res.tasks);
      setTasks(res.tasks);
    };
    getTasks();
  }, [section]);
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
              padding: "1rem",
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
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 400,
                  }}>
                  {task.title}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
    </>
  );
}
