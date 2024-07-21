import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAllSections} from "../../queryFn";
import {Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import ModalTasksCreate from "../taskModalCreate";
import TaskCard from "../taskCard";

export default function SectionCard({boards}) {
  const [sections, setSections] = useState([]);
  const params = useParams();
  const boardFound = boards.find((board) => board.id_board === params.boardId);
  const sectionsURL = boardFound ? boardFound.sections : null;
  useEffect(() => {
    const getSections = async () => {
      const res = await getAllSections(sectionsURL);
      setSections(res.section);
    };
    getSections();
  }, [sectionsURL]);

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: 5,
          margin: "20px",
        }}>
        {sections.map((section) => {
          return (
            <Grid
              item
              key={section.id_section}
              sx={{
                height: {xs: 400, md: 600, xl: 800},
                width: {xs: 260, md: 350, xl: 400},
                backgroundColor: "#f1f2f4",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                padding: "20px",
                margin: "20px auto",
                borderRadius: "1rem",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 15px 25px rgba(0, 0, 0, 0.3)",
                },
                boxSizing: "border-box",
              }}>
              <div>
                <Card
                  sx={{
                    width: "100%",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    marginLeft: "1rem",
                  }}>
                  <CardContent
                    style={{
                      padding: "5px",
                    }}
                    sx={{
                      fontSize: {xs: 14, md: 16, xl: 18},
                    }}>
                    <div>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{
                          color: "#172b4d",
                        }}>
                        {section.title}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
                <Divider />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <TaskCard section={section} />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
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
