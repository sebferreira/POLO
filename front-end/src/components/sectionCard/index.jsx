import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAllContentBoard} from "../../queryFn";
import {Card, CardContent, Divider, Grid} from "@mui/material";
import ModalTasksCreate from "../TaskModals/taskModalCreate";
import TaskCard from "../taskCard";
import InputSection from "./InputSection";

export default function SectionCard({boards}) {
  const [content, setContent] = useState([]);
  const params = useParams();
  const boardFound = boards.find((board) => board.id_board === params.boardId);
  useEffect(() => {
    const getContent = async () => {
      if (boardFound) {
        const res = await getAllContentBoard(boardFound.id_board);
        setContent(res.Sections);
      }
    };
    getContent();
  }, [boardFound]);

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "nowrap",
          gap: 5,
          margin: "20px",
        }}
        style={{
          height: "calc(100% - 3rem)",
        }}>
        {content.map((section) => {
          return (
            <Grid
              item
              key={section.id_section}
              sx={{
                width: {xs: 260, md: 330, xl: 400},
                backgroundColor: "#f1f2f4",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "20px",
                margin: "20px auto",
                borderRadius: "1rem",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease-in-out",
                height: "auto",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 15px 25px rgba(0, 0, 0, 0.3)",
                },
                boxSizing: "border-box",
              }}
              style={{
                maxHeight: " calc(100% - 5rem)",
              }}>
              <div
                style={{
                  overflowX: "hidden",
                  height: "100%",
                  scrollbarColor: "#262626 transparent",
                  scrollbarWidth: "thin",
                  scrollbarGutter: "stable",
                }}>
                <Card
                  sx={{
                    width: "100%",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    marginLeft: "1rem",
                    position: "relative",
                  }}>
                  <CardContent
                    style={{
                      padding: "5px",
                    }}
                    sx={{
                      fontSize: {xs: 14, md: 16, xl: 18},
                    }}>
                    <div>
                      <InputSection section={section} />
                    </div>
                  </CardContent>
                </Card>
                <Divider />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "0.2rem",
                  }}>
                  <TaskCard tasks={section.Tasks} />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}>
                <ModalTasksCreate section={section} />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
