import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAllContentBoard} from "../../queryFn";
import {Grid} from "@mui/material";
import SectionCardData from "./SectionCard";

export default function SectionCard({boards}) {
  const [content, setContent] = useState([]);

  const params = useParams();
  const boardFound = boards.find((board) => board.id_board === params.boardId);

  useEffect(() => {
    const getContent = async () => {
      if (boardFound) {
        const res = await getAllContentBoard(boardFound.id_board);
        const ordenado = res.sections.sort(
          (section1, section2) => section1.posicion - section2.posicion
        );
        ordenado.map((section) => {
          section.tasks = section.tasks.sort(
            (task1, task2) => task1.posicion - task2.posicion
          );
          return section;
        });
        setContent(ordenado);
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
        {content &&
          content.map((section) => {
            return (
              <SectionCardData
                key={section.id_section}
                section={section}
                content={content}
              />
            );
          })}
      </Grid>
    </>
  );
}
