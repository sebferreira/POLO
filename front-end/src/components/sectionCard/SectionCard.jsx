import ModalTasksCreate from "../TaskModals/taskModalCreate";
import TaskCard from "../taskCard";
import InputSection from "./InputSection";
import {Card, CardContent, Divider, Grid} from "@mui/material";

function SectionCard({section, content}) {
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
              <InputSection section={section} sections={content} />
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
          <TaskCard
            tasks={section.tasks}
            section={section}
            sections={content}
          />
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
}

export default SectionCard;
